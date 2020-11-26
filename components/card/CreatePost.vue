<template>
  <div>
    <el-card>
      <div v-if="user" class="view-create">
        <img alt="#" :src="user.avatar">
        <div @click="toggleModal" class="think-post">
          <h6 class="m-2">
            Hôm nay bạn thế nào, {{ user.name }} ?
          </h6>
          <i class="el-icon-camera-solid"></i>
        </div>
      </div>
      <div v-else class="view-create">
        <img alt="#" :src="defaultAvatar">
        <div class="think-post">
          <h6 class="m-2">
            Hôm nay bạn thế nào ?
          </h6>
          <i class="el-icon-camera-solid"></i>
        </div>
      </div>
    </el-card>
    <b-modal :ok-disabled="!formUpload.body" v-if="user" @cancel="onCancel" @ok="onOk" title="Tạo bài viết" v-model="modalShow">
      <div class="in-modal">
        <img alt="#" :src="user.avatar">
        <h6>{{ user.name }}</h6>
      </div>
      <div class="form-post mt-3">
        <b-form>
          <b-form-textarea
            v-model="formUpload.body"
            id="textarea-no-resize"
            placeholder="Hôm nay bạn thế nào ?"
            rows="3"
            no-resize
          ></b-form-textarea>
          <b-form-file v-model="formUpload.selectedImg" class="mt-3" plain></b-form-file>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Images } from 'assets/Images'

export default {
  name: 'CreatePost',
  data() {
    return {
      defaultAvatar: Images.defaultAvatar,
      modalShow: false,
      formUpload: {
        body: '',
        pic: '',
        selectedImg: null
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.profile.user
    })
  },
  methods: {
    toggleModal() {
      this.modalShow = !this.modalShow
      console.log(this.modalShow)
    },
    onOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      try {
        if (this.formUpload.selectedImg) {

          const data = new FormData()
          data.append('file', this.formUpload.selectedImg)
          data.append('upload_preset', 'vnsocial')
          data.append('cloud_name', 'dwkgx7fik')
          this.$axios.$post('https://api.cloudinary.com/v1_1/dwkgx7fik/image/upload', data)
            .then(data => {
              console.log(data.url)
              this.formUpload.pic = data.url
              this.$store.dispatch('createPost', {
                body: this.formUpload.body,
                pic: this.formUpload.pic
              })
              this.toggleModal()
              this.formUpload.body = ''
              this.formUpload.selectedImg = null
              this.formUpload.pic = ''
            })
            .catch(e => console.log(e))

        } else {
          this.$store.dispatch('createPost', {
            body: this.formUpload.body,
            pic: this.formUpload.pic
          })
            .then(() => {
              this.toggleModal()
              this.formUpload.body = ''
              this.formUpload.selectedImg = null
              this.formUpload.pic = ''
            })
        }
      } catch (error) {
        this.$message.error(`${error}`)
      }
    },

    onCancel() {
      this.formUpload.body = ''
      this.formUpload.selectedImg = null
      this.formUpload.pic = ''
    }
  }
}
</script>

<style lang="scss">
@use "assets/css/base";

.view-create {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: base.$border;
  padding-bottom: 1rem;

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid base.$primary-color-press;
  }
}

.think-post {
  background-color: base.$gray-c180;
  border-radius: 15px;
  margin-left: 0.5rem;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  i {
    color: base.$primary-color;
    margin-right: 0.5rem;
  }
}

.in-modal {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid base.$primary-color-press;
    margin-right: 0.5rem;
  }
}
</style>
