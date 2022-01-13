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
      <input type="text" class="input" name="username" placeholder="Username">
      <br><br>
      <input type="password" class="input" name="password" placeholder="Password">
      <br><br>
      <input type="password" class="input" name="confirm" placeholder="Confirm Password">
      <br><br>
      <input type="email" class="input" name="email" placeholder="Email">
    </div>
    <br><br>
    <div>
      <button class="button" @click="switchPage(true)">Create</button>
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
          
          if(window.componentInstance.getBearer() != null)
            window.componentInstance.switcher(true);
          else
             alert("Er is momenteel een fout opgetreden.");
        }

      }catch(ex){
        alert("Het ingevulde username en of wachtwoord zijn niet valide");
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
