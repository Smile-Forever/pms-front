<template>
  <div class="dashboard-container">
    <div class="chart-wrapper">
      <chart ref="chart1" class="chart1" :options="chart1Options"></chart>
      <chart ref="chart2" class="chart1" :options="chart2Options"></chart>
    </div>
  </div>
</template>
<script src="./dashboard.js">
</script>
