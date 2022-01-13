<template>
  <div id="app">
    <Login v-if="Login"/>
    <Dashboard v-if="Dashboard"/>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Properties from '../properties.json';

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
      applicationProperties: function(searcher){
        if(Properties[searcher])
          return Properties[searcher];
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
    this.applicationProperties();
  },
}
</script>

<style src="@/assets/styles/app.css">
</style>
