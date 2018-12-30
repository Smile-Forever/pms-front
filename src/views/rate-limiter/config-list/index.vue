<template>
  <div class="app-container">
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="配置列表" name="first">
        <el-alert :closable="false" title="搜索">
          <div style="margin-bottom:5px;">
            <el-form :inline="true">
              <el-form-item label="appType" class="form-item-tmp">
                <el-select v-model="searParam.appType" size="mini" placeholder="类型" clearable class="filter-item" style="width: 130px" @change="handleTypeChange">
                  <el-option v-for="item in table.limiterType" :key="item.type" :label="item.text+'('+item.type+')'" :value="item.type" />
                </el-select>
              </el-form-item>
              <el-form-item label="appId" class="form-item-tmp">
                <el-input type="number" placeholder="appId" size="mini" @keyup.enter.native="doSearch" v-model="searParam.appId" @change="inputChange" class="filter-item" />
              </el-form-item>
              <el-form-item label="appName" class="form-item-tmp">
                <el-input placeholder="appName" size="mini" @keyup.enter.native="doSearch" v-model="searParam.appName" @change="inputChange" class="filter-item" />
              </el-form-item>
              <el-form-item label="appKey" class="form-item-tmp">
                <el-input placeholder="appKey" size="mini" @keyup.enter.native="doSearch" v-model="searParam.appKey" @change="inputChange" class="filter-item" />
              </el-form-item>
              <el-form-item style="margin-bottom:1px;" class="form-item-tmp">
                <div>
                  <el-button class="filter-item" size="mini" type="primary" @click="clearCondition" style="margin-bottom:1px;">重置</el-button>
                  <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" style="margin-bottom:1px;" @click="doSearch">搜索</el-button>
                  <el-button class="filter-item" size="mini" style="margin-bottom: 10px;" type="success" icon="el-icon-circle-plus" @click="handleCreate">新建</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-alert>

        <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%;">

          <el-table-column label="appId">
            <template slot-scope="scope">{{scope.row.appId}}</template>
          </el-table-column>
          <el-table-column label="appKey" width="200">
            <template slot-scope="scope">{{scope.row.appKey}}</template>
          </el-table-column>
          <el-table-column label="appName" width="200" filter-placement="top-end" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.appName}}</template>
          </el-table-column>
          <el-table-column label="company" width="100" filter-placement="top-end" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.companyName}}</template>
          </el-table-column>
          <el-table-column label="developer" width="100" filter-placement="top-end" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.developerName}}</template>
          </el-table-column>
          <!-- <el-table-column label="type"><template slot-scope="scope">{{scope.row.appType}}</template></el-table-column> -->
          <el-table-column label="type" width="110">
            <template slot-scope="scope">
              <el-tag :type="scope.row.appType | appTypeTagFilter">{{ scope.row.appType | appTypeDescFilter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="qps">
            <template slot-scope="scope">{{scope.row.qps}}</template>
          </el-table-column>
          <el-table-column label="Day" width="70" filter-placement="top-end" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.limitOfDay}}</template>
          </el-table-column>
          <el-table-column label="Hour" width="70" filter-placement="top-end" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.limitOfHour}}</template>
          </el-table-column>
          <el-table-column label="Minute" width="70" filter-placement="top-end" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.limitOfMinute}}</template>
          </el-table-column>
          <el-table-column label="Ops">
            <template slot-scope="scope">
              <a>编辑</a> &nbsp;
              <a>删除</a>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination v-show="total>=0" :current-page="searParam.page" :page-sizes="table.pageSizeConfig" :page-size="searParam.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="redisKey生成工具" name="second">
        <el-form ref="form" label-width="80px">
          <el-form-item>
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="limiter.appId">
                  <template slot="prepend">appId</template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-form-item>
          <el-form-item>
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="limiter.keyOfMinute">
                  <template slot="prepend">每分钟</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="handleCopy(limiter.keyOfMinute,$event)">Copy</el-button>
              </el-form-item>
            </el-form>
          </el-form-item>
          <el-form-item>
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="limiter.keyOfHour">
                  <template slot="prepend">每小时</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="handleCopy(limiter.keyOfHour,$event)">Copy</el-button>
              </el-form-item>
            </el-form>
          </el-form-item>
          <el-form-item>
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="limiter.keyOfDay">
                  <template slot="prepend">每天</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="handleCopy(limiter.keyOfDay,$event)">Copy</el-button>
              </el-form-item>
            </el-form>
          </el-form-item>
          <el-form-item>
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="limiter.keyOfGlobal">
                  <template slot="prepend">全局</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="handleCopy(limiter.keyOfGlobal,$event)">Copy</el-button>
              </el-form-item>
            </el-form>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import loadConfigList from "@/api/rate-limiter/rate-limiter.js";
import clip from "@/utils/clipboard";
export default {
  name: "ConfigList",
  data() {
    return {
      listLoading: true,
      total: 0,
      table: {
        title: "限流配置",
        limiterType: [
          { type: 0, text: "不限" },
          { type: -1, text: "全局配置" },
          { type: 1, text: "顶级客户" },
          { type: 2, text: "潜在客户" },
          { type: 3, text: "普通客户" },
          { type: 4, text: "开发状态客户" }
        ],
        pageSizeConfig: [5, 10, 15, 20, 25, 30]
      },
      limiter: {
        appId: 158,
        keyOfMinute: null,
        keyOfHour: null,
        keyOfDay: null,
        keyOfGlobal: "rtl:gb"
      },
      activeName2: "second",
      searParam: {
        page: 1,
        pageSize: 5,
        appType: 0,
        appId: null,
        appKey: null,
        appName: null
      },
      tableData: []
    };
  },
  created() {
    this.searParam = {
      page: 1,
      pageSize: 5,
      appType: 0,
      appId: null,
      appKey: null,
      appName: null
    };
    this.doSearch();
  },
  computed: {},
  methods: {
    handleCreate() {},
    handleCopy(text, event) {
      if (!text) return;
      clip(text, event);
    },
    clipboardSuccess() {
      this.$message({
        message: "Copy successfully",
        type: "success",
        duration: 1500
      });
    },
    async doSearch() {
      this.listLoading = true;
      const data = await loadConfigList(this.searParam);
      this.tableData = data.data.body.data;
      this.total = data.data.body.totalCount;
      this.listLoading = false;
    },
    clearCondition() {
      this.searParam = {
        page: 1,
        pageSize: 5,
        appType: 0,
        appId: null,
        appKey: null,
        appName: null
      };
      console.log(this.searParam);
      this.doSearch();
    },
    inputChange() {
      this.searParam.page = 1;
    },
    handleSizeChange(val) {
      this.searParam.pageSize = val;
      this.searParam.page = 1;
      this.doSearch();
    },
    handleCurrentChange(val) {
      this.searParam.page = val;
      this.doSearch();
    },
    handleTypeChange(val) {
      this.searParam.appType = val;
      this.searParam.page = 1;
      this.doSearch();
    }
  }
};
</script>

<style>
.form-item-tmp {
  margin-bottom: 1px;
}
</style>
