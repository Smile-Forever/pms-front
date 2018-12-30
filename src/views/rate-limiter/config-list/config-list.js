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
      console.log(data);
      this.tableData = data.data.data;
      this.total = 100;
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
