<template>
  <div>
  <el-dialog
  title="edit"
  :visible.sync="dialogVisible"
  :close-on-click-modal="false"
  :before-close="handleClose"
  width="30%">

<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" >
  <el-form-item label="Name" prop="brand">
    <el-input v-model="ruleForm.brand"></el-input>
  </el-form-item>
  <el-form-item label="Address" prop="who">
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
          who:'',
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
      },
    };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('add',this.ruleForm)
            this.ruleForm.brand='',this.ruleForm.who=''
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

