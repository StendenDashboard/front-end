<template>
  <div id="dashboard"> 
    <div id="teacherbar"></div>

    <div id="content">
      <div id="buttonBar">
        <button id="RSSFeed" class='switchDiv' @click="setNewVisible('RSSFeed')" >RSS Feed</button>
        <button id="Powerpoint" class='switchDiv' @click="setNewVisible('Powerpoint')" >Powerpoint</button>
        <button id="Event" class='switchDiv' @click="setNewVisible('Event')" >Event</button>
      </div>
      <br><br><br><br>
      <div id="RSSFeed" class='targetDiv'>
        <p>Voeg RSS Feed toe.</p>
        <br>
        <input type="text" class="input" id="rssLink" placeholder="Link">
        <br>
        <input type="text" class="input" id="rssStartdate" placeholder="start date">
        <br>
        <input type="text" class="input" id="rssEnddate" placeholder="end date">
        <br>
        <button class='addButton' @click="rssFeed()">Voeg toe</button>
      </div>
      <div id="Powerpoint" class='targetDiv'>
        <p>Voeg Powerpoint toe.</p>
        <br>
        <input type="text" class="input" id="powerpointPath" placeholder="path">
        <br>
        <br>
        <button class='addButton' @click="powerpoint()">Voeg toe</button>
      </div>
      <div id="Event" class='targetDiv'>
        <p>Voeg Event toe.</p>
        <br>
        <select class="input" id="eventType">
          <option value="1">Video</option>
          <option value="2">Text</option>
        </select>
        <br>
        <input type="text" class="input" id="eventPath" placeholder="path">
        <br>
        <input type="text" class="input" id="description" placeholder="description">
        <br>
        <input type="text" class="input" id="eventStartdate" placeholder="start date">
        <br>
        <input type="text" class="input" id="eventEnddate" placeholder="end date">
        <br>
        <input type="text" class="input" id="eventDuration" placeholder="duration">
        <br>
        <button class='addButton' @click="event()">Voeg toe</button>
      </div>
      <br> 

    </div>

    <button id="upload" @click="uploadPage(false)">-</button>
    <img id="logo" src="@/assets/images/stenden.png"/>
  </div>
</template>

<script>
import axios from 'axios';

var allDiv;
var currentVisible = "RSSFeed";

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
        video: true,
      }
  },
  methods: {
    setNewVisible(div){
      currentVisible = div;
      this.canvasDisplayer();
    },
    canvasDisplayer(){
      allDiv.forEach(function(div) {
        if(div.id == currentVisible) div.style.display="block";
        else div.style.display="none";

        var tablinks = document.querySelectorAll('.switchDiv');

        tablinks.forEach(function(tab) {
            tab.classList.remove("activeTab");  
            if(tab.id == currentVisible) tab.className += " activeTab";
        });
      });
    },
    async event(){
      var response = await axios.post(window.componentInstance.applicationProperties('api') +'event', {
            content: {
              contentType: {
                id: document.getElementById('eventType').value
              },
              path: document.getElementById('eventPath').value
            },
            user_id: window.componentInstance.getUser()['id'],
            description: document.getElementById('description').value,
            startDateTime: document.getElementById('eventStartdate').value,
            endDateTime: document.getElementById('eventEnddate').value,
            duration: document.getElementById('eventDuration').value
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
            path: document.getElementById('powerpointPath').value
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
            link: document.getElementById('rssLink').value,
            startDateTime: document.getElementById('rssStartdate').value,
            endDateTime: document.getElementById('rssEnddate').value
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
    allDiv = document.querySelectorAll('.targetDiv');
    this.canvasDisplayer();
  },
}
</script>

<style scoped src="@/assets/styles/dashboard.css">
</style>
