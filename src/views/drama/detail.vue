<template>
  <div class="dramaAddTable">
    <el-form ref="form" :model="subform" label-width="80px">
      <el-form-item label="剧本名称">
        <el-input v-model="subform.title"></el-input>
      </el-form-item>
      <el-form-item label="封面">
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
      </el-form-item>
      <el-form-item label="剧本简介">
        <editor
          v-model="subform.describes"
          class="editer-container"
          api-key="xixm38g8cl1wza8wn8zzuna746liq1r3rkler1tcs2mabers"
          :init="editInit"></editor>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="剧本人数">
            <el-select v-model="subform.peoples" multiple placeholder="请选择">
              <el-option
                v-for="item in option.peopleoptions"
                :key="item.id"
                :label="item.number + '人'"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="男">
            <el-input-number v-model.number="subform.boys" :min="0"/>
            人
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="女">
            <el-input-number v-model.number="subform.girls" :min="0"/>
            人
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="剧本标签">
            <el-select v-model="subform.tags" multiple placeholder="请选择">
              <el-option
                v-for="item in option.tagsoption"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="门店">
            <el-select v-model="subform.shop_id" placeholder="请选择门店">
              <el-option v-for="item in option.store" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预计时长">
            <el-input v-model.number="subform.time" type="number" style="width: 200px;">
              <template #append>小时</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="基础费">
            <el-input-number v-model.number="subform.price1" :precision="2" :min="1">
            </el-input-number>
            元
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="附加费">
            <el-input-number v-model.number="subform.price2" :precision="2" :min="0"/>
            元
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-if="edit_id == null" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button v-if="edit_id != null" type="primary" @click="onEdit">修改</el-button>
        <el-button @click="jump_to_drama">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/axiosReq'
import {getToken} from "@/utils/auth";
import Editor from '@tinymce/tinymce-vue'


const edit_id = ref(null)

const subform = reactive({
  title: '',
  imgurl: '',
  describes: '',
  time: 0,
  boys: 0,
  girls: 0,
  peoples: 0,
  price1: 0,
  price2: 0,
  tags: [],
  shop_id: 0,
})
const editInit = {
  language_url: "/tinymce/zh_CN.js",
  language: "zh_CN",
  skin_url: "/tinymce/skins/ui/oxide", //编辑器需要一个skin才能正常工作，所以要设置一个skin_url指向之前复制出来的skin文件
  height: "350px",
  plugins: "image link code table lists wordcount", //引入插件
  toolbar:
    "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen", //工具栏
  browser_spellcheck: true, // 拼写检查
  branding: false, // 去水印
  elementpath: false, //禁用编辑器底部的状态栏
  statusbar: false, // 隐藏编辑器底部的状态栏
  paste_data_images: true, // 允许粘贴图像
  menubar: false, // 隐藏最上方menu
  fontsize_formats: "14px 16px 18px 20px 24px 26px 28px 30px 32px 36px", //字体大小
  font_formats: "微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times", //字体
  file_picker_types: 'image',
  images_upload_credentials: true,
  images_upload_handler: (blobInfo, success, failure) => {
    const formData = new FormData();
    formData.append('img', blobInfo.blob(), blobInfo.filename());
    request({
      url: 'upload',
      method: 'post',
      data: formData,
      isUploadFile: true,
    }).then(res => {
      success(res.data)
    }).catch(err => {
      failure(err)
    })
  }
}
const option = reactive({
  peopleoptions: [],
  tagsoption: [],
  store: []
})

const upLoadSetting = reactive({
  upfile_url: import.meta.env.VITE_APP_BASE_URL + '/upload',
  heads: {
    Authorization: getToken()
  },
  upimg_back_fun(res) {
    subform.imgurl = res.data;
  },
})
const router = useRouter()
const jump_to_drama = () => {
  router.push({name: 'drama'})
}

const getPeople = () => {
  request({
    url: 'people',
    method: 'get',
  }).then(res => {
    option.peopleoptions = res.data
  })
}

const getTag = () => {
  request({
    url: 'tag',
    method: 'get',
  }).then(res => {
    option.tagsoption = res.data
  })
}

const getShop = () => {
  request({
    url: 'shop',
    method: 'get',
  }).then(res => {
    option.store = res.data
  })
}

const onSubmit = () => {
  request(
    {
      url: 'script',
      method: 'post',
      data: subform,
    }
  ).then(res => {
    router.push({name: 'drama'})
  })
}


const onEdit = () => {
  subform.id = parseInt(edit_id.value)
  request(
    {
      url: 'script',
      method: 'put',
      data: subform,
    }
  ).then(res => {
    router.push({name: 'drama'})
  })
}
const getScript = () => {
  request({
    url: 'script/get',
    data: {
      id: edit_id.value
    },
    isParams: true,
    method: 'get',
  }).then(res => {
    subform.title = res.data.title
    subform.imgurl = res.data.imgurl
    subform.describes = res.data.describes
    subform.time = res.data.time
    subform.boys = res.data.boys
    subform.girls = res.data.girls
    subform.shop_id = res.data.shop_id
    subform.price1 = res.data.price1
    subform.price2 = res.data.price2
    subform.peoples = res.data.peoples
    subform.tags = res.data.tags
  })
}


const route = useRoute()
onMounted(() => {
  getShop()
  getPeople()
  getTag()
  route.query.id ? edit_id.value = route.query.id : null
  if (edit_id.value) {
    getScript()
  }
})

</script>

<style lang="scss" scoped>
.editer-container {
  height: 100%;
  width: 400px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.dramaAddTable {
  background-color: white;

  .item11 {
    float: left;
    margin-left: 10px;
  }

  .picA {
    width: 148px;
    height: 148px;
    position: relative;
    background-color: #FBFDFF;
    border: 1px dashed #C0CCDA;
    border-radius: 6px;
    box-sizing: border-box;
    vertical-align: top;
    text-align: center;
    margin: 6px 6px 6px 10px;

    img {
      width: 144px;
      height: 144px;
      border: 1px solid #BFBFBF;
      border-radius: 3px;
    }

    .el-icon-circle-close {
      position: absolute;
      top: -13px;
      right: -10px;
      color: #7C7C7C;
      font-size: 25px;
      cursor: pointer;
    }
  }

  .dramareturn {
    margin: 10px;
  }

  .dramaTextArea {
    width: 40vw;
  }

}
</style>
