<template>
  <div v-if="user" class="profile-wrapper">
    <b-container class="py-3">
      <div :style="{ backgroundImage: `url(${user.coverPhoto})` }" class="top-profile">
        <div class="up-cover">
          <el-button @click="onPickBackground" size="mini" type="primary" icon="el-icon-upload" circle></el-button>
          <input
            type="file"
            style="display: none"
            ref="coverinput"
            accept="image/*"
            @change="onBackgroundPicked"/>
        </div>
        <div class="avt-user">
          <img alt="#" :src="user.avatar">

          <el-button @click="onPickFile" id="btn-avt" size="mini" type="danger" icon="el-icon-camera-solid" circle></el-button>
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"/>
        </div>

      </div>
      <div class="view-name-profile my-4">
        <h3>{{user.name}}</h3>
          <p style="word-break: break-all; white-space: normal" v-show="!aboutVisible">{{user.aboutMe}}</p>
        <b-link @click="aboutVisible = true">Chỉnh sửa</b-link>
        <div class="wrap-about" v-show="aboutVisible">
          <b-form-textarea
            id="textarea-no-resize"
            v-model="getAbout"
            rows="3"
            no-resize
            maxlength="80"
          ></b-form-textarea>
          <div class="mt-2">
            <b-button @click.prevent="aboutVisible = false" variant="secondary">Huỷ</b-button>
            <b-button @click.prevent="editAboutMe" variant="info">Lưu</b-button>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="profile-nav">
        <el-menu :default-active="'1'"  mode="horizontal">
          <el-menu-item @click="$router.push('/profile')" index="1">Bài viết</el-menu-item>
          <el-menu-item @click="$router.push('/profile/about')"  index="2" >Giới thiệu</el-menu-item>
          <el-menu-item @click="$router.push('/profile/friends')"   index="3" >Bạn bè</el-menu-item>
          <el-menu-item @click="$router.push('/profile/photos')"  index="4">Ảnh</el-menu-item>
        </el-menu>
      </div>
      <div class="content-profile">
        <nuxt-child/>
      </div>
    </b-container>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  created() {
    this.$store.dispatch('getUser').then(() => {
      this.getAbout = this.user.aboutMe
    })

  },
  data() {
    return {
      uploadfile: {
        avtPicked: null,
        avtUrl:''
      },
      uploadBackground:{
        imgPicked:null,
        backgroundUrl:''
      },
      aboutVisible:false,
      getAbout:''
    }
  },
  computed: {
    ...mapState({
      user: state => state.profile.user
    })
  },

  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.uploadfile.avtPicked = files[0]
      const data = new FormData()
      data.append('file', this.uploadfile.avtPicked)
      data.append('upload_preset', 'vnsocial')
      data.append('cloud_name', 'dwkgx7fik')
      this.$axios.$post('https://api.cloudinary.com/v1_1/dwkgx7fik/image/upload', data)
        .then(data => {
          console.log(data.url)
          this.uploadfile.avtUrl = data.url
          this.$store.dispatch('upDateAvt', {
            avatar: this.uploadfile.avtUrl
          })

        })
        .catch(e => console.log(e))
    },
    editAboutMe() {
      this.$store.dispatch('editAboutMe', {aboutMe:this.getAbout})
        .then(() => {
          this.aboutVisible = false
        })
    },

    onPickBackground () {
      this.$refs.coverinput.click()
    },
    onBackgroundPicked (event) {
      const files = event.target.files
      let filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.uploadBackground.imgPicked = files[0]
      const data = new FormData()
      data.append('file', this.uploadBackground.imgPicked)
      data.append('upload_preset', 'vnsocial')
      data.append('cloud_name', 'dwkgx7fik')
      this.$axios.$post('https://api.cloudinary.com/v1_1/dwkgx7fik/image/upload', data)
        .then(data => {
          console.log(data.url)
          this.uploadBackground.backgroundUrl = data.url
          this.$store.dispatch('upDateBackground', {
            coverPhoto: this.uploadBackground.backgroundUrl
          })

        })
        .catch(e => console.log(e))
    },
  },

}
</script>

<style lang="scss">
.profile-wrapper {
  background: linear-gradient(0deg, rgba(183, 223, 163, 1) 35%, rgba(255, 255, 255, 1) 100%);
  padding-bottom: 1rem;
}

.top-profile {
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 25rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

@media only screen and (max-width: 767px) {
  .top-profile {
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    max-height: 10rem;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .avt-user {
    img {
      max-width: 5rem;
      max-height: 5rem;

    }
  }
}

.avt-user {
  button#btn-avt {
    position: relative;
    right: 12%;
  }

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    border: 5px solid;
    position: relative;
    top: 0.5rem;
  }
}
.view-name-profile {
  line-height: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-weight: 600;
  }
}
.wrap-about {
  margin-top: 1rem;
}
.content-profile{
  margin-top: 1rem;
}
.up-cover {
  position: relative;
  top: 1rem;
}
</style>
