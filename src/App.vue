<template>
  <div id="app">
    <!-- <Login /> -->
    <Dashboard />
  </div>
</template>

<script>
//import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'App',
  components: {
    //Login,
    Dashboard
  }
}
</script>

<style src="@/assets/styles/app.css">
</style>
