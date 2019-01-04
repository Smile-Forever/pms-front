import Echarts from "vue-echarts";
import "echarts/lib/chart/bar";
import {
  chart1Options,
  chart2Options
} from "./charts.js";
import { getMem } from '@/api/dashboard.js';

export default {
  name: "Dashboard",
  components: {
    chart: Echarts
  },
  data() {
    return {
      chart1Options,
      chart2Options
    }
  },
  mounted() {
    this.updateChart();
    setInterval(this.updateChart, 3000)
  },
  methods: {
    async updateChart() {
      const response = await getMem()
      this.$refs.chart2.mergeOptions({
        series: {
          name: "CPU",
          data: [{
            value: response.data.data.mem.usedPercent.toFixed(2),
            name: '使用率'
          }]
        }
      })
    }
  }
};