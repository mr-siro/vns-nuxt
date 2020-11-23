<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand variant="faded" href="#" to="/">
        <img class="img-brand" alt="brand" :src="img.brand">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <font-awesome-icon  icon="comment-alt" />
            </template>
            <b-dropdown-item  href="#">
              tin nhắn #1
            </b-dropdown-item>

          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <font-awesome-icon  icon="bell" />
            </template>
            <b-dropdown-item  href="#">
              thông báo #1
            </b-dropdown-item>

          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-if="user">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{user.name}}</em>
            </template>
            <b-dropdown-item to="/profile" href="#">
              <div class="user-bar">
                <img alt="#" :src="user.avatar">
                <h6>{{user.name}}</h6>
              </div>
            </b-dropdown-item>
            <b-dropdown-item   href="#">
              <el-popconfirm
                confirm-button-text='OK'
                cancel-button-text='Cancel'
                icon="el-icon-info"
                icon-color="red"
                title="Are you sure to logout?"
                @confirm="onLogout"
              >
                <el-button slot="reference">Logout</el-button>
              </el-popconfirm>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {Images} from 'assets/Images'
import {mapState} from 'vuex'

export default {
  name: 'DefaultHeader',
  data() {
    return {
      img:{
        brand:Images.logo
      }
    }
  },
  computed: {
    ...mapState({
      user:state => state.auth.user
    })
  },

  created() {
    this.$store.dispatch('getUser');
  },
  methods:{
    onLogout() {
      this.$store.dispatch('logout');
      window.location.reload();
    }
  }
}
</script>

<style lang="scss">
.img-brand {
  width: 35px;
  height: 35px;
  border-radius: 25%;
}

.user-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
}
</style>
