<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand variant="faded" href="#" to="/">
        <img class="img-brand" alt="brand" :src="img.brand">
      </b-navbar-brand>

      <b-nav-form>
        <b-form-input  v-model.trim="searchValue" style="border-radius: 15px" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <el-button @click="onSearch" size="small" type="primary" icon="el-icon-search" circle></el-button>
      </b-nav-form>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

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
    <div class="content-sr">
      <ul class="list-search" v-for="(item, index) in searchResult" :key="index">
        <li @click="goToProfile(item._id)"><img alt="#" :src="item.avatar"> {{item.name}}</li>
      </ul>
    </div>

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
      },
      searchValue:'',
      searchResult:[]
    }
  },
  watch:{
    searchValue(newValue) {
      this.onSearch(newValue)
    },
    searchResult() {
      if(!this.searchValue) {
        this.searchResult = null
      }
    }
  },
  computed: {
    ...mapState({
      user:state => state.profile.user
    })
  },

  created() {
    this.$store.dispatch('getUser')
  },
  methods:{
    onLogout() {
      this.$store.dispatch('logout');
      window.location.reload();
    },
    onSearch() {
      if(this.searchValue) {
        this.$axios.$post('/search-users',{query:this.searchValue},
          {headers: {
              "Content-Type": "application/json",
            }}).then(data => {
          this.searchResult = data.user
        })
      }
    },
    goToProfile(routeId) {
      if (routeId !== this.user._id) {
        this.$router.push({params:{userId:routeId},path:`/${routeId}` })
      } else {
        this.$router.push({ name: 'profile' })
      }
      this.searchValue = '';
      this.searchResult = null;
    },
  }
}
</script>

<style lang="scss">
@use "assets/css/base";
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
   @include base.avatar;
    margin-right: 0.5rem;
  }
}
.content-sr {
  position: absolute;
  z-index: 99;
  padding-top: 1rem;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin: 0 2rem;
  .list-search {
    display: flex;

    li {
      list-style: none;
      cursor: pointer;
      img {
        @include base.avatar;
      }
    }
  }
}
.form-inline {
  flex-flow: unset;
}
</style>
