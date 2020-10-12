<template>
  <div id="app">
    <div class="grid">
      <div class="grid__cell" v-if="this.$store.state.cpu">
        <Chart 
          :displayValue="this.$store.state.cpu" 
          label="CPU" 
          suffix="%"
        />
      </div>
      <div class="grid__cell" v-if="this.$store.state.cpuTemp">
        <Chart 
          :displayValue="this.$store.state.cpuTemp" 
          label="Temp" 
          suffix="°C"
        />
      </div>

      <Dashboard apiPath="/api/all" apiPort="3000" />
    </div>
  </div>
</template>

<script>
import Chart from "./components/Chart.vue";
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "App",
  components: {
    Chart,
    Dashboard,
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  background: #000;
  overflow: hidden;
}
body {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 200% 200%;
  -webkit-animation: gradient 12s ease infinite;
  animation: gradient 12s ease infinite;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  .grid {
    display: flex;
    height: 100%;
    align-items: center;
    flex-wrap: wrap;
    &__cell {
      @media (orientation: landscape) {
        flex: 1 1 50%;
        padding: 0;
      }
      @media (orientation: portrait) {
        flex: 1 1 80%;
        padding: 0 10%;
      }
    }

  }
}
@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
