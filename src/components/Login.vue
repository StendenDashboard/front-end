<template>
  <div id="login"> 
       <div>
        <img id="logo" src="@/assets/images/stenden.png"/>
      </div>
      <div>
        <input type="text" class="input" name="username" placeholder="Username">
        <br><br>
        <input type="password" class="input" name="password" placeholder="Password">
      </div>
      <br><br>
      <div>
        <button class="button">Login</button>
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
    }
  },
  mounted: function() {
    this.switchPage(true);
  },
}
</script>

<style scoped src="@/assets/styles/login.css">
</style>
