<template>
    <el-form :model="myData" :rules="rulesCz" ref="ruleCzForm" label-position="top" label-width="100px" class="demo-ruleCzForm">
        <el-form-item label="处置指令" prop="name">
            <el-input v-model="myData.name" @input="change('name', myData.name, 'node')"></el-input>
        </el-form-item>
        <el-form-item label="处置小组" prop="group">
        <el-select v-model="myData.group" :value-key="myData.group" @change="change('group', myData.group, 'node')" placeholder="请选择处置小组">
            <el-option label="一组" value="yz"></el-option>
            <el-option label="二组" value="ez"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="处置人员" prop="person">
        <el-select v-model="myData.person" :value-key="myData.person" @change="change('person', myData.person, 'node')" placeholder="请选择处置人员">
            <el-option label="组长" value="zz"></el-option>
            <el-option label="队长" value="dz"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="处置过程描述" prop="desc">
            <el-input type="textarea" v-model="myData.desc" @input="change('desc', myData.desc, 'node')"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  name: 'Dispose',
  props:['myData'],
  data() {
    return {
      rulesCz: {
        name: [
          { required: true, message: '请输入处置指令', trigger: 'blur' },
        ],
        group: [
          { required: true, message: '请选择处置小组', trigger: 'change' }
        ],
        person: [
          { required: true, message: '请选择处置人员', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写处置过程描述', trigger: 'blur' }
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
