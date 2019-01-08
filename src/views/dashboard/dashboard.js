import Echarts from "vue-echarts";
import "echarts/lib/chart/bar";
import {
  chart1Options,
  chart2Options,
  chart3Options,
  cpuInfo
} from "./charts.js";
import {
  getMem
} from "@/api/dashboard.js";

export default {
  name: "Dashboard",
  components: {
    chart: Echarts
  },
  data() {
    return {
      chart1Options,
      chart2Options,
      chart3Options,
      cpuInfo
    };
  },
  mounted() {
    this.updateChart();
    setInterval(this.updateChart, 3000);
  },
  methods: {
    async updateChart() {
      const response = await getMem();
      const cpu = response.data.data.cpu;
      this.$refs.chart2.mergeOptions({
        series: {
          name: "MEM",
          data: [{
            value: response.data.data.mem.usedPercent.toFixed(2),
            name: "Memory"
          }]
        }
      });

      this.$refs.chart3.mergeOptions({
        series: {
          name: "swap",
          data: [{
            value: response.data.data.swap.usedPercent.toFixed(2),
            name: "SWAP"
          }]
        }
      });
      this.$refs.cpuInfo.mergeOptions({
        series: {
          name: "swap",
          data: [{
              value: cpu.system,
              name: 'system'
            },
            {
              value: cpu.user,
              name: 'user'
            },
            {
              value: cpu.idle,
              name: 'idle'
            },
            {
              value: cpu.wait,
              name: 'wait'
            }
          ]
        }
      });
    }
  }
};