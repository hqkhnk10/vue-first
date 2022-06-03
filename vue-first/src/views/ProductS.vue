<template>
<div>
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
   
 <el-table-column label="Nguoi nhap" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.who }}
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
  export default {
components:{
    'edit-child':editChildVue,
    'add-child':addChildVue,
  },
    data() {
      return {
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
      addData(abc){
         this.dataList.push(abc)
      },
      addChild(){
        this.AddshowDialogueForm=!this.AddshowDialogueForm
      },
      updateData(abc){
        var found = this.dataList.findIndex(car => car.id == abc.id)
        this.dataList[found].brand= abc.brand
        this.dataList[found].date= abc.date
        this.dataList[found].left= abc.left
        this.dataList[found].who= abc.who
      },
      handleEdit(row) {
        this.editData=JSON.stringify(row)
        this.dialogVisible=true;
        this.editDialogueForm=!this.editDialogueForm;
        console.log( this.editData)
      },
       deleteData(){
this.deleteDialog=false;
console.log(this.dataList.findIndex(car => car== this.storeDelete))
this.dataList.splice(this.dataList.findIndex(car => car== this.storeDelete),1);
console.log(this.dataList)
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
        this.$router.push({name:event.type ,params: { id: event.brand }})
      }
    }
  }
</script>
