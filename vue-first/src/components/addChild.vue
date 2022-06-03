<template>
  <div>
  <el-dialog
  title="edit"
  :visible.sync="dialogVisible"
  :close-on-click-modal="false"
  :before-close="handleClose"
  width="30%">

<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" >
  <el-form-item label="Brand" prop="brand">
    <el-input v-model="ruleForm.brand"></el-input>
  </el-form-item>
  <el-form-item label="Date" required>
      <el-form-item prop="date">
        <el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
  </el-form-item>
  <el-form-item label="Left" prop="left">
    <el-input v-model.number="ruleForm.left"></el-input>
  </el-form-item>
  <el-form-item label="Who" prop="who">
    <el-input v-model="ruleForm.who"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
    <el-button @click="resetForm('ruleForm')">Cancel</el-button>
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
        ruleForm:{
          id:'',
          brand:'',
          date:'',
          who:'',
          left:'',
        },
        rules: {
        brand: [
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
          ],
          who: [
            { required: true, message: 'Please input model name', trigger: 'blur' },
            { min: 3, max: 25, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
          date: [
            { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
          ],
    left: [
      { required: true, message: 'Left is required'},
      { type: 'number', message: 'Left must be a number'},
    ],
   
      },
    };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('add',this.ruleForm)
        this.$emit('toggleDialogueForm')
             this.$notify.success({
              title: "Success",
              message: "Success add",
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

