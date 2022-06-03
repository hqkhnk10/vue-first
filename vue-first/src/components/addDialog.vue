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
        <el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.introduction" style="width: 100%;"></el-date-picker>
      </el-form-item>
  </el-form-item>
  <el-form-item label="Weight" prop="weight">
    <el-input v-model.number="ruleForm.weight"></el-input>
  </el-form-item>
  <el-form-item label="Speed" prop="speed">
    <el-input v-model.number="ruleForm.speed"></el-input>
  </el-form-item>
 <el-form-item label="Price" prop="price">
    <el-input v-model.number="ruleForm.price"></el-input>
  </el-form-item>
  <el-form-item label="Number" prop="number">
    <el-input v-model.number="ruleForm.number"></el-input>
  </el-form-item>
   <el-form-item label="Img">
      <span>Click + in the picture to verify</span>

  <el-upload
  action="#"
  list-type="picture-card"
  :auto-upload="false">
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">

        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i :class="iconClass"></i>
        </span>
      </span>
    </div>
  </el-upload>
  
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
  export default {
      props: {
  dialogVisible:{
    type: Boolean,
  },
},
    data() {
      return {
        dialogImageUrl: '',
      iconClass:'el-icon-circle-plus',

        disabled: false,
        ruleForm: {
          brand: '',
          model: '',
          type: '',
          introduction: '',
          speed: '',
          weight: '',
          price:'',
          number:'',
          src:'',
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
            { required: true, message: 'Please select Activity zone', trigger: 'change' }
          ],
          introduction: [
            { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
          ],
          price: [
      { required: true, message: 'price is required'},
      { type: 'number', message: 'price must be a number'},
    ],
    number: [
      { required: true, message: 'number is required'},
      { type: 'number', message: 'number must be a number'},
    ],
        }
      };
    },
    methods: {
      
      handlePictureCardPreview(file) {
        this.iconClass='el-icon-success';
        this.ruleForm.src = file.url;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('add',this.ruleForm)
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

