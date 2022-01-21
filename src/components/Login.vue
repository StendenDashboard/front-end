<template>
  <div id="login"> 
      <div>
        <img id="logo" src="@/assets/images/stenden.png"/>
      </div>
      <div>
        <input type="text" class="input" id="usernameLogin" name="usernameLogin" placeholder="Username">
        <br><br>
        <input type="password" class="input" id="passwordLogin" name="passwordLogin" placeholder="Password">
      </div>
      <br><br>
      <div>
        <button class="button"  @click="login()">Login</button>
        <br><br>
        <p class="link" @click="switchPage(false)">No account? Create a new one</p>
      </div>

  </div>

  <div id="signup"> 
    <div>
      <img id="logo" src="@/assets/images/stenden.png"/>
    </div>
    <div>
      <input type="text" class="input" name="username" id="username" placeholder="Username">
      <br><br>
      <input type="password" class="input" name="password" id="password" placeholder="Password">
      <br><br>
      <input type="password" class="input" name="confirm" placeholder="Confirm Password">
      <br><br>
      <input type="email" class="input" name="email" id="email" placeholder="Email">
    </div>
    <br><br>
    <div>
      <button class="button" @click="signup()">Create</button>
      <br><br>
      <p class="link" @click="switchPage(true)" >Already have a account?</p>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  methods: {
    switchPage(boolean){
      if(boolean){
        document.getElementById('login').style.display="block";
        document.getElementById('signup').style.display="none";
        return;
      } 
     
      document.getElementById('login').style.display="none";
      document.getElementById('signup').style.display="block";  
    },
    async login(){

      try{
        var response = await axios.post(window.componentInstance.applicationProperties('api') +'authenticate', {
              name: document.getElementById('usernameLogin').value,
              password: document.getElementById('passwordLogin').value
            },{
            headers: {
              'content-type':  'application/json'
            }
        })

        if(response.status == 200){
          window.componentInstance.setBearer(response.data);
          
          if(window.componentInstance.getBearer() != null){
            var users = await axios.get(window.componentInstance.applicationProperties('api') +'users', {   
              headers: {
                'content-type':  'application/json',
                'authorization': 'Bearer '+window.componentInstance.getBearer(),
              }
            })

            if(users.status == 200){
              await window.componentInstance.setUser(document.getElementById('usernameLogin').value, users.data);
              window.componentInstance.switcher(true);
            }
          }

        }

      }catch(ex){
        alert("Het ingevulde username en of wachtwoord zijn niet valide");
      }
         
    },

    async signup(){

      try{
        var response = await axios.post(window.componentInstance.applicationProperties('api') +'signup', {
              name: document.getElementById('username').value,
              password: document.getElementById('password').value,
              profileImagePath: "",
              email: document.getElementById('email').value
            },{
            headers: {
              'content-type':  'application/json',
              'accept': 'application/json'
            }
        })

        if(response.status == 200)
          this.switchPage(true);
    

      }catch(ex){
        alert("Er is iets fout gegaan bij het aanmaken van de gebruiker");
      }
         
    }
  },
  mounted: function() {
    this.switchPage(true);
  },
}
</script>

<style scoped src="@/assets/styles/login.css">
</style>
