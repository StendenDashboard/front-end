<template>
  <div id="app">
    <Login v-if="Login"/>
    <Dashboard v-if="Dashboard"/>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'App',
  components: {
    Login,
    Dashboard
  },
  data() {
      return {
        Login: false,
        Dashboard: false
      }
  },
  methods: {
      switcher: function (state) {
          if(!state){
            this.Dashboard = state;
            this.Login = true;
            return;
          } 

          this.Dashboard = state;
          this.Login = false;
      },
      getBearer: function () {
        return this.$storage.getStorageSync("jwt");
      },
      setBearer: function (bearer) {
        this.$storage.setStorageSync("jwt", bearer);
      },
  },
  created () {
    window.componentInstance = this;
  },
  mounted: function() {
    this.switcher(false);
  },
}
</script>

<style src="@/assets/styles/app.css">
</style>
