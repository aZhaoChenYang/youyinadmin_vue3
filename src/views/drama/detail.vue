<template>
  <div class="dramaAddTable">
    <el-form ref="form" :model="subform" label-width="80px">
      <el-form-item label="剧本名称">
        <el-input v-model="subform.title"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload :action="upLoadSetting.upfile_url" :on-success="upLoadSetting.upimg_back_fun"
                   :headers="upLoadSetting.heads"
                   class="avatar-uploader"
                   :show-file-list="false"
                   name="img">
          <img v-if="subform.imgurl" :src="subform.imgurl" class="avatar" alt="">

          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item id='quillEditorQiniu' label="剧本简介">
        <!--        <el-upload :action="upfile_url" :on-success="upimg_back_func"-->
        <!--                   :headers="heads"-->
        <!--                   :accept="'image/*'"-->
        <!--                   class="avatar-uploader"-->
        <!--                   :show-file-list="false"-->
        <!--                   name="img" style="display: none"/>-->
        <!--        <quill-editor></quill-editor>-->
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="剧本人数">
            <el-select v-model="item.peoples" multiple placeholder="请选择">
              <el-option
                v-for="item in peopleoptions"
                :key="item.ID"
                :label="item.number + '人'"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="男">
            <el-input-number v-model.number="form.boys" :min="0"/>
            人
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="女">
            <el-input-number v-model.number="form.girls" :min="0"/>
            人
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="剧本标签">
            <el-select v-model="form.tags" multiple placeholder="请选择">
              <el-option
                v-for="item in tagsoption"
                :key="item.ID"
                :label="item.name"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="门店">
            <el-select v-model="form.shop_id" placeholder="请选择门店">
              <el-option v-for="(item,index) in store" :key="index" :label="item.name" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预计时长">
            <el-input v-model.number="form.time" type="number" style="width: 200px;">
              <template #default="append">小时</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="基础费">
            <el-input-number v-model.number="form.price1" :precision="2" :min="1">
            </el-input-number>
            元
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="附加费">
            <el-input-number v-model.number="form.price2" :precision="2" :min="0"/>
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
import {getToken} from "@/utils/auth";
import {Plus} from '@element-plus/icons-vue'


const subform = reactive({
  title: '24小时剧本',
  imgurl: '',
  describe: '',
  time: 0,
  price1: 0,
  price2: 0,
  tags: [],
  shop_id: 0,
})

const toolbarOption = [
  ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
  [{'list': 'ordered'}, {'list': 'bullet'}, {'align': []}], //列表
  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  ['image']
]

const editorOption = {
  placeholder: '请输入剧本描述内容',
  modules: {
    toolbar: {
      container: toolbarOption,
    }
  }
}

const upLoadSetting = reactive({
  upfile_url: import.meta.env.VITE_APP_BASE_URL + '/upload',
  heads: {
    Authorization: getToken()
  },
  upimg_back_fun(res) {
    subform.imgurl = res.data;
  }
})


</script>

<style lang="scss" scoped>
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
