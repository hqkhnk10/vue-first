<template>
<div>
    
    <el-menu
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
    <el-menu-item index="car">Car</el-menu-item>
     <el-menu-item index="motor">Motor</el-menu-item>
     <el-menu-item index="+">+</el-menu-item>

  
</el-menu>

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
     
      handleSelect(key) {
      this.showTable=true;
      this.$router.push({name:key ,params: { id: 'all'+key }});
      (key == 'car') ? this.carSelected =true : this.carSelected =false;
 },
      doubleClickEvent(event){
        this.$router.push({name:event.type ,params: { id: event.brand }})
      }
    }
  }
</script>
