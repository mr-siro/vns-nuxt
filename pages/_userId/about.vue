<template>
  <main>
    <el-card v-if="guestProfile">
      <div class="top-left-profile">
        <h5>Giới thiệu</h5>
        <el-divider></el-divider>
        <b-row>
          <div class="col-md-6">
            <CardInfo
              icon-name="building"
              title-name="Sống tại"
              :value-name="guestProfile.address"
            />

            <CardInfo
              icon-name="rss"
              title-name="Người theo dõi"
              :value-name="guestProfile.followers.length"
            />

            <CardInfo
              icon-name="birthday-cake"
              title-name="Ngày sinh"
              :value-name="guestProfile.dateOfBirth"
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
              :value-name="guestProfile.company"
            />
            <CardInfo
              icon-name="graduation-cap"
              title-name="Trường học"
              :value-name="guestProfile.school"
            />
            <CardInfo
              icon-name="heart"
              title-name="Tình trạng quan hệ:"
              :value-name="getRelation"
            />
          </div>
        </b-row>
      </div>
    </el-card>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment-timezone'
import CardInfo from '@/components/card/CardInfo'
export default {
name: "about",
  components:{
  CardInfo
  },
  computed:{
    ...mapState({
      guestProfile: state => state.profile.guestProfile,
    }),
    formatDate() {
      return moment(this.guestProfile.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
    },
    getRelation() {
      switch (this.guestProfile.relation) {
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
  }
}
</script>

<style scoped>

</style>
