
<template>
   <el-container style="height: 100vh;">
    <el-aside width="20%">
      <p style="padding-left:30px">
        <i class="fa fa-camera" style="padding-right:10px"></i>

        Untitled UI</p>
<el-input size="small" placeholder="Search" v-model="search" style="width:80%;padding-left: 30px;margin-bottom: 10px;">
</el-input>
      <el-menu 
      @select="handleSelect"
         :router="true"
      >
        <el-menu-item index="Home" :route="{name:'Home'}">
        <i class="fa fa-home" style="padding-right:10px"></i>
        <span>Home</span>
      </el-menu-item>
      <el-menu-item index="Dashboard">
         <i class="fa fa-dashboard" style="padding-right:10px"></i>

        <span>Dashboard</span>
      </el-menu-item>
      <el-menu-item index="ProductS">
        <i class="fa fa-database" style="padding-right:10px"></i>
        <span>Products</span>
      </el-menu-item>
      <el-menu-item index="4" :route="{name:'Task'}">
         <i class="fa fa-tasks" style="padding-right:10px"></i>
        <span>Task</span>
      </el-menu-item>
      <el-menu-item index="5" :route="{name:'Reporting'}">
         <i class="fa fa-flag" style="padding-right:10px"></i>
        <span>Reporting</span>
      </el-menu-item>
      <el-menu-item index="6" :route="{name:'User'}">
         <i class="fa fa-user" style="padding-right:10px"></i>
        <span>Users</span>
      </el-menu-item>
        <br>

      <el-menu-item index="7" :route="{name:'Support'}">
          <i class="fa fa-support" style="padding-right:10px"></i>
        <span>Support</span>
      </el-menu-item>
      <el-menu-item index="8" :route="{name:'Setting'}">
          <i class="fa fa-cog" style="padding-right:10px"></i>
        <span>Settings</span>
      </el-menu-item>
      <br>
      </el-menu>
      <div class="el-item-9">
        News features available!<br>
        Check check<br>
          <img style="width:80%"
          src="https://img.freepik.com/free-photo/beautiful-adult-young-age-asian-professional-woman-with-long-hair-white-shirt-holds-tablet-her-smiling-happily-while-she-sits-chair-workplace-office-with-glassed-building-as-background_477666-1523.jpg?w=2000">
      </div>
      <hr >
      <div style="padding-left: 30px;margin-top:15px;margin-bottom: 15px;">
         <img v-bind:src="picture" style="width:20%;border-radius: 50%;float:left;padding-right: 10px;">
         <div style="display:flex;flex-wrap: wrap;width: 70%;">
         <div style="flex-basis: 80%;">{{name}}</div>
         <div><button v-on:click="getUser()"><i class="fa fa-random"></i></button></div>

        <div style="flex-basis: 80%;word-break: break-all;">{{email}}</div>
        <button @click="test">Test</button>
        </div>
        </div>
    
    </el-aside>
  <el-main>
        <router-view/>
    </el-main>
</el-container>
</template>
<style scoped>
@import '../style/homepage.css';
.fa{
  padding:0;
  margin:0;
  font-size:15px;
  width:15px;
}
</style>

<script>
import { mapGetters } from 'vuex'

  export default {
    data(){
      return{
      name:'a',
      email:'b',
      picture:'https://i.pinimg.com/originals/2c/0a/08/2c0a08b3751b4401ffa8f1719a642b9d.png',
     
      }
    },
    computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'isAuthenticated',
      'StateRole',
      'StateUser'
    ])
  },
  methods: {
    test(){
      console.log(this.StateUser,this.StateRole)
    },
    handleSelect(key, keyPath) {
          this.$router.push({name: key});
        console.log(key, keyPath);
      }
  },
  };
</script>