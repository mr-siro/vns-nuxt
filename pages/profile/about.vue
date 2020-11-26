<template>
<main>
  <el-card v-if="user">
    <div class="top-left-profile">
      <h5>Giới thiệu</h5>
      <el-divider></el-divider>
      <b-row>
        <div class="col-md-6">
          <CardInfo
            icon-name="building"
            title-name="Sống tại"
            :value-name="user.address"
          />

          <CardInfo
            icon-name="rss"
            title-name="Người theo dõi"
            :value-name="user.followers.length"
          />

          <CardInfo
            icon-name="birthday-cake"
            title-name="Ngày sinh"
            :value-name="user.dateOfBirth"
          />

          <div class="d-flex flex-row align-items-baseline flex-wrap">
            <p>Tham gia vào</p>
            <h6 class="ml-2">{{ formatDate }}</h6>
          </div>
        </div>
        <div class="col-md-6">
          <CardInfo
          icon-name="briefcase"
          title-name="Làm việc tại"
          :value-name="user.company"
          />
          <CardInfo
          icon-name="graduation-cap"
          title-name="Trường học"
          :value-name="user.school"
          />
          <CardInfo
          icon-name="heart"
          title-name="Tình trạng quan hệ:"
          :value-name="getRelation"
          />
        </div>
      </b-row>


      <b-button @click="toggleModal"  variant="outline-primary">Chỉnh sửa thông tin</b-button>
      <b-modal @ok="onSubmit" title="Sửa thông tin" v-model="modalShow">
        <em id="text-em">Cập nhật lần cuối: {{ lastUpDate }}</em>
        <b-form>
          <b-row>
            <div class="col-md-6">
              <b-form-group label="Tên:" label-for="input-name">
                <b-form-input id="input-name" v-model="formEditInfo.name"></b-form-input>
              </b-form-group>

              <b-form-group label="Ngày sinh:" label-for="input-dob">
                <b-form-input id="input-dob" v-model="formEditInfo.dateOfBirth"></b-form-input>
              </b-form-group>

              <b-form-group label="Địa chỉ:" label-for="input-adr">
                <b-form-input id="input-adr" v-model="formEditInfo.address"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group label="Làm việc tại:" label-for="input-company">
                <b-form-input id="input-company" v-model="formEditInfo.company"></b-form-input>
              </b-form-group>

              <b-form-group label="Trường học:" label-for="input-school">
                <b-form-input id="input-school" v-model="formEditInfo.school"></b-form-input>
              </b-form-group>
              <b-form-group label="Tình trạng quan hệ:" label-for="input-rela">
                <b-form-select id="input-rela" v-model="formEditInfo.relation" :options="options"></b-form-select>
              </b-form-group>

            </div>
          </b-row>
        </b-form>
      </b-modal>
    </div>
  </el-card>
</main>
</template>

<script>
import { mapState } from 'vuex'
import CardInfo from '@/components/card/CardInfo'
import moment from 'moment-timezone'
export default {
  name: 'about',
  created() {
    if(this.user) {
      this.formEditInfo.name = this.user.name
      this.formEditInfo.dateOfBirth = this.user.dateOfBirth
      this.formEditInfo.address = this.user.address
      this.formEditInfo.company = this.user.company
      this.formEditInfo.school = this.user.school
      this.formEditInfo.relation = this.user.relation
    }
  },

  data() {
    return {
      modalShow: false,
      formEditInfo: {
        name: '',
        dateOfBirth: '',
        address: '',
        company:'',
        school:'',
        relation:'0'
      },
      options:[
        {value:'0', text:'Độc thân'},
        {value:'1', text:'Hẹn hò'},
        {value:'2', text:'Đã kết hôn'},
        {value:'3', text:'Ế'},
      ]
    }
  },
  components: {
    CardInfo
  },
  computed: {
    ...mapState({
      user: state => state.profile.user
    }),
    formatDate() {
      return moment(this.user.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
    },
    lastUpDate() {
      return moment(this.user.updatedAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY, h:mm A')
    },
    getRelation() {
      switch (this.user.relation) {
        case '0':
          return "Độc thân"
        case '1':
          return "Hẹn hò"
        case '2':
          return "Đã kết hôn"
        case '3':
          return "Ế"
      }
    }
  },
  methods: {
    toggleModal() {
      this.modalShow = !this.modalShow
    },

    onSubmit(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.$store.dispatch('editProfile',
        {
          name: this.formEditInfo.name,
          dateOfBirth: this.formEditInfo.dateOfBirth,
          address: this.formEditInfo.address,
          company:this.formEditInfo.company,
          school:this.formEditInfo.school,
          relation:this.formEditInfo.relation
        })
        .then(() => this.toggleModal())
        .catch(err => this.$message.error(`${err}`))
    }
  }
}
</script>

<style lang="scss">
@use "assets/css/base";
.top-left-profile {

}

#text-em {
  color: base.$gray-c180;
  font-size: 14px;
}
</style>
