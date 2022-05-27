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
  :before-close="handleClose">
  <span>Are you sure to delete???</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialog = false">Cancel</el-button>
    <el-button type="primary" @click="deleteData">Confirm</el-button>
  </span>
</el-dialog>

<el-table
    :data="filtermotor"
    style="width: 100%">
    <el-table-column
      label="Img"
      width="420">
      <template slot-scope="scope">
       <router-link :to="{ name: 'vehicle', params: { id: scope.row.id , type:'motor' }}">
       <img :src="scope.row.src"></router-link>
      </template>
    </el-table-column>
    <el-table-column
      label="Description"
      width="180">
      <template slot-scope="scope">
        {{ scope.row.brand }} <br>
            {{ scope.row.model }}<br>
      {{ scope.row.price }}<br>
      motor Left: {{scope.row.number}}
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

var motorsObj =  require('../utils/motors.js');
var motors = motorsObj.motors;
var i=0;
var doList=[];
export default{
  components:{
    'dialogue-form':dialogueFormVue,
    'add-dialog':addDialogVue,
  },
    data(){
        return{
            motors,
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
      filtermotor(){
        //not find all
        if(this.search!='allmotor'){
        return this.motors.filter(motor => motor.brand.toLowerCase() == this.search.toLowerCase());
        }
        else{
          return this.motors;}
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
      deleteData(){
this.deleteDialog=false;
motors.splice(motors.findIndex(motor => motor== this.storeDelete),1);
        doList.push('Delete '+ this.storeDelete.model)

      },
      addData(abc){
        motors.push(abc)
      },
      updateData(abc){
        var found = motors.findIndex(motor => motor.id == abc.id)
        motors[found].model= abc.model
        motors[found].price= abc.price
        motors[found].number= abc.number
      },
      searchInput(){
        this.displaySearch=!this.displaySearch;
      },
      handleEdit(row) {
        this.editData=row;
        this.editData=JSON.stringify(this.editData)
        this.dialogVisible=true;
        this.showDialogueForm=!this.showDialogueForm;
        this.i=motors.findIndex(motor => motor== row);
        doList.push('Edit '+ row.brand)
        console.log(motorsObj.motorList)
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

.brandmotor div{
  width:30%;
}
.brandmotor div img{
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