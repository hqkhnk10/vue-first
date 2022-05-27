<template>
  <div>
  <el-dialog
  title="edit"
  :visible.sync="dialogVisible"
  :close-on-click-modal="false"
  :before-close="handleClose"
  width="30%">
  
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" >
  <el-form-item label="model" prop="model">
    <el-input  v-model="ruleForm.model" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="price" prop="price">
    <el-input v-model.number="ruleForm.price"></el-input>
  </el-form-item>
  <el-form-item label="number" prop="number">
    <el-input v-model.number="ruleForm.number"></el-input>
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
  editData: {
      type: String,
      description: "Noi dung truyen vao",
    },
},

    data() {
      return {
        ruleForm:{
          id:'',
          model:'',
          price:'',
          number:'',
        },
        rules: {
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
          ],
          price: [
      { required: true, message: 'price is required'},
      { type: 'number', message: 'price must be a number'},
    ],
    number: [
      { required: true, message: 'price is required'},
      { type: 'number', message: 'price must be a number'},
    ],
   
      },
    };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('edit',this.ruleForm)
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
      editData: function(){
        var obj = JSON.parse(this.editData)
        this.ruleForm.id=obj.id
        this.ruleForm.model=obj.model
        this.ruleForm.price=obj.price
        this.ruleForm.number=obj.number
      },
      dialogVisible: function(){
        this.dialogVisible1 = this.dialogVisible
      }
    }
  }
</script>

