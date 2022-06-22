<template>
    <el-form :model="myData" :rules="rulesLj" ref="ruleLjForm" label-position="top" label-width="100px" class="demo-ruleLjForm">
        <el-form-item label="开端是否连接询问" prop="isConnect">
            <el-input v-model="myData.isConnect" @input="change('isConnect',myData.isConnect,'edge')"></el-input>
        </el-form-item>
        <el-form-item label="开端询问情形" prop="situation">
            <el-select v-model="myData.situation" :value-key="myData.situation" @change="change('situation',myData.situation,'edge')" placeholder="请选择开端询问情形">
            <el-option label="是" value="yes"></el-option>
            <el-option label="否" value="no"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="补充描述" prop="desc">
            <el-input type="textarea" v-model="myData.desc" @input="change('desc',myData.desc,'edge')"></el-input>
        </el-form-item>
        <el-form-item label="连接颜色修改" prop="color">
            <el-color-picker v-model="myData.color" @change="change('color',myData.color,'edge')"></el-color-picker>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  name: 'Connect',
  props:['myData'],
  data() {
    return {
        rulesLj: {
            isConnect: [
                { required: true, message: '请输入开端是否连接询问', trigger: 'blur' },
            ],
            situation: [
                { required: true, message: '请选择开端询问情形', trigger: 'change' }
            ],
            desc: [
                { required: true, message: '请填写补充描述', trigger: 'blur' }
            ]
      },
    }
  },
  methods:{
    change(key, value, type) {
      this.$emit('changeChild',key, value, type)
    }
  }
}
</script>
