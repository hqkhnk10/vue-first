<template>
  <div>
  <el-dialog
  title="Add"
  :visible.sync="dialogVisible"
  :close-on-click-modal="false"
  :before-close="handleClose"
  width="30%">
  
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  
  <el-form-item label="Type" prop="type">
    <el-select v-model="ruleForm.type" placeholder="Vehicle type">
      <el-option label="Car" value="Car"></el-option>
      <el-option label="Motor" value="Motor"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Brand" prop="brand">
    <el-input v-model="ruleForm.brand"></el-input>
  </el-form-item>
  <el-form-item label="Model" prop="model">
    <el-input v-model="ruleForm.model"></el-input>
  </el-form-item>
  <el-form-item label="Date" required>
      <el-form-item prop="introduction">
        <el-date-picker type="date" placeholder="Pick a date" format="yyyy/MM/dd"
      value-format="yyyy-MM-dd" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
  </el-form-item>
 
 <el-form-item label="Price" prop="price">
    <el-input v-model.number="ruleForm.price"></el-input>
  </el-form-item>

  <el-form-item>
  <input class="m-2" type="file" @change="imageUpload">
</el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
    <el-button @click="resetForm('ruleForm')">Reset</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</div>
</template>

<script>
import axios from "axios";
  export default {
      props: {
  dialogVisible:{
    type: Boolean,
  },
},
    data() {
      return {
        fileList:[],
        dialogImageUrl: '',
      iconClass:'el-icon-circle-plus',

        disabled: false,
        ruleForm: {
          brand: '',
          model: '',
          type: '',
          date: '',
          price:'',
          photo:'',
        },
        rules: {
          brand: [
            { required: true, message: 'Please input brand name', trigger: 'blur' },
            { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'blur' }
          ],
          model: [
            { required: true, message: 'Please input model name', trigger: 'blur' },
            { min: 3, max: 25, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
          type: [
            { required: true, message: 'Please select ', trigger: 'change' }
          ],
          date: [
            {  required: true, message: 'Please pick a date', trigger: 'change' }
          ],
          price: [
      { required: true, message: 'price is required'},
      { type: 'number', message: 'price must be a number'},
    ],
        }
      };
    },
    methods: {
      imageUpload(event){
        let formData=new FormData();
        formData.append(this.ruleForm.model,event.target.files[0]);
        axios.post(
            "https://localhost:44307/api/fileupload/savefile",
            formData)
            .then((response)=>{
                this.ruleForm.photo=response.data;
            });
    },
      handlePictureCardPreview(file) {
        this.iconClass='el-icon-success';
        this.ruleForm.src = file.url;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          
            this.$emit('add',this.ruleForm)
 this.ruleForm.brand='',this.ruleForm.model='',
 this.ruleForm.type='',this.ruleForm.date='',
 this.ruleForm.price='', this.ruleForm.photo='',
        this.$emit('toggleDialogueForm')
             this.$notify.success({
              title: "Success",
              message: "Success edit",
            });
          } else {
            this.$notify.error({
              title: "error",
              message: "error",
            })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
         this.dialogVisible1=false;
        this.$emit('toggleDialogueForm')
      },
    handleClose(){
this.$emit('toggleDialogueForm')    },
    },
    watch: {
      
      dialogVisible: function(){
        this.dialogVisible1 = this.dialogVisible
      }
    }
  }
</script>

