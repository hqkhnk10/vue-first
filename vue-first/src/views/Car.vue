<template>
    <div>
 <el-button type="primary" @click="searchInput">Search</el-button>
<el-input v-show="displaySearch" v-model="searchModel"></el-input>
 <el-button type="primary" @click="add">Add</el-button>
 <el-button type="primary" @click="doForm=!doForm">Do List</el-button>
<div v-show="doForm">{{doList}}</div>
<dialogue-form 
:dialogVisible="showDialogueForm"
:editData="editData"
@toggleDialogueForm="showDialogueForm=!showDialogueForm"
@edit="updateData"
/>
<add-dialog
:dialogVisible="AddshowDialogueForm"
:editData="addData"
@toggleDialogueForm="AddshowDialogueForm=!AddshowDialogueForm"
@add="addData"
/>
<el-dialog
  title="Delete"
  :visible.sync="deleteDialog"
  width="30%"
  >
  <span>Are you sure to delete???</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialog = false">Cancel</el-button>
    <el-button type="primary" @click="deleteData">Confirm</el-button>
  </span>
</el-dialog>
 
<el-table
    :data="filterCar"
    style="width: 100%">
    <el-table-column
      label="Img"
      width="420">
      <template slot-scope="scope">
       <router-link :to="{ name: 'vehicle', params: { id: scope.row.id , type:'car' }}">
       <img :src="PhotoPath+scope.row.car_photo" :alt="scope.row.car_photo"></router-link>
      </template>
    </el-table-column>
    <el-table-column
      label="Description"
      width="180">
      <template slot-scope="scope">
        {{ scope.row.car_brand }} <br>
            {{ scope.row.car_model }}<br>
      ${{ scope.row.car_price }}<br>
      Date: {{scope.row.car_date}}
      </template>
    </el-table-column>
    <el-table-column
      label="Operations">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit( scope.row)">Edit</el-button>
      
        <el-button
        slot="reference"
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)"
          >Delete</el-button>
      </template>
    </el-table-column>
</el-table>
    </div>
</template>

<script>
import addDialogVue from '@/components/addDialog.vue';
import dialogueFormVue from '../components/dialogueForm.vue';
import axios from "axios";


var i=0;
var doList=[];
export default{
  mounted:function(){
    this.refreshData();
},
  components:{
    'dialogue-form':dialogueFormVue,
    'add-dialog':addDialogVue,
  },
    data(){
        return{
            cars:[],PhotoPath:"https://localhost:44307/photos/",
            dialogVisible:false,displaySearch:false,searchModel:'',
            i,addForm:false,doList,doForm:false,showDialogueForm:false,
            search:this.$route.params.id,editData:'',AddshowDialogueForm:false,
        deleteDialog:false,storeDelete:'',
        }
    },
    watch: {
    $route() {
      this.search=this.$route.params.id;
    }
  },
    computed: {
      filterCar(){
        //not find all
        //if(this.search!='allcar'){
        //return this.cars.filter(car => car.car_brand.toLowerCase() == this.search.toLowerCase());
       // }
        //else{
          return this.cars;}
     // },
     
    },
    methods: {
 refreshData(){
        axios.get("https://localhost:44307/cars")
        .then((response)=>{
            this.cars=response.data;
        });
    },
      deleteData(){
this.deleteDialog=false;
console.log(this.storeDelete.car_id);
axios.delete("https://localhost:44307/cars/"+this.storeDelete.car_id)
        .then(()=>{
            this.refreshData();
        });
      },
       addData(abc){
        console.log(abc)
        axios.post("https://localhost:44307/cars",{
            car_brand:abc.brand,
            car_model:abc.model,
            car_price:abc.price,
            car_photo:abc.photo,
            car_date:abc.date,
        })
        .then(()=>{
            this.refreshData();
        });
      },
       updateData(abc){
       console.log(abc)
        axios.put("https://localhost:44307/cars",{
            car_id : abc.id,
            car_brand:abc.brand,
            car_model:abc.model,
            car_price:abc.price,
            car_photo:abc.photo,
            car_date:abc.date,
        })
        .then(()=>{
            this.refreshData();
        });

      },
      searchInput(){
        this.displaySearch=!this.displaySearch;
      },
      handleEdit(row) {
        this.editData=row;
        this.editData=JSON.stringify(this.editData)
        this.showDialogueForm=!this.showDialogueForm;
        doList.push('Edit '+ row.brand)
      },
      handleDelete(row) {
        this.deleteDialog=!this.deleteDialog;
        this.storeDelete=row;
        
      },
      add(){
        this.AddshowDialogueForm=!this.AddshowDialogueForm
         doList.push('Add '+ this.newBrand)
      }

    },
   
}
</script>
<style scoped>

.brandCar div{
  width:30%;
}
.brandCar div img{
  width:80%;
  height: 200px;
}
input{
  border: solid 1px;
  margin:10px;
  width: 80%;
}
form{
  position: relative;
  border: 1;
}
img{
    width:80%;
}
</style>