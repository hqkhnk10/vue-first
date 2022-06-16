<template>
  <div>
  <el-dialog
  title="edit"
  :visible.sync="dialogVisible"
  :close-on-click-modal="false"
  :before-close="handleClose"
  width="30%">
  
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" >
  <el-form-item label="brand" prop="brand">
    <el-input  v-model="ruleForm.brand" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="model" prop="model">
    <el-input  v-model="ruleForm.model" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="price" prop="price">
    <el-input v-model.number="ruleForm.price"></el-input>
  </el-form-item>
  <el-form-item label="date" prop="date">
      <el-form-item prop="introduction">
        <el-date-picker type="date" placeholder="Pick a date"  format="yyyy/MM/dd"
      value-format="yyyy-MM-dd" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
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
          brand:'',
          model:'',
          price:'',
          number:'',
          photo:'',
          date:'',
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
   date: [
            { required: true, message: 'Please pick a date', trigger: 'change' }
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
        this.ruleForm.id=obj.car_id
        this.ruleForm.brand=obj.car_brand
        this.ruleForm.model=obj.car_model
        this.ruleForm.price=obj.car_price
        this.ruleForm.photo=obj.car_photo
        this.ruleForm.date=obj.car_date
        this.ruleForm.number=obj.car_number
      },
      dialogVisible: function(){
        this.dialogVisible1 = this.dialogVisible
      }
    }
  }
</script>

