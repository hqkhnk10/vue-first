<template>
    <div>
      <el-button @click="storeData">store</el-button>
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
       <img :src="scope.row.src"></router-link>
      </template>
    </el-table-column>
    <el-table-column
      label="Description"
      width="180">
      <template slot-scope="scope">
        {{ scope.row.brand }} <br>
            {{ scope.row.model }}<br>
      ${{ scope.row.price }}<br>
      Car Left: {{scope.row.number}}
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
  components:{
    'dialogue-form':dialogueFormVue,
    'add-dialog':addDialogVue,
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/cars`);
      this.cars = res.data;
    } catch (error) {
      console.log(error);
    }
  },
    data(){
        return{
            cars:[],
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
        if(this.search!='allcar'){
        return this.cars.filter(car => car.brand.toLowerCase() == this.search.toLowerCase());
        }
        else{
          return this.cars;}
      },
      formType(){
        if(this.addForm==true) 
        {return 1;}
        if(this.dialogVisible==true) 
        {return 2;}
        return 0;
      }
    },
    methods: {
      storeData(){
        console.log(this.cars.length)
      },
      deleteData(){
this.deleteDialog=false;
this.cars.splice(this.cars.findIndex(car => car== this.storeDelete),1);
        doList.push('Delete '+ this.storeDelete.model)

      },
      async addData(abc){
        console.log(abc)
        const res = await axios.post(`http://localhost:3000/cars`, {
        brand: abc.brand,
        price:abc.price,
      });
        this.cars=[...this.cars, res.data]
      },
      updateData(abc){
        var found = this.cars.findIndex(car => car.id == abc.id)
        this.cars[found].model= abc.model
        this.cars[found].price= abc.price
        this.cars[found].number= abc.number
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