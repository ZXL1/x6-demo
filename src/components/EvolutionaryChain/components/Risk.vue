<template>
    <el-form :model="myData" :rules="rulesFx" ref="ruleFxForm" label-position="top" label-width="100px" class="demo-ruleFxForm">
        <el-form-item label="风险类型" prop="name">
            <el-input v-model="myData.name" @input="change('name', myData.name, 'node')"></el-input>
        </el-form-item>
        <el-form-item label="补充描述" prop="desc">
            <el-input type="textarea" v-model="myData.desc" @input="change('desc', myData.desc, 'node')"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  name: 'Risk',
  props:['myData'],
  data() {
    return {
      rulesFx: {
        name: [
          { required: true, message: '请输入风险类型', trigger: 'blur' },
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
