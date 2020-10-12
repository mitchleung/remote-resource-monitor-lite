<template>
  <div class="dashboard">
    <div v-if="loading" class="loading">Loading ...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from "axios";
// import store from "../store"

export default {
  name: "Dashboard",
  props: {
    apiHost: { type: String, default: "" },
    apiPort: { type: String, default: "80" },
    apiPath: { type: String, default: "/api/all" },
  },
  data() {
    return {
      // apiUrl: "",
      loading: false,
      error: null,
    };
  },
  computed: {
    apiUrl: function () {
      return (
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":" +
        this.apiPort +
        this.apiPath
      );
    },
  },
  methods: {
    fetchData() {
      axios
        .get(this.apiUrl)
        .then((response) => {
          var perCpuTemp = Array.prototype.map.call(
            response.data.cpu.cores,
            function (core, index) {
              return {
                core: Number(core),
                index: index,
              };
            }
          );
          this.$store.commit("setData", {
            cpu: Number(response.data.cpu.total),
            cpuTemp: Number(response.data.cpu.temp),
            perCpuTemp: perCpuTemp,
            // perCpuTemp: response.data.cpu.cores,
            mem: Number(response.data.mem.used / response.data.mem.total) * 100,
          });
          this.loading = false;
        })
        .catch((error) => console.log((this.error = error)));
    },
  },
  mounted() {
    this.loading = true;
    // this.apiUrl =
    //   window.location.protocol +
    //   "//" +
    //   window.location.hostname +
    //   ":" +
    //   this.apiPort +
    //   this.apiPath;
    this.$options.interval = setInterval(this.fetchData, 1000);
  },
  beforeDestroy() {
    clearInterval(this.$options.interval);
  },
};
</script>

<style scoped lang="scss">
.dashboard {
  width: 100%;
}
</style>