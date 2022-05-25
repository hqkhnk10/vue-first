<template>
  
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="Password" prop="model">
    <el-input type="password" v-model="ruleForm.model" autocomplete="off"></el-input>
  </el-form-item>
 
  <el-form-item label="price" prop="price">
    <el-input v-model.number="ruleForm.price"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
    <el-button @click="resetForm('ruleForm')">Reset</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
props: ['title','formType','data','dialogVisible'],

    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input the price'));
        }
        else{callback()}
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
         
          callback();
        }
      };
     
      return {
        rules: {
          model: [
            { validator: validatePass, trigger: 'blur' }
          ],
         
          price: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    computed:{
  ruleForm: function(){
      return this.data
  }
},
  }
</script>

