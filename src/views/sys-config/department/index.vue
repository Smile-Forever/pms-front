<template>
<div class="app-container" style="width:500px">
  <div>部门管理</div>
  <el-tree 
    :data="node" 
    :props="defaultProps" 
    @node-click="handleNodeClick"
    default-expand-all
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
    draggable
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.name }}</span>
          <span>
            <el-button
            round
              type="primary"
              size="mini"
              @click="() => append(data)">
              新增子节点
            </el-button>
            <el-button
            round
              type="primary"
              size="mini"
              @click="() => append(data)">
              重命名
            </el-button>
            <el-button
            round
              type="danger"
              size="mini"
              @click="() => remove(node, data)">
              删除
            </el-button>
          </span>
        </span>
    </el-tree>
</div>
</template>
<script src="./department.js">
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

