<template>
    <div >

<el-button type="primary" icon="el-icon-arrow-left" @click="navigate">Previous Page</el-button>
    <br>
<img :src="vehicle.src" width="600" height="400">
    <br>
     <el-button type="primary" @click="edit">Edit</el-button>
     

<el-dialog
  title="Edit"
  :visible.sync="dialogVisible"
  width="30%"
  >
 Car Brand <br><input :value="vehicle.brand" @change="Change(0,$event.target.value)"><br>
Car Model <br><input  :value="vehicle.model" @change="Change(1,$event.target.value)"><br>
Car Speed <br><input  :value="vehicle.speed" @change="Change(2,$event.target.value)"><br>
Car Weight <br><input  :value="vehicle.weight" @change="Change(3,$event.target.value)"><br>
Car Release date <br><input  :value="vehicle.introduction" @change="Change(4,$event.target.value)"><br>
Car Left <br><input  :value="vehicle.number" @change="Change(5,$event.target.value)"><br>
Car Price <br><input  :value="vehicle.price" @change="Change(6,$event.target.value)"><br>

  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">Cancel</el-button>
    <el-button type="primary" @click="confirm">Confirm</el-button>
  </span>
</el-dialog>

<add-dialog
:dialogVisible="showDialogueForm"
:editData="editData"
@toggleDialogueForm="showDialogueForm=!showDialogueForm"
@edit="updateData"
/>

    <table>
  <tr>
  <td>{{vehicle.type}} Brand</td>
  <td >{{vehicle.brand}}</td>
  </tr>
  <tr>
  <td>{{vehicle.type}} Model</td>
  <td >{{vehicle.model}}</td>

  </tr>
  <tr>
  <td>{{vehicle.type}} Max Speed</td>
  <td >{{vehicle.speed}}km/h</td>

  </tr>
  <tr>
  <td>{{vehicle.type}} Weight</td>
  <td >{{vehicle.weight}}kg</td>

  </tr>
  <tr>
  <td>{{vehicle.type}} Release date</td>
  <td >{{vehicle.introduction}}</td>

  </tr>
  <tr>
  <td>{{vehicle.type}} Price</td>
  <td >{{vehicle.price}}</td>
  </tr>
  <tr>
  <td>{{vehicle.type}} Left</td>
  <td >{{vehicle.number}}</td>
    <input type="text" v-show="vehicle.edit" v-model="vehicle.number"/>

  </tr>
</table>
    </div>
</template>

<script>
import { cars } from '@/utils/cars';
import router from '../routes';
import { motors } from '@/utils/motors';
var dialogVisible=false;
var valArr =[];
var idxArr =[];
    export default {
        data () {
            return {
              vehicleId:this.$route.params.id,
              vehicleType:this.$route.params.type,
              dialogVisible,valArr,idxArr,
              showDialogueForm:false,
            }
        },
          computed:{
            vehicle(){
                if(this.vehicleType=='car'){
              return cars.find(
                vehicle => vehicle.id === this.vehicleId,
              )}
              else{
                return motors.find(
                vehicle => vehicle.id === this.vehicleId,
              )
              }
            }
          },
          methods: {
            handleEdit() {
      
        this.editData=JSON.stringify(this.vehicle)
        this.showDialogueForm=!this.showDialogueForm;
      },
        navigate() {
                router.go(-1);
        },
        edit(){
          this.dialogVisible=!this.dialogVisible;
        },
        cancel(){
         this.dialogVisible=false;
        valArr.splice(0,valArr.length);
        console.log(valArr);
      },
      confirm(){
        this.dialogVisible=false;
        for(let i=0;i<idxArr.length;i++){
          switch(idxArr[i]){
            case 0:
              this.vehicle.brand=valArr[0];
              break;
            case 1:
              this.vehicle.model=valArr[1];
              break;
            case 2:
              this.vehicle.speed=valArr[2];
              break;
            case 3:
               this.vehicle.weight=valArr[3];
              break;
            case 4:
              this.vehicle.introduction=valArr[4];
              break;
            case 5:
              this.vehicle.number=valArr[5];
              break;
            case 6:
              this.vehicle.price=valArr[6];
              break;
          }
        }
      
        valArr.splice(0,valArr.length);
         console.log(valArr);
      },
      Change(idx,val){
        valArr[idx]=val;
        idxArr.push(idx);
        console.log(valArr);
      },
      
          }
    }
</script>

<style scoped>
input{
   border: 1px solid black;
   padding:1%;
}
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #D6EEEE;
}
</style>