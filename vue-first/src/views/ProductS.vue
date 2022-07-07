<template>
<div>
  <el-button type="primary" @click="test">Test</el-button>

<el-menu
class="el-menu-demo"
  mode="horizontal"
    @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
<template v-for="(rule, index) in treeData">
            
             <el-menu-item 
                           :key="index"
                           :index="rule.name"
             >{{ rule.name }}
             </el-menu-item>

           
        </template>
<el-button style="height:50px" @click="wantaddParent = true">Add Parent</el-button>
</el-menu>

<el-dialog
  title="Add"
  :visible.sync="addDialogVisible"
  width="30%">
  <el-input v-model="data"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="addDialogVisible = false,addData(data)">Confirm</el-button>
  </span>
</el-dialog>

<el-dialog
  title="Add Parent"
  :visible.sync="wantaddParent"
  width="30%">
  <el-input v-model="data"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="wantaddParent = false">Cancel</el-button>
    <el-button type="primary" @click="wantaddParent = false,addParent(data)">Confirm</el-button>
  </span>
</el-dialog>

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
  <el-button v-show="showTable" @click="addChild">Add Child</el-button>

<edit-child
:dialogVisible="editDialogueForm"
:editData="editData"
@toggleDialogueForm="editDialogueForm=!editDialogueForm"
@edit="updateData"
/>

<add-child
:dialogVisible="AddshowDialogueForm"
:editData="addData"
@toggleDialogueForm="AddshowDialogueForm=!AddshowDialogueForm"
@add="addData"
/>

<el-table
    v-show="showTable"
    :data="company"
    @row-dblclick="doubleClickEvent($event)"
    ref="productList"
    style="width: 100%"
  >
    <el-table-column label="ID" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.company_id }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="Name" width="180">
      <template slot-scope="scope">
        {{ scope.row.company_name }}
      </template>
    </el-table-column>
    
    <el-table-column label="Address" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.company_address }}
        </span>
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

    <router-view :key="$route.fullPath"/>
</div>
</template>

<script>
    import editChildVue from "@/components/editChild.vue";
import {carList} from "@/utils/cars"
    import {motorList} from "@/utils/motors"
import AboutVue from "./About.vue";
import addChildVue from '@/components/addChild.vue';
import axios from "axios";


  export default {
     mounted:function(){
    this.refreshData();
},
components:{
    'edit-child':editChildVue,
    'add-child':addChildVue,
  },
    data() {
      return {
        company:[],
        motorList,carList,carSelected:false,showTable:false,data:'',
        wantaddParent:false,wantaddChildren:false,addDialogVisible:false,
         storeDelete:'',deleteDialog:false,editData:'',editDialogueForm:false,
        AddshowDialogueForm:false,
        treeData:[
           {
        name: "car",
        children: [
          { name: "toyota" },
          { name: "hyundai" },
          {
            name: "vinfast",
          }
        ]
      },
       {name: "motor",
        children: [
          { name: "yamaha" },
          { name: "honda" },
          {
            name: "suzuki",
          
          }
        ]
      },
      ]
      };
    },
   
    computed:{
      dataList: function(){
        return this.carSelected ? carList  : motorList;
      }
    },
    methods: {
      test(){
        this.refreshData();
      },
       refreshData(){
        axios.get("https://localhost:44307/api/company")
        .then((response)=>{
            this.company=response.data;
        });
    },

deleteData(){
this.deleteDialog=false;
console.log(this.storeDelete.car_id);
axios.delete("https://localhost:44307/api/company/"+this.storeDelete.company_id)
        .then(()=>{
            this.refreshData();
        });
        this.$router.go(-1)
      },
       addData(abc){
        console.log(abc)
        axios.post("https://localhost:44307/api/company",{
            company_name:abc.brand,
            company_address:abc.who,
        })
        .then(()=>{
            this.refreshData();
        });
      },
       updateData(abc){
       console.log(abc)
        axios.put("https://localhost:44307/api/company",{
            company_id : abc.id,
            company_name:abc.brand,
            company_address:abc.who,
        })
        .then(()=>{
            this.refreshData();
        });

      },


      
      addChild(){
        this.AddshowDialogueForm=!this.AddshowDialogueForm
      },
     
      handleEdit(row) {
        this.editData=JSON.stringify(row)
        this.dialogVisible=true;
        this.editDialogueForm=!this.editDialogueForm;
        console.log( this.editData)
      },
      
      handleDelete(row) {
        this.deleteDialog=!this.deleteDialog;
        this.storeDelete=row;
      },
      addChildren(child){ 
        child.children.push({name:'Child'})
        console.log(child)},
      addParent(){
        if(this.data!=''){
        this.treeData.push({name:this.data})}
        this.data='';
      },
     abc(){
       this.$router.addRoute({parentName: 'ProductS', path: '/about', name: 'about', component: AboutVue })
       console.log(this.treeData)
     },
      handleSelect(key) {
      this.showTable=true;
      console.log(key);
      (key == 'car') ? this.carSelected =true : this.carSelected =false;
 },
      doubleClickEvent(event){
        this.$router.push({name:'car' ,params: { id: event.company_id }})
      }
    }
  }
</script>
