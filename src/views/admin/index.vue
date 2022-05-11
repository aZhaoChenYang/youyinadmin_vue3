<template>
  <div class="page_admin">
    <div class="adminIndexSearch">
      <el-row class="adminIndexSearchRow">
        <el-col :span="2">
          <el-button size="small" type="primary" @click="dialogVisible = true; type = 1">添加管理员</el-button>
        </el-col>
      </el-row>
      <!-- 弹出框:添加用户-->
      <el-dialog v-model="dialogVisible" title="提示" width="30%">
        <el-row class="adminIndex_el_row">
          <el-col :span="4">用户名</el-col>
          <el-col :span="13">
            <el-input v-model="newAdmin.username" placeholder="请输入内容" clearable :readonly="type!==1"></el-input>
          </el-col>
        </el-row>
        <el-row class="adminIndex_el_row">
          <el-col :span="4">昵称</el-col>
          <el-col :span="13">
            <el-input v-model="newAdmin.nickname" placeholder="请输入内容" clearable></el-input>
          </el-col>
        </el-row>
        <el-row class="adminIndex_el_row">
          <el-col :span="4">密码</el-col>
          <el-col :span="13">
            <el-input v-model="newAdmin.password" placeholder="请输入内容" show-password></el-input>
          </el-col>
        </el-row>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="type === 1" type="primary" @click="add_admin()">确 定</el-button>
          <el-button v-if="type === 2" type="primary" @click="up_admin()">修改</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 管理员列表 -->
    <div class="adminIndexSelectTable">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="success" @click="send_editData(scope.row)">修改</el-button>
            <el-button type="danger" @click="del_admin(scope.row.id)">删除</el-button>
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
  dialogVisible: false,
  type: 1,
})

const newAdmin = reactive({
  username: '',
  nickname: '',
  password: '',
})

const getAdminList = () => {
  request({
    url: '/admin',
    method: 'get',
  }).then(res => {
    state.tableData = res.data
  })
}

const send_editData = (row) => {
  state.type = 2
  state.dialogVisible = true
  newAdmin.username = row.username
  newAdmin.nickname = row.nickname
  newAdmin.id = row.id
}

const up_admin = () => {
  request({
    url: '/admin',
    method: 'put',
    data: newAdmin,
  }).then(res => {
    state.dialogVisible = false
    state.type = 1
    getAdminList()
    ElMessage.success('修改成功')
  })
}

const add_admin = () => {
  request({
    url: '/admin',
    method: 'post',
    data: newAdmin,
  }).then(res => {
    state.dialogVisible = false
    state.type = 1
    getAdminList()
    ElMessage.success('添加成功')
  })
}

const del_admin = (id) => {
  ElMessageBox.confirm('确定删除该管理员吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
      request({
        url: '/admin',
        method: 'delete',
        data: {id},
        isParams: true,
      }).then(res => {
        getAdminList()
        ElMessage.success('删除成功')
      })
    }
  )
}

onMounted(() => {
  getAdminList()
})

const {tableData, dialogVisible, type} = toRefs(state)
</script>

<style scoped>

</style>
