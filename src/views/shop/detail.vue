<template>
  <div class="dramaAddTable">
    <el-form :model="subform" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="店铺名称">
            <el-input v-model="subform.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="电话">
            <el-input v-model="subform.mobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地图">
        <div id="container" style="width: 100%; height: 500px;"></div>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="店铺经度">
            <el-input v-model="subform.lat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="店铺纬度">
            <el-input v-model="subform.long"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="详细地址">
        <el-input v-model="subform.address" style="width: 400px;"></el-input>
      </el-form-item>
      <el-button v-if="edit_id == null" type="primary" @click="onSubmit">立即创建</el-button>
      <el-button v-if="edit_id != null" type="primary" @click="onEdit">修改</el-button>
      <el-button @click="shopreturn">取消</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/axiosReq'

const edit_id = ref(null)

const subform = reactive({
  name: "",
  mobile: "",
  lat: "",
  long: "",
  address: "",
});
let map = null;
const loadMap = () => {
  // eslint-disable-next-line no-undef
  map = new BMap.Map('container')
  // eslint-disable-next-line no-undef
  const point = new BMap.Point(117.124954, 40.148567)
  map.centerAndZoom(point, 20)
  map.enableScrollWheelZoom(true)
  // map.addOverlay(new BMap.Marker(point))
  // eslint-disable-next-line no-undef
  const geocoder = new BMap.Geocoder()// 用于逆解析
  map.addEventListener('click', function (e) {
    geocoder.getLocation(e.point, function (rs) {
      subform.address = rs.address
    })
    // 清除标记
    map.clearOverlays()
    const point2 = e.point
    subform.lat = point2.lat
    subform.long = point2.lng
    // eslint-disable-next-line no-undef
    const point = new BMap.Point(point2.lng, point2.lat)
    // eslint-disable-next-line no-undef
    const marker = new BMap.Marker(point)
    map.centerAndZoom(point, 20)
    map.addOverlay(marker)
  })
}

const router = useRouter()
const route = useRoute()
const shopreturn = () => {
  router.push({name: "shop"})
}
const onSubmit = () => {
  request({
    url: "/shop",
    method: "post",
    data: subform
  }).then(res => {
    router.push({name: "shop"})
  })
}
const onEdit = () => {
  subform.id = parseInt(edit_id.value)
  request({
    url: "/shop",
    method: "put",
    data: subform
  }).then(res => {
    router.push({name: "shop"})
  })
}

onMounted(() => {
  loadMap()
  if (route.query.id) {
    edit_id.value = route.query.id
    request({
      url: "/shop/get",
      method: "get",
      data: {
        id: route.query.id
      },
      isParams: true
    }).then(res => {
      subform.name = res.data.name
      subform.mobile = res.data.mobile
      subform.lat = res.data.lat
      subform.long = res.data.long
      subform.address = res.data.address
      // eslint-disable-next-line no-undef
      const point = new BMap.Point(res.data.long, res.data.lat)
      // eslint-disable-next-line no-undef
      const marker = new BMap.Marker(point)
      map.addOverlay(marker)

    })
  }

})
</script>

<style scoped>

</style>
