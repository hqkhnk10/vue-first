<template>
<div>
    <button @click="updateClick">updateClick</button>
    <button @click="createClick">createClick</button>
    <button @click="deleteClick(5)">deleteClick</button>
    <button @click="addLocal"></button>
</div>
</template>
<script>
import axios from "axios";
export default{
    data(){
    return{
        cars:[],
    }
},
methods:{
    refreshData(){
        axios.get("https://localhost:44307/cars")
        .then((response)=>{
            this.cars=response.data;
        });

        axios.get("https://localhost:44307/cars")
        .then((response)=>{
            this.departments=response.data;
        });
    },
    addClick(){
        this.modalTitle="Add Employee";
        this.EmployeeId=0;
        this.EmployeeName="";
        this.Department="",
        this.DateOfJoining="",
        this.PhotoFileName="anonymous.png"
    },
    editClick(emp){
        this.modalTitle="Edit Employee";
        this.EmployeeId=emp.EmployeeId;
        this.EmployeeName=emp.EmployeeName;
        this.Department=emp.Department,
        this.DateOfJoining=emp.DateOfJoining,
        this.PhotoFileName=emp.PhotoFileName
    },
    createClick(){
        axios.post("https://localhost:44307/cars",{
            car_brand:"this.EmployeeName",
            car_model:"this.Department",
            car_price:12,
            car_photo:"this.PhotoFileName",
            car_date:"2022-10-10",
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick(){
        axios.patch("https://localhost:44307/cars",{
            car_brand:"this.EmployeeName",
            car_model:"this.Department",
            car_price:12,
            car_photo:"this.PhotoFileName",
            car_date:"2002-12-10"
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id){
        axios.delete("https://localhost:44307/cars/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },

},
mounted:function(){
    this.refreshData();
}
    }

</script>
