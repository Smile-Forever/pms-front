import { loadTree, newNode } from "@/api/sys-config/department.js";
// import newNode from "@/api/sys-config/department.js";

export default {
  name: "SysDepartment",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      },
      node: []
    };
  },
  created() {
    this.loadTree();
  },
  methods: {
    async loadTree() {
      const data = await loadTree({});
      this.node = data.data.data.children;
    },
    async createNewNode(param, tree) {
      const resp = await newNode(param);
      console.log(resp)
      if (resp.data.code === 0){
        tree.children.push({ id: resp.data.newId, name: param.name, children: [] });
      } else {
        alert("挂了");
      }
    },
    handleNodeClick(){},
    handleDragStart(node, ev) {
      console.log("drag start", node, ev);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label, ev);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave:", dropNode.label, ev);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label, ev);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType, ev);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType, ev);
    },
    allowDrop(draggingNode, dropNode, type) {
      console.log(type);
      return true;
    },
    allowDrag(draggingNode) {
      console.log(draggingNode);
      return true;
    },
    append(data) {
      this.$prompt("输入节点名称", "新增节点", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!data.children) {
            this.$set(data, "children", []);
          }
          // TODO sync callback 骚操作
          this.createNewNode({ name: value }, data);
        })
        .catch(() => {
          console.log("cancel");
        });
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    }
  }
};
