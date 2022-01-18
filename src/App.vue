<template>
  <div id="app">
    <Login v-if="Login"/>
    <Dashboard v-if="Dashboard"/>
    <Upload v-if="Upload"/>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Upload from './components/Upload.vue'
import Properties from '../properties.json';

export default {
  name: 'App',
  components: {
    Login,
    Dashboard,
    Upload
  },
  data() {
      return {
        Login: false,
        Dashboard: false,
        Upload: false,
        userdata: [],
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
      UploadPage: function(state){
          if(!state){
            this.Dashboard = true;
            this.Upload = state;
            return;
          } 

          this.Dashboard = false;
          this.Upload = state;
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
      setUser: function (username, users) {
        users.forEach((user, index) => {
          if(user['name'] == username)
            this.userdata = users[index];
        });
      },
      getUser: function () {
        return this.userdata;
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
