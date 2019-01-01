import getPositionList from "@/api/sys-config/position.js";
export default {
  name: "SysPosition",
  data() {
    return {
      listLoading: true,
      total: 0,
      table: {
        typeList: [{ type: 0, text: "全部" }, { type: 1, text: "名称" }],
        pageSizeConfig: [5, 10, 15, 20, 25, 30]
      },
      searParam: {
        page: 1,
        pageSize: 5,
        id: 0,
        name: "",
        enable: true
      },
      tableData: []
    };
  },
  created() {
    this.doSearch();
  },
  computed: {},
  methods: {
    handleCreate() {},
    async doSearch() {
      this.listLoading = true;
      const data = await getPositionList(this.searParam);
      debugger;
      this.tableData = data.data.data.data;
      this.listLoading = false;
    },
    clearCondition() {
      this.searParam = {
        page: 1,
        pageSize: 5,
        id: 0,
        name: "",
        enable: false
      };
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
      this.searParam.type = val;
      this.searParam.page = 1;
      this.doSearch();
    },
    handleEdit() {
      // TO DO table Edit
    },
    handleDelete() {
      // TO Do table delete
    }
  }
};
