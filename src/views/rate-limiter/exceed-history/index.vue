<template>
  <div class="app-container">
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="超频记录" name="first">
          <code style="margin-bottom:0; padding-bottom:1px;">
            <div style="margin-bottom:5px;">
              <el-form :inline="true">

                <el-form-item label="appId" class="form-item-tmp">
                  <el-input type="number" placeholder="appId" size="mini" @keyup.enter.native="doSearch" v-model="searParam.appId" @change="inputChange" class="filter-item" />
                </el-form-item>

                <el-form-item label="appName" class="form-item-tmp">
                  <el-input placeholder="appName" size="mini" @keyup.enter.native="doSearch" v-model="searParam.appName" @change="inputChange" class="filter-item" />
                </el-form-item>

                <el-form-item label="appKey" class="form-item-tmp">
                  <el-input placeholder="appKey" size="mini" @keyup.enter.native="doSearch" v-model="searParam.appKey" @change="inputChange" class="filter-item" />
                </el-form-item>

                <el-form-item label="超频次数大于" class="form-item-tmp">
                  <el-input placeholder="0" size="mini" @keyup.enter.native="doSearch" v-model="searParam.exceededCount" @change="inputChange" class="filter-item" />
                </el-form-item>

                <el-form-item label="日期范围" class="form-item-tmp">
                  <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="dateRangeStr" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始" end-placeholder="结束" :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>

                <el-form-item style="margin-bottom:1px;" class="form-item-tmp">
                  <div>
                    <el-button class="filter-item" size="mini" type="primary" @click="clearCondition" style="margin-bottom:1px;">重置</el-button>
                    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" style="margin-bottom:1px;" @click="doSearch">搜索</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </code>

          <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="appId">
              <template slot-scope="scope">{{scope.row.appId}}</template>
            </el-table-column>
            <el-table-column label="应用名">
              <template slot-scope="scope">{{scope.row.appName}}</template>
            </el-table-column>
            <el-table-column label="记录时间">
              <template slot-scope="scope">{{scope.row.recordDate}}</template>
            </el-table-column>
            <el-table-column label="超频次数">
              <template slot-scope="scope">{{scope.row.exceededCount}}</template>
            </el-table-column>
            <el-table-column label="appKey">
              <template slot-scope="scope">{{scope.row.appKey}}</template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination v-show="total>=0" :current-page="searParam.page" :page-sizes="table.pageSizeConfig" :page-size="searParam.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史趋势" name="trend">
          <div class="chart" id="chart" :style="{height:height,width:width}" />
        </el-tab-pane>
      </el-tabs>
    </template>

  </div>
</template>

<script>
import { loadExceedCallHistory } from "@/api/rate-limiter/rate-limiter.js";
import echarts from "echarts";
import resize from "./resize.js";
export default {
  name: "ExceedHistory",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "700px"
    }
  },
  data() {
    return {
      listLoading: true,
      total: 0,
      dateRangeStr: ["", ""],
      tableData: [],
      searParam: {},
      table: {
        pageSizeConfig: [5, 10, 15, 20, 25, 30]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      activeName: "trend",
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    async doSearch() {
      this.searParam.startDate = this.startDate;
      this.searParam.endDate = this.endDate;
      const data = await loadExceedCallHistory(this.searParam);
      this.tableData = data.data.body.data;
      this.total = data.data.body.totalCount;
      this.listLoading = false;
    },
    inputChange() {},
    clearCondition() {
      this.searParam = {
        page: 1,
        pageSize: 5,
        appId: null,
        appKey: null,
        appName: null,
        startDate: "",
        endDate: "",
        exceededCount: 0
      };
      this.dateRangeStr = ["", ""];
      this.doSearch();
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
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      const xData = (function() {
        const data = [];
        for (let i = 1; i < 13; i++) {
          data.push(i + "month");
        }
        return data;
      })();
      this.chart.setOption({
        backgroundColor: "#344b58",
        title: {
          text: "sum",
          x: "20",
          top: "20",
          textStyle: {
            color: "#fff",
            fontSize: "22"
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "16"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          x: "5%",
          top: "10%",
          textStyle: {
            color: "#90979c"
          },
          data: ["female", "male", "sum", "test", "test2", "test3"]
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#90979c"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#90979c"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5"
            },
            textStyle: {
              color: "#fff"
            },
            borderColor: "#90979c"
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: "test3",
            type: "bar",
            stack: "total",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: "rgba(100,50,60,1)",
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff"
                  },
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3372, 0, 0]
          },
          {
            name: "test2",
            type: "bar",
            stack: "total",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: "rgba(50,144,60,1)",
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff"
                  },
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: [
              709,
              1917,
              2455,
              2610,
              1719,
              1433,
              100,
              3285,
              5208,
              3372,
              2484,
              4078
            ]
          },
          {
            name: "test",
            type: "bar",
            stack: "total",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: "rgba(255,144,60,1)",
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff"
                  },
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: [
              709,
              1917,
              2455,
              2610,
              1719,
              1433,
              0,
              3285,
              5208,
              3372,
              2484,
              4078
            ]
          },
          {
            name: "female",
            type: "bar",
            stack: "total",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: "rgba(255,144,128,1)",
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff"
                  },
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: [
              709,
              1917,
              2455,
              2610,
              1719,
              1433,
              1544,
              3285,
              5208,
              3372,
              2484,
              4078
            ]
          },

          {
            name: "male",
            type: "bar",
            stack: "total",
            itemStyle: {
              normal: {
                color: "rgba(0,191,183,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "top",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: [
              327,
              1776,
              507,
              1200,
              800,
              482,
              204,
              1390,
              1001,
              951,
              381,
              220
            ]
          },
          {
            name: "sum",
            type: "line",
            stack: "total",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(252,230,48,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "top",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: [
              1036,
              3693,
              2962,
              3810,
              2519,
              1915,
              1748,
              4675,
              6209,
              4323,
              2865,
              4298
            ]
          }
        ]
      });
    }
  },
  created() {
    this.searParam = {
      page: 1,
      pageSize: 5,
      appId: null,
      appKey: null,
      appName: null,
      startDate: "",
      endDate: "",
      exceededCount: 0
    };
    this.doSearch();
  },
  computed: {
    startDate() {
      return this.dateRangeStr ? this.dateRangeStr[0] : "";
    },
    endDate() {
      return this.dateRangeStr ? this.dateRangeStr[1] : "";
    }
  }
};
</script>
