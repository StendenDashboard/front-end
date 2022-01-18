<template>
  <div id="dashboard"> 
    <div id="teacherbar"></div>
    <button id="upload" @click="uploadPage(false)">-</button>
    <img id="logo" src="@/assets/images/stenden.png"/>
  </div>
</template>

<script>

export default {
  name: 'Upload',
  data() {
      return { 
        userbar_data: [],
        iframe: {
          src: '',
          height: 550,
          width: 1000,
        },
        content: false,
        video: true
      }
  },
  methods: {
    uploadPage(state){
      window.componentInstance.UploadPage(state);
    },
  },
  mounted: function() {
  
  },
}
</script>

<style scoped src="@/assets/styles/dashboard.css">
</style>
