<template>
  <div class="set1">
    <el-row v-for="(item, index) in set" :key="index" class="set1-el-row">
      <el-col :span="2">{{ item.desc }}</el-col>
      <el-col :span="6">
        <el-input v-model="item.value" placeholder="请输入内容">
          <template #prepend>基础费折扣</template>
        </el-input>
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <el-input v-model="item.value1" placeholder="请输入内容">
          <template #prepend>附加费折扣</template>
        </el-input>
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-button type="primary" class="class_bt" @click="edit_set()">修改</el-button>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/axiosReq'
import {ElMessage} from "element-plus";
const set = ref([])
const get_allSet = () => {
  request({
    url: "setting",
    method: "get",
    data: {
      type: "1"
    },
    isParams: true
  }).then(res => {
    set.value = res.data
  })
}
const edit_set = () => {
  request({
    url: "setting",
    method: "put",
    data: set.value,
  }).then(res => {
    ElMessage.success("修改成功")
  })
}

onMounted(() => {
  get_allSet()
})
</script>

<style scoped lang="scss">
.set1 {
  background-color: white;
  min-height: calc(100vh);
  font-size: 14px;

  .set1-el-row {
    margin-left: 60px;
    padding-top: 30px;
    display: flex;
    align-items: center;
  }

  .class_bt {
    width: 200px;
    margin-top: 20px;
    margin-left: 300px;
  }
}
</style>
