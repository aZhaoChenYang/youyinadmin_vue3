<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item :index="1">微信配置</el-menu-item>
    <el-menu-item :index="2">会员配置</el-menu-item>
    <el-menu-item :index="3">上传配置</el-menu-item>
  </el-menu>
  <set1 v-if="activeIndex === 1"></set1>
  <set2 v-else-if="activeIndex === 2" class="set"></set2>
  <set3 v-else></set3>
</template>

<script setup lang="ts">
import Set1 from './components/set1.vue'
import Set2 from './components/set2.vue'
import Set3 from './components/set3.vue'

const activeIndex = ref(1)

const handleSelect = (index: number) => {
  activeIndex.value = index
}

</script>

<style scoped>

</style>
