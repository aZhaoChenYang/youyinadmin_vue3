<template>
  <div class="page_dramaIndex">
    <div class="dramaIndexSearch">
      <el-row class="dramaIndexSearchRow">
        <el-col :span="2">
          <el-button type="primary" size="small" class="dramaFont" @click="jump_add">添加剧本</el-button>
        </el-col>
        <el-col :span="4">
          <el-input v-model="input" placeholder="请输入剧本名字" clearable>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="success" size="small" @click="ser_dra()">查找</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="infor" size="small" @click="get_script()">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="dramaIndexSelectTable">
      <el-table :data="tableData" border style="width: 95%">
        <el-table-column prop="id" label="编号" width="80">
        </el-table-column>
        <el-table-column prop="title" label="剧本名称" width="180">
        </el-table-column>
        <el-table-column label="剧本封面" width="180">
          <template #default="scope" >
            <img style="width: 40%;height: 40%;" :src="scope.row.imgurl"/>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="预计时长/小时">
        </el-table-column>

        <el-table-column prop="boys" label="男生人数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="girls" label="女生人数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="shop_name" label="门店">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="scope">
            <el-button type="success" @click="jump_to_dramaEdit(scope.row)">修改</el-button>
            <el-button type="danger" @click="delete_drama(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/axiosReq'
import {ElMessageBox} from "element-plus";
import {ElMessage} from "element-plus";

let state = reactive({
  tableData: [],
  input: "",
})
const ser_dra = () => {
  const name = state.input
  const arr = []
  for (const k in state.tableData) {
    const v = state.tableData[k]
    if (v.title.indexOf(name) >= 0) {
      arr.push(v)
    }
  }
  state.tableData = arr
}
const get_script = () => {
  request({
    url: 'script',
    method: 'get',
  }).then(res => {
    state.tableData = res.data
  })
}
const delete_drama = (id) => {
  ElMessageBox.confirm('确定删除该剧本吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    request({
      url: 'script',
      data: {
        id: id
      },
      isParams: true,
      method: 'delete',
      isAlertErrorMsg: false
    }).then(res => {
      console.log(res)
      get_script()
    }).catch(err => {
      ElMessage.error("删除失败")
    })
  }).catch(() => {
    console.log('取消')
  })


}
onMounted(() => {
  get_script()
})

const { tableData, input } = toRefs(state)
</script>

<style scoped>
.dramaIndexSelectTable {
  margin-top: 10px;
}
.dramaIndexSearch {

}
.dramaIndexSearchRow{
  display: flex;
  align-items: center;
}
.dramaFont{
  color: white;
  text-decoration: none;
}
</style>
