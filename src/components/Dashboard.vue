<template>
  <div id="dashboard"> 

    <div id="teacherbar"></div>

    <div id="content" v-if="content">  
      <br><br>
      <iframe v-if="video" :height="iframe.height" :width="iframe.width" :src="iframe.src" frameborder="0" allowfullscreen></iframe> <br><br>
       <p>{{description_text}}</p>
    </div>

    <button id="upload" @click="uploadPage(true)">+</button>
    <img id="logo" src="@/assets/images/stenden.png"/>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
      return { 
        userbar_data: [],
        iframe: {
          src: '',
          height: 550,
          width: 1000,
        },
        description_text: "",
        content: false,
        video: true
      }
  },
  methods: {
    uploadPage(state){
      window.componentInstance.UploadPage(state);
    },
    async callApi(){
        let users = await axios.get(window.componentInstance.applicationProperties('api') +'users', {   
            headers: {
              'content-type':  'application/json',
              'authorization': 'Bearer '+window.componentInstance.getBearer(),
            }
        })

        if(users.status == 200){
          this.userbar_data = users.data;
          await this.setTeacherBar();
        }
      
        let response = await axios.get(window.componentInstance.applicationProperties('api') +'event', {   
            headers: {
              'content-type':  'application/json',
              'authorization': 'Bearer '+window.componentInstance.getBearer(),
            }
        })

        if(response.status == 200){
          this.content = true;

          if(response.data[0]['content']['contentType']['name'] == 'video'){
            this.iframe.src = response.data[0]['content']['path']+"?autoplay=1"
            this.description_text = response.data[0]['description'];
            this.video = true;
            return;
          }
        }
    },
    setTeacherBar(){
      this.userbar_data.forEach(teacher => this.createTeacherDiv(teacher));
    },
    createTeacherDiv(teacher){
      var div = document.createElement('div');
      div.className = "teacher";
      div.style.cssText = "width: 275px; height: 60px; background-color:white; margin: 12px;float:left; border-radius: 4px;";

      let img = document.createElement('img');
      img.src = teacher['profileImagePath'];
      img.className  = "profileImage";
      img.style.cssText = "height: 50px; width: 50px; margin: 5px; background-color: rgb(128, 128, 128); border-radius: 50%;";
      div.appendChild(img);


      var p = document.createElement('p');
      p.className  = "teacherName";
      p.innerHTML = "<b>"+teacher['name']+"</b>";
      p.style.cssText = "text-align: center; float:inline-start; bottom: 45px; position: relative;";

      div.appendChild(p);
      document.getElementById('teacherbar').appendChild(div);
    }
  },
  mounted: function() {
    this.callApi();
  },
}
</script>

<style scoped src="@/assets/styles/dashboard.css">
</style>
