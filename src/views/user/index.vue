<template>
  <div class="app-container">
    <el-alert :closable="false" title="搜索">
      <div style="margin-bottom:5px;">
        <el-form :inline="true">
          <el-form-item label="是否启用" class="form-item-tmp">
            <el-select
              v-model="searParam.isDelete"
              size="mini"
              placeholder="全部"
              clearable
              class="filter-item"
              style="width: 130px"
              @change="handleTypeChange"
            >
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="名称" class="form-item-tmp">
            <el-input
              placeholder="名称"
              size="mini"
              @keyup.enter.native="doSearch"
              v-model="searParam.name"
              @change="inputChange"
              class="filter-item"
            />
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
      <el-table-column label="用户名" width="200">
        <template slot-scope="scope">{{scope.row.username}}</template>
      </el-table-column>
      <el-table-column label="密码" width="200">
        <template slot-scope="scope">{{scope.row.password}}</template>
      </el-table-column>
      <el-table-column label="盐值" width="200">
        <template slot-scope="scope">{{scope.row.salt}}</template>
      </el-table-column>
      <el-table-column label="性别" width="200">
        <template slot-scope="scope">{{scope.row.gender}}</template>
      </el-table-column>
      <el-table-column label="手机号" width="200">
        <template slot-scope="scope">{{scope.row.phone}}</template>
      </el-table-column>
      <el-table-column label="邮箱" width="200">
        <template slot-scope="scope">{{scope.row.email}}</template>
      </el-table-column>
      <el-table-column label="头像" width="200">
        <template slot-scope="scope">{{scope.row.avatar}}</template>
      </el-table-column>
      <el-table-column label="是否删除" width="200">
        <template slot-scope="scope">{{scope.row.isDelete ? '是' : '否'}}</template>
      </el-table-column>
      <el-table-column label="创建者" width="200">
        <template slot-scope="scope">{{scope.row.createdUser}}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">{{scope.row.createdTime}}</template>
      </el-table-column>
      <el-table-column label="最后修改者" width="200">
        <template slot-scope="scope">{{scope.row.modifiedUser}}</template>
      </el-table-column>
      <el-table-column label="最后修改时间" width="200">
        <template slot-scope="scope">{{scope.row.modifiedTime}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.roe.id)">编辑</el-button>
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

<script src="./user.js">
</script>
<style>
.form-item-tmp {
  margin-bottom: 1px;
}
</style>

