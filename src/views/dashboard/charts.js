const chart1Options = {
  color: ["#3398DB"],
  tooltip: {
    trigger: "axis",
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为："line" | "shadow"
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [{
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisTick: {
      alignWithLabel: true
    }
  }],
  yAxis: [{
    type: "value"
  }],
  series: [{
    name: "直接访问",
    type: "bar",
    barWidth: "60%",
    data: [10, 52, 200, 334, 390, 330, 220]
  }]
}
const chart2Options = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%"
  },
  toolbox: {
    feature: {
      restore: {},
      saveAsImage: {}
    }
  },
  series: [{
    name: 'Mem',
    type: 'gauge',
    detail: {
      formatter: '{value}%'
    },
    data: []
  }]
};

const chart3Options = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%"
  },
  toolbox: {
    feature: {
      restore: {},
      saveAsImage: {}
    }
  },
  series: [{
    name: 'CPU',
    type: 'gauge',
    detail: {
      formatter: '{value}%'
    },
    data: []
  }]
};

const cpuInfo = {
  title: {
    text: '南丁格尔玫瑰图',
    subtext: '纯属虚构',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true
      },
      dataView: {
        show: true,
        readOnly: false
      },
      magicType: {
        show: true,
        type: ['pie', 'funnel']
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  calculable: true,
  series: [{
      name: 'swap',
      type: 'pie',
      radius: [20, 110],
      center: ['25%', 200],
      roseType: 'radius',
      width: '40%', // for funnel
      max: 40, // for funnel
      itemStyle: {
        normal: {
          label: {
            show: true
          },
          labelLine: {
            show: true
          }
        },
        emphasis: {
          label: {
            show: true
          },
          labelLine: {
            show: true
          }
        }
      },
      data: [{
          value: 10,
          name: 'system'
        },
        {
          value: 5,
          name: 'user'
        },
        {
          value: 15,
          name: 'idle'
        },
        {
          value: 25,
          name: 'wait'
        }
      ]
    }
  ]
};

export {
  chart1Options,
  chart2Options,
  chart3Options,
  cpuInfo
};