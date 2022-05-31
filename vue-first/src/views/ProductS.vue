<template>
<div>
    
<el-menu 

  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">

   <el-submenu index="car">
      <template slot="title">Car</template>
      <el-menu-item index="toyota">Toyota</el-menu-item>
      <el-menu-item index="hyundai">item two</el-menu-item>
      <el-menu-item index="vinfast">item three</el-menu-item>
    </el-submenu>
    <el-submenu index="motor">
      <template slot="title">Motor</template>
      <el-menu-item index="2-4-1">item one</el-menu-item>
      <el-menu-item index="2-4-2">item two</el-menu-item>
      <el-menu-item index="2-4-3">item three</el-menu-item>
    </el-submenu>
</el-menu>

<button @click="abc">b</button>

<el-table
    v-show="showTable"
    :data="dataList"
    @row-dblclick="doubleClickEvent($event)"
    ref="productList"
    style="width: 100%"
  >
    <el-table-column label="Ngày nhập" width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">
          {{ scope.row.date }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="Loại sản phẩm" width="180">
      <template slot-scope="scope">
        {{ scope.row.brand }}
      </template>
    </el-table-column>
    
    <el-table-column label="Số lượng" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.left }}
        </span>
      </template>
    </el-table-column>
  </el-table>

    <router-view />
</div>
</template>

<script>
    import {carList} from "@/utils/cars"
    import {motorList} from "@/utils/motors"
import AboutVue from "./About.vue";
  export default {

    data() {
      return {
        motorList,carList,carSelected:false,showTable:false,
      };
    },
    computed:{
      dataList: function(){
        return this.carSelected ? carList  : motorList;
      }
    },
    methods: {
     abc(){
       this.$router.addRoute({parentName: 'ProductS', path: '/about', name: 'about', component: AboutVue })
       console.log(this.$router.options.routes)
       this.$router.push(  {name:'about'} )
     },
      handleSelect(key,keyPath) {
      this.showTable=true;
      console.log(key,keyPath)
      this.$router.push({name:keyPath[0] ,params: { id: keyPath[1] }});
      (keyPath[1] == 'car') ? this.carSelected =true : this.carSelected =false;
 },
      doubleClickEvent(event){
        this.$router.push({name:event.type ,params: { id: event.brand }})
      }
    }
  }
</script>
