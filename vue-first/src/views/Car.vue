<template>
    <div>
<el-dialog
  title="Edit"
  :visible.sync="dialogVisible"
  :close-on-click-modal="false"
  width="30%"
  >
  <el-form :rules="rul">
  <el-form-item
        >
        {{cars[i]}}
Car Model <br>
<el-input v-model="cars[i].model" v-on:input="Change(0,$event)"><br></el-input>
 </el-form-item>
 <el-form-item
          prop="price"
        >
Car Price <br><input  :value="cars[i].price" @change="Change(1,$event.target.value)"><br>
 </el-form-item>
<el-form-item
          prop="number"
        >
Car Left <br><input  :value="cars[i].number" @change="Change(2,$event.target.value)"><br>
  </el-form-item>
  </el-form>
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
      {{ scope.row.price }}<br>
      Car Left: {{scope.row.number}}
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
var carsObj =  require('../utils/cars.js');
var cars = carsObj.cars;
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
            cars,newBrand,newModel,newIntroduction,newPrice,newSpeed,newWeight,newNumber,newImg,
            dialogVisible,id,idxArr,displaySearch,searchModel,
            i,valArr,addForm,doList,doForm,trig,
            search:this.$route.params.id,
             rul: {
        model: [
          {
            required: true,
            message: "Vui lòng không để trống",
            trigger: "blur",
          },
          {
            min: 3,
            max: 25,
            message: "Từ 3 - 25 ký tự",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "không chứa ký tự đặc biệt",
            trigger: "blur",
          },
          // {
          //   required: true,
          //   pattern: /[^a-z0-9A-Z_\x{00C0}-\x{00FF}\x{1EA0}-\x{1EFF}]/u,
          //   message: " không được chứa khoảng trắng",
          //   trigger: "blur",
          // },
        ],
        price: [
          {
            required: true,
            message: "Vui lòng không để trống",
            trigger: "blur",
          },
          // {
          //   type: "number",
          //   pattern:
          //     "^(?=\\d{2}([-.,\\/])\\d{2}\\1\\d{4}$)(?:0[1-9]|1\\d|[2][0-8]|29(?!.02.(?!(?!(?:[02468][1-35-79]|[13579][0-13-57-9])00)\\d{2}(?:[02468][048]|[13579][26])))|30(?!.02)|31(?=.(?:0[13578]|10|12))).(?:0[1-9]|1[012]).\\d{4}$",
          //   message: "Kiểu nhập Ngày-tháng-năm",
          //   trigger: "blur",
          // },
        ],
        number: [
          {
            required: true,
            message: "Vui lòng không để trống",
            trigger: "blur",
          },
          {
            type: "number",
            message: "Vui lòng nhập ký tự là số",
            trigger: "blur",
          },
        ],
      },
        }
    },
    watch: {
    $route() {
      this.search=this.$route.params.id;
    }
  },
    computed: {
      filterCar(){
        if(this.search!='allcar'){
        var abc=cars.filter(car => car.brand.toLowerCase() == this.search.toLowerCase());
          if(this.searchModel!=''){
              var abd=cars.filter(car => car.model.toLowerCase() == this.searchModel.toLowerCase());
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
              var abdf=cars.filter(car => car.model.toLowerCase() == this.searchModel.toLowerCase());
          return abdf;
           }
          return cars;
        }
      }
    },
    methods: {
      consol(){
        console.log(2)
      },
      searchInput(){
        this.displaySearch=!this.displaySearch;
      },
      handleEdit(row) {
        this.dialogVisible=true;
        this.i=cars.findIndex(car => car== row);
        this.trig=true;
        doList.push('Edit '+ row.brand)
        console.log(carsObj.carList)
      },
      handleDelete(row) {
        cars.splice(cars.findIndex(car => car== row),1);
        this.trig=true;
        doList.push('Delete '+ row.model)
      },
      Change(idx,val){
        valArr[idx]=val;
        idxArr.push(idx);
        console.log(valArr,idxArr);
      },
      cancel(){
         this.dialogVisible=false;
        valArr.splice(0,valArr.length);
      },
      confirm(){
        this.dialogVisible=false;
        for(let idx=0;idx<idxArr.length;idx++){
          switch(idxArr[idx]){
            case 0:
              cars[this.i].model=valArr[0];
              break;
            case 1:
              cars[this.i].price=valArr[1];
              break;
            case 2:
              cars[this.i].number=valArr[2];
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
this.newImg='https://www.lexus.com.vn/content/dam/lexus-v3-blueprint/price-list/my22/lexus-nx.jpg'
        }
        cars.push({
        id:id++,
        brand: this.newBrand,
        type: 'Car',
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