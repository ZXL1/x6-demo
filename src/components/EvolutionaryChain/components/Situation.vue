<template>
    <el-form :model="myData" :rules="rulesTs" ref="ruleTsForm" label-position="top" label-width="100px" class="demo-ruleTsForm">
        <el-form-item label="当前态势" prop="name">
            <el-input v-model="myData.name" @input="change('name', myData.name, 'node')"></el-input>
        </el-form-item>
        <el-form-item label="补充描述" prop="desc">
            <el-input type="textarea" v-model="myData.desc" @input="change('desc', myData.desc, 'node')"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  name: 'Situation',
  props:['myData'],
  data() {
    return {
        // 当前态势
      ruleTsForm:{
        name: '',
        desc: ''
      },
      rulesTs: {
        name: [
          { required: true, message: '请输入当前态势', trigger: 'blur' },
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
