<template>
  <div class="app-container">
    <el-alert :closable="false" title="搜索">
      <div style="margin-bottom:5px;">
        <el-form :inline="true">
          <el-form-item label="查询类型" class="form-item-tmp">
            <el-select
              v-model="searParam.id"
              size="mini"
              placeholder="类型"
              clearable
              class="filter-item"
              style="width: 130px"
              @change="handleTypeChange"
            >
              <el-option
                v-for="item in table.typeList"
                :key="item.type"
                :label="item.text+'('+item.type+')'"
                :value="item.type"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="搜索条件" class="form-item-tmp">
            <el-input
              placeholder="条件"
              size="mini"
              @keyup.enter.native="doSearch"
              v-model="searParam.name"
              @change="inputChange"
              class="filter-item"
            />
          </el-form-item>
          <el-form-item label="是否启用" class="form-item-tmp">
            <el-switch v-model="searParam.enable"></el-switch>
          </el-form-item>
          <el-form-item style="margin-bottom:1px;" class="form-item-tmp">
            <div>
              <el-button
                class="filter-item"
                size="mini"
                type="primary"
                @click="clearCondition"
                style="margin-bottom:1px;"
              >重置</el-button>
              <el-button
                class="filter-item"
                size="mini"
                type="primary"
                icon="el-icon-search"
                style="margin-bottom:1px;"
                @click="doSearch"
              >搜索</el-button>
              <el-button
                class="filter-item"
                size="mini"
                style="margin-bottom: 10px;"
                type="success"
                icon="el-icon-circle-plus"
                @click="handleCreate"
              >新建</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-alert>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="职位名称" width="200">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="是否启用" width="200">
        <template slot-scope="scope">{{scope.row.enable ? '是' : '否'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit">编辑</el-button>
          <el-button type="text" @click="handleDelete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        v-show="total>=0"
        :current-page="searParam.page"
        :page-sizes="table.pageSizeConfig"
        :page-size="searParam.pageSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script src="./position.js">
</script>
<style>
.form-item-tmp {
  margin-bottom: 1px;
}
</style>
