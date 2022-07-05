<template>

  <div class="hello">
    <div class="f1">
      <div>
        <h1 style="color:black;padding-top:10px">Login</h1>
        
      </div>
      <div>
        <form @submit.prevent="submit">
          Username <br>
          <a class="fa fa-user " style="font-size:15px;padding:0px;"></a>
          <input type="text" v-model="form.username" placeholder="Type your user name" />
          <hr>
          Password <br>
          <a class="fa fa-lock" style="font-size:15px;padding:0px;"></a>
          <input type="password" v-model="form.password" placeholder="Type your password" />
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
        <a @click="register" id="s1">SIGN UP</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'LoginForm',
data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      var User =[];
      User.username=this.form.username;
      User.password=this.form.password;
      console.log(User);

      try {
          await this.LogIn(User);
          this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
    register(){
            this.$router.push("/register");
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../style/login.css';
</style>
