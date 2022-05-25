<template>
    <div>
<el-dialog
  title="Edit"
  :visible.sync="dialogVisible"
  width="30%"
  >
motor Model <br><input  :value="motors[i].model" @change="Change(0,$event.target.value)"><br>
motor Price <br><input  :value="motors[i].price" @change="Change(1,$event.target.value)"><br>
motor Left <br><input  :value="motors[i].number" @change="Change(2,$event.target.value)"><br>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">Cancel</el-button>
    <el-button type="primary" @click="confirm">Confirm</el-button>
  </span>
</el-dialog>
 <el-button type="primary" @click="searchInput">Search</el-button>
<el-input v-show="displaySearch" v-model="searchModel"></el-input>
 <el-button type="primary" @click="addForm=!addForm">Add</el-button>
 <el-button type="primary" @click="doForm=!doForm">Do List</el-button>
<div v-show="doForm">{{doList}}</div>


<el-form v-show="addForm" size="mini">

  <el-form-item label="Brand">
    <el-input v-model="newBrand"></el-input>
  </el-form-item>
  <el-form-item label="Model">
    <el-input v-model="newModel"></el-input>
  </el-form-item>
  <el-form-item label="Speed">
    <el-input v-model="newSpeed"></el-input>
  </el-form-item>
  <el-form-item label="Weight">
    <el-input v-model="newWeight"></el-input>
  </el-form-item>
  <el-form-item label="Introduction">
    <el-input v-model="newIntroduction"></el-input>
  </el-form-item>
  <el-form-item label="Number">
    <el-input v-model="newNumber"></el-input>
  </el-form-item>
  <el-form-item label="Price">
    <el-input v-model="newPrice"></el-input>
  </el-form-item>
  <el-form-item label="Img">
    <el-input v-model="newImg"></el-input>
  </el-form-item>
  <el-button type="primary" @click="add">Create</el-button>
   <el-button @click="addForm=false">Cancel</el-button>
</el-form>

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
       <el-popconfirm
  confirm-button-text='OK' 
  cancel-button-text='No, Thanks'
  icon="el-icon-info"
  icon-color="red"
  title="Are you sure to delete this?"
  @confirm="handleDelete(scope.row)"
>
        <el-button
        slot="reference"
          size="mini"
          type="danger"
          @click="trig=false"
          >Delete</el-button>
          </el-popconfirm>
      </template>
    </el-table-column>
</el-table>
    </div>
</template>

<script>
var motorsObj =  require('../utils/motors.js');
var motors = motorsObj.motors;
var dialogVisible=false;
var displaySearch = false;
var addForm=false;
var doForm=false;
var valArr =[];
var i=0;
var id=5;
var newBrand='',newModel='',newPrice='',newSpeed='',newWeight='';
var newNumber='',newIntroduction='',newImg='';
var searchModel='';
var idxArr =[];
var doList=[];
var trig=false;
export default{
    data(){
        return{
            motors,newBrand,newModel,newIntroduction,newPrice,newSpeed,newWeight,newNumber,newImg,
            dialogVisible,id,idxArr,displaySearch,searchModel,
            i,valArr,addForm,doList,doForm,trig,
            search:this.$route.params.id,
        }
    },
    watch: {
    $route() {
      this.search=this.$route.params.id;
    }
  },
    computed: {
      filtermotor(){
        if(this.search!='allmotor'){
        var abc=motors.filter(motor => motor.brand.toLowerCase() == this.search.toLowerCase());
          if(this.searchModel!=''){
              var abd=motors.filter(motor => motor.model.toLowerCase() == this.searchModel.toLowerCase());
          return abd;
           }
          if(this.trig==true){
         return abc;
          }
          else{
           return abc;}
           
        }
        else{
          if(this.searchModel!=''){
              var abdf=motors.filter(motor => motor.model.toLowerCase() == this.searchModel.toLowerCase());
          return abdf;
           }
          return motors;
        }
      }
    },
    methods: {
      
      searchInput(){
        this.displaySearch=!this.displaySearch;
      },
      handleEdit(row) {
        this.dialogVisible=true;
        this.i=motors.findIndex(motor => motor== row);
        this.trig=true;
        console.log( this.i);
        doList.push('Edit '+ row.brand)
      },
      handleDelete(row) {
        motors.splice(motors.findIndex(motor => motor== row),1);
        this.trig=true;
        doList.push('Delete '+ row.model)
      },
      Change(idx,val){
        valArr[idx]=val;
        idxArr.push(idx);
        console.log(valArr);
      },
      cancel(){
         this.dialogVisible=false;
        valArr.splice(0,valArr.length);
        console.log(valArr);
      },
      confirm(){
        this.dialogVisible=false;
        for(let idx=0;idx<idxArr.length;idx++){
          switch(idxArr[idx]){
            case 0:
              motors[this.i].model=valArr[0];
              break;
            case 1:
              motors[this.i].price=valArr[1];
              break;
            case 2:
              motors[this.i].number=valArr[2];
              break;
          }
        }
        valArr.splice(0,valArr.length);
       idxArr.splice(0,idxArr.length);
       this.trig=false;
      },
      add(){
        this.addForm=!this.addForm;
        if(this.newImg==''){
this.newImg='https://thegioibiker.com/wp-content/uploads/2021/10/Nhung-mau-mo-to-sap-ra-mat-tai-VN.jpg'
        }
        motors.push({
        id:id++,
        brand: this.newBrand,
        type: 'motor',
        model:this.newModel,
        speed: this.newSpeed,
        weight: this.newWeight,
        introduction: this.newIntroduction,
        number: this.newNumber,
        price:this.newPrice,
        src:this.newImg,
          })
this.newBrand='',this.newModel='',this.newPrice='',this.newSpeed='',this.newWeight=''
this.newNumber='',this.newIntroduction='',this.newImg=''
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