<template>
  <div class="pages_swiper">
    <div class="btn">
      <el-button type="primary" size="medium" @click="open_add()">添加轮播图</el-button>
    </div>
    <div class="swiperTable">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="编号" width="80">
        </el-table-column>
        <el-table-column label="缩略图" width="180">
          <template #default="scope">
            <img style="width: 40%;height: 40%;" :src="scope.row.imgurl" alt=""/>
          </template>
        </el-table-column>
        <el-table-column prop="shop_name" label="店铺" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="medium" type="success" @click="send_edit(scope.row)">修改</el-button>
            <el-button size="medium" type="danger" @click="del_swiper(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog v-model="dialogFormVisible" title="轮播图" destroy-on-close>
      <el-row class="swiperIndex_el_row">
        <el-col :span="4">图片</el-col>
        <el-col :span="13">
          <el-upload
            class="avatar-uploader"
            :action="upLoadSetting.upfile_url"
            :on-success="upLoadSetting.upimg_back_fun"
            :headers="upLoadSetting.heads"
            :show-file-list="false"
            name="img">
            <img v-if="subform.imgurl" :src="subform.imgurl" class="avatar" alt="" style="height: 50px; width: 50px">
            <ElSvgIcon v-else name="Plus" :size="50" color="blue"/>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="swiperIndex_el_row">
        <el-col :span="4">店铺</el-col>
        <el-col :span="13">
          <el-select v-model="subform.shop_id" placeholder="请选择门店">
            <el-option v-for="(item,index) in shop" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-if="edit_type === 0" type="primary" @click="add_swiper()">确 定</el-button>
          <el-button v-if="edit_type === 1" type="primary" @click="edit_swiper()">修改</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/axiosReq'
import {getToken} from "@/utils/auth";
import {ElMessageBox} from "element-plus";

const state = reactive({
  tableData: [],
  shop: [],
  dialogFormVisible: false,
  edit_type: 0,
});

const subform = reactive({
  id: 0,
  shop_id: '',
  imgurl: '',
});

const upLoadSetting = reactive({
  upfile_url: import.meta.env.VITE_APP_BASE_URL + '/upload',
  heads: {
    Authorization: getToken()
  },
  upimg_back_fun(res) {
    subform.imgurl = res.data;
  },
})

const get_allSwiper = () => {
  request({
    method: 'get',
    url: 'swiper',
  }).then(res => {
    res.data.forEach(item => {
      state.shop.forEach(shop => {
        if (item.shop_id === shop.id) {
          item.shop_name = shop.name
        }
      })
    })
    state.tableData = res.data;
  });
};

const get_shop = () => {
  request({
    method: 'get',
    url: 'shop',
  }).then(res => {
    state.shop = res.data;
    get_allSwiper()
  });
};

const open_add = () => {
  state.dialogFormVisible = true;
  state.edit_type = 0;
  subform.shop_id = '';
  subform.imgurl = '';
  subform.id = 0
}

const send_edit = (row) => {
  state.dialogFormVisible = true;
  state.edit_type = 1;
  subform.shop_id = row.shop_id;
  subform.imgurl = row.imgurl;
  subform.id = row.id;
}

const del_swiper = (id) => {
  ElMessageBox.confirm('确定删除轮播图吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    request({
      method: 'delete',
      url: 'swiper',
      data: {
        id: id
      },
      isParams: true
    }).then(res => {
      get_allSwiper()
    });
  }).catch(() => {
    console.log('取消删除')
  });
}

const add_swiper = () => {
  request({
    method: 'post',
    url: 'swiper',
    data: subform,
  }).then(res => {
    get_allSwiper()
    state.dialogFormVisible = false;
  });
}

const edit_swiper = () => {
  request({
    method: 'put',
    url: 'swiper',
    data: subform,
  }).then(res => {
    get_allSwiper()
    state.dialogFormVisible = false;
  });
}

onMounted(async () => {
  get_shop();
});
const {tableData, shop, dialogFormVisible, edit_type} = toRefs(state);
</script>

<style scoped lang="scss">

</style>
