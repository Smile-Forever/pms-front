<template>
  <div class="dashboard-container">
    <div class="chart-wrapper">
      <chart ref="chart1" class="chart1" :options="chart1Options"></chart>
      <chart ref="chart2" class="chart1" :options="chart2Options"></chart>
      <chart ref="chart3" class="chart1" :options="chart3Options"></chart>
      <chart ref="cpuInfo" class="chart1" :options="cpuInfo"></chart>
    </div>
  </div>
</template>
<script src="./dashboard.js">
</script>
