<template>

  <div class="hello">
    <div class="f1">
      <div>
        <h1 style="color:black;padding-top:10px">Login</h1>
        
      </div>
      <div>
        <form action="http://localhost:8080/homepage" target="_blank">
          Username <br>
          <a class="fa fa-user " style="font-size:15px;padding:0px;"></a>
          <input type="text" placeholder="Type your user name" />
          <hr>
          Password <br>
          <a class="fa fa-lock" style="font-size:15px;padding:0px;"></a>
          <input type="password" placeholder="Type your password" />
          <hr>
          <a href="" id="r1">Forget password?</a><br>
          <br>
          <input type="submit" value="LOGIN" id="login">
        </form>
      </div>
      <div class="ff2">
        <span class="or">Or sign up using</span><br><br>
        <a href="#" class="fa fa-facebook" style="font-size:15px;width:15px;"></a>
        <a href="#" class="fa fa-twitter" style="font-size:15px;width:15px;"></a>
        <a href="#" class="fa fa-google" style="font-size:15px;width:15px;"></a>

        <br><br><br>
        <span class="or">Or sign up using</span><br><br>
        <a href="http://localhost:8080/homepage" id="s1">SIGN UP</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginForm',

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../style/login.css';
</style>
