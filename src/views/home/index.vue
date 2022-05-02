<template>
  <div class="pages_Home">
    <el-row :gutter="20">
      <template v-for="(item,index) of message" :key="index">
        <el-col :span="6">
          <div class="tishi">
            <div class="ts_01">
              <div class="ts_01_l">{{ item.types }}</div>
            </div>
            <div class="ts_02">
              <div class="ts_02_l">
                <span>{{ item.num }}</span><br/>
                {{ item.mess }}
              </div>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/axiosReq'
import {ElMessage} from "element-plus";

const message = ref([])

onMounted(() => {
  getinfo()
})

const getinfo = async () => {
  request({
    url: '/index',
    method: 'get',
  }).then(res => {
    if(res.code === 0) {
      message.value = res.data
    } else {
      ElMessage.error("获取数据失败")
    }
  })
}
</script>

<style lang="scss" scoped>
.pages_Home {
  padding: 20px;

  .tishi {
    line-height: 20px;
    margin-bottom: 15px;
    background-color: #fff;
    text-align: left;
    color: #6B6B6B;
    font-size: 14px;

    .ts_01 {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #F0F0F0;
      padding: 10px;

      .ts_01_l {
        font-weight: 600;
      }
    }

    .ts_02 {
      padding: 20px 15px;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      .ts_02_l {
        span {
          font-size: 28px;
        }
      }

      .ts_02_r {
        color: #0092E5;
        padding-top: 25px;
      }
    }
  }
}
</style>
