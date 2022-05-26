<template>
  <div>
    {{ruleForm}}
{{dialogVisible}}
  <el-dialog
  title="Tips"
  :visible.sync="dialogVisible"
  :close-on-click-modal="false"
  :before-close="handleClose"
  width="30%">
  
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="model" prop="model">
    <el-input  v-model="ruleForm.model" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="price" prop="price">
    <el-input v-model.number="ruleForm.price"></el-input>
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
  dataa: {
      type: String,
      description: "Noi dung truyen vao",
    },
},

    data() {
      return {
        dialogVisible1:false,
        ruleForm:{
          model:'',
          price:'',
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
      { type: 'number', message: 'price must be a number'}
    ]
      },
    };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('edit',this.ruleForm)
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
        this.$emit('toggleDialogueForm')
      },
    handleClose(){
this.$emit('toggleDialogueForm')    },
    },
    watch: {
      dataa: function(){
        var obj = JSON.parse(this.dataa)
        this.ruleForm.model=obj.model
        this.ruleForm.price=obj.price
      },
      dialogVisible: function(){
        this.dialogVisible1 = this.dialogVisible
      }
    }
  }
</script>

