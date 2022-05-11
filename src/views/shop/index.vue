<template>
  <div class="page_shoptable">
    <!-- 搜索栏 -->
    <div class="shopIndexSearch">
      <el-row class="shopIndexSearchRow">
        <el-col :span="2">
          <el-button type="primary" size="small" class="shopFont" @click="jump_shopadd()">添加门店</el-button>
        </el-col>
        <el-col :span="4">
          <el-input v-model="input" placeholder="请输入门店名字" clearable>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="success" size="small" @click="ser_name">查找</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="info" size="small" @click="get_shop()">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="dramaIndexSelectTable">
      <el-table :data="tableData" border style="width: 90%">
        <el-table-column prop="id" label="编号" width="80" fixed>
        </el-table-column>
        <el-table-column prop="name" label="门店名称" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="address" label="详细地址">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="scope">
            <el-button type="success" @click="jump_to_shopEdit(scope.row)">修改</el-button>
            <el-button type="danger" @click="delete_shop(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/axiosReq'
import {ElMessage, ElMessageBox} from "element-plus";

const state = reactive({
  tableData: [],
  input: "",
})
const get_shop = () => {
  request({
    url: '/shop',
    method: 'get',
  }).then(res => {
    state.tableData = res.data
    state.input = ""
  })
};

const ser_name = () => {
  const name = state.input
  const arr = []
  for (const k in state.tableData) {
    const v = state.tableData[k]
    if (v.name.indexOf(name) >= 0) {
      arr.push(v)
    }
  }
  state.tableData = arr
}

const router = useRouter()

const jump_shopadd = () => {
  router.push({
    path: '/shop/detail',
  })
}

const jump_to_shopEdit = (row) => {
  router.push({
    path: '/shop/detail',
    query: {
      id: row.id,
    }
  })
}

const delete_shop = (id) => {


  ElMessageBox.confirm('确定删除该店铺吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    request({
      url: '/shop',
      method: 'delete',
      data: {
        id: id,
      },
      isParams: true,
      isAlertErrorMsg: false,
    }).then(res => {
      ElMessage.success('删除成功')
      get_shop()
    }).catch(err => {
      ElMessage.error('删除失败')
    })
  })
}

onMounted(() => {
  get_shop()
})

const {tableData, input} = toRefs(state)
</script>

<style scoped>

</style>
