<template>
  <div v-if="user">
    <el-card class="card-wrapper">
      <div class="post-header">
        <!--          info create by-->
        <div class="info-post">
          <div @click="goToProfile(item.postedBy._id)" class="left-info">
            <img alt="#" :src="item.postedBy.avatar">
            <div class="left-info-text">
              <h6>{{ item.postedBy.name }}</h6>
              <p>{{ formatDate }}</p>
            </div>
          </div>
          <div class="right-info">
            <a  @click="onShowTool">
              <i class="el-icon-more-outline"></i>
            </a>
            <div v-show="showTool" >
              <el-popconfirm
                v-if="item.postedBy._id === user._id"
                confirm-button-text='OK'
                cancel-button-text='No, Thanks'
                icon="el-icon-info"
                icon-color="red"
                title="Are you sure to delete this?"
                @confirm="deletePost(item)"
                @cancel="showTool = false"
              >
                <el-button slot="reference">Xoá</el-button>
              </el-popconfirm>
              <el-popconfirm
                v-else
                confirm-button-text='OK'
                cancel-button-text='No, Thanks'
                icon="el-icon-info"
                icon-color="red"
                title="Are you sure to report this?"
                @confirm="reported"
                @cancel="showTool = false"
              >
                <el-button slot="reference">báo cáo</el-button>
              </el-popconfirm>
            </div>
          </div>
        </div>
        <p class="body-text">{{ item.body }}</p>
      </div>
      <div class="post-body">
        <div v-if="item.photo">
          <img v-lazy-load alt="#" :src="item.photo">
        </div>
        <div class="post-reaction">
          <div class="reaction">
            <font-awesome-icon color="#40C200" icon="thumbs-up" />
            <p class="ml-1">{{ item.likes.length }}</p>
          </div>

          <a @click="onShowCmt" class="length-cmt">
            <p class="mr-1">{{ item.comments.length }}</p>
            <p>bình luận</p>
          </a>
        </div>
        <div class="post-footer">
          <div>
            <div @click="unLikePost(item)" class="like-action" v-if="item.likes.includes(user._id)">
              <font-awesome-icon color="#40C200" icon="thumbs-down" />
              <p>bỏ thích</p>
            </div>
            <div @click="likePost(item)" class="like-action" v-else>
              <font-awesome-icon color="#40C200" icon="thumbs-up" />
              <p>thích</p>
            </div>
          </div>
          <div @click="onShowCmt" class="cmt-action">
            <font-awesome-icon color="#40C200" icon="comment-alt" />
            <p>bình luận</p>
          </div>
        </div>
      </div>
      <div class="context-cmt" v-show="showComment">
        <div v-for="(cmt, index ) in getListComment" :key="index">
          <div class="cmt-wrapper mt-3">
            <div class="left-cmt">
              <img @click="goToProfile(cmt.postedBy._id)"  alt="#" :src="cmt.postedBy.avatar">
              <div class="main-cmt">
                <div class="m-2">
                  <h6 @click="goToProfile(cmt.postedBy._id)">{{ cmt.postedBy.name }}</h6>
                  <p>{{ cmt.text }}</p>
                </div>
              </div>
            </div>
            <div v-if="cmt.postedBy._id === user._id || item.postedBy._id === user._id" class="right-cmt">
              <el-popconfirm
                confirm-button-text='OK'
                cancel-button-text='No, Thanks'
                icon="el-icon-info"
                icon-color="red"
                title="Are you sure to delete this?"
                @confirm="deleteComment(cmt._id)"
              >
                <el-button slot="reference">Xoá</el-button>
              </el-popconfirm>
            </div>
          </div>
        </div>
        <div>
          <el-form class="cmt-form" ref="formCmt" :model="formCmt">
            <img alt="#" :src="user.avatar">
            <b-form-textarea
              v-model="formCmt.text"
              rows="1"
              class="mx-3 form-area"
              no-resize
            ></b-form-textarea>
            <el-button :disabled="!formCmt.text.length" @click="pushComment" type="success" icon="el-icon-s-promotion"
                       circle></el-button>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState ,mapActions} from 'vuex'

export default {
  name: 'CardPost',
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      showComment: false,
      showTool:false,
      formCmt: {
        text: ''
      },
      listComment: []
    }
  },
  computed: {
    formatDate() {
      return moment(this.item.createdAt.toString()).fromNow()
    },
    ...mapState({
      user: state => state.profile.user
    }),
    getListComment() {
      return this.listComment = this.item.comments
    }
  },
  methods: {
    ...mapActions(['deletePost','likePost','unLikePost']),
    goToProfile(routeId) {
      if (routeId !== this.user._id) {
        this.$router.push({ path: `/${routeId}` })
      } else {
        this.$router.push({ name: 'profile' })
      }
    },
    onShowCmt() {
      this.showComment = !this.showComment
    },
    onShowTool() {
      this.showTool = !this.showTool
    },
    async pushComment() {
      await this.$axios.$put('/comment',
        { text: this.formCmt.text, postId: this.item._id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.$store.state.auth.token
          }
        })
        .then(data => {
          console.log(data)
          this.item.comments = data.comments
          this.formCmt.text = ''
        })
        .catch(e => this.$message.error(`${e}`))
    },
    async deleteComment(commentid) {
      await this.$axios.$delete(`/deletecomment/${this.item._id}/${commentid}`,
        {headers: {
            Authorization: 'Bearer ' + this.$store.state.auth.token
          }})
      .then(data => {
        this.item.comments = data.comments
      })
    },

    reported() {
      this.$message('Đã báo cáo!');
    },
  }
}
</script>

<style lang="scss">
@use "assets/css/base";

.card-wrapper {
  margin: 1rem 0;
}

.post-header {
  margin: 0.5rem 0;
}

.info-post {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.left-info {
  display: flex;
  text-align: left;
  align-items: flex-start;
  text-decoration-line: none;
  cursor: pointer;

  .left-info-text {
    margin-left: 0.5rem;

    h6 {
      font-weight: 600;
    }

    p {
      font-size: 12px;
      color: darkgray;
      line-height: 10px;
    }
  }

  img {
    @include base.avatar;
  }
}

.body-text {
  text-align: left;
}

.post-body {
  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.post-reaction {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 1rem 0;
  border-bottom: base.$border
}

.reaction {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.length-cmt, .length-cmt:hover {
  display: flex;
  justify-content: center;
  color: #303133;
  cursor: pointer;
}

.post-footer {
  display: flex;
  justify-content: space-around;
}

.like-action, .cmt-action {
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: baseline;

  p {
    margin-left: 5px;
  }
}

.cmt-wrapper {
  display: flex;
justify-content: space-between;
 .left-cmt {
   display: flex;
   justify-content: flex-start;
   text-align: left;
   align-items: flex-start;
   .main-cmt {
     margin-left: 0.5rem;
     background-color: aliceblue;
     border-radius: 10%;

     h6 {
       cursor: pointer;
       font-weight: 600;
     }

     p {
       line-height: 10px;
     }
   }
 }

  img {
    cursor: pointer;
    @include base.avatar;
  }
}

.context-cmt {
  border-top: base.$border
}

.cmt-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  img {
    @include base.avatar
  }
}

.right-info {
cursor: pointer;
}
.form-area {
  max-height: 2.5rem;
  border-radius: 15px;
}
</style>
