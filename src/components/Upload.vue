<template>
  <div id="dashboard"> 
    <div id="teacherbar"></div>
      <button @click="rssFeed()">-Feed</button>
      <button @click="powerpoint()">-Powerpoint</button>
      <button @click="event()">-Event</button>
    <button id="upload" @click="uploadPage(false)">-</button>
    <img id="logo" src="@/assets/images/stenden.png"/>
  </div>
</template>

<script>
import axios from 'axios';

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
    async event(){
      var response = await axios.post(window.componentInstance.applicationProperties('api') +'event', {
            content: {
              contentType: {
                id: 1
              },
              path: "test"
            },
            user_id: window.componentInstance.getUser()['id'],
            description: "string",
            startDateTime: "12-01-2022 13:52:43",
            endDateTime: "20-01-2022 13:52:43",
            duration: 30
          },{
          headers: {
            'content-type':  'application/json',
            'authorization': 'Bearer '+window.componentInstance.getBearer(),
          }
      })

      if(response.status == 200)
        return alert("De event is succes vol geupload")
      
      alert("Er is iets fout gegaan tijdens het uploaden van de event");
    },
    async powerpoint(){
      var response = await axios.post(window.componentInstance.applicationProperties('api') +'powerpoint', {
            user: {
              id: window.componentInstance.getUser()['id']
            },
            path: "string"
          },{
          headers: {
            'content-type':  'application/json',
            'authorization': 'Bearer '+window.componentInstance.getBearer(),
          }
      })

      if(response.status == 200)
        return alert("De powerpoint is succes vol geupload")
      
      alert("Er is iets fout gegaan tijdens het uploaden van de powerpoint");
    },
    async rssFeed(){
      var response = await axios.post(window.componentInstance.applicationProperties('api') +'rss', {
            user: {
              id: window.componentInstance.getUser()['id']
            },
            link: "string",
            startDateTime: "12-01-2022 13:52:43",
            endDateTime: "20-01-2022 13:52:43"
          },{
          headers: {
            'content-type':  'application/json',
            'authorization': 'Bearer '+window.componentInstance.getBearer(),
          }
      })

      if(response.status == 200)
        return alert("De rssfeed is succes vol geupload")
      
      alert("Er is iets fout gegaan tijdens het uploaden van de rssfeed");
    },
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
