<template>
  <div class="wrapper-login">
    <b-container>
      <b-row>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <h1 class="banner-title">VNS</h1>
        </div>
        <div class="col-md-6">
          <div class="login-form">
            <b-tabs content-class="mt-3">
              <b-tab title="Đăng nhập" active>
                <b-form @submit="onLogin">
                  <b-form-group
                    label="Email:"
                    label-for="email"
                    style="color: aqua"
                  >
                    <b-form-input
                      id="email"
                      v-model="loginForm.email"
                      type="email"
                      required
                      placeholder="email"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Password:"
                    label-for="password"
                    style="color: aqua"
                  >
                    <b-form-input
                      id="password"
                      v-model="loginForm.password"
                      type="password"
                      required
                      placeholder="password"
                    ></b-form-input>
                  </b-form-group>
                  <el-button @click="onLogin" :loading="loading" class="btn-main" type="success">Đăng nhập</el-button>
                </b-form>
              </b-tab>
              <b-tab title="Đăng ký">
                <b-form @submit="onSignup">
                  <b-form-group
                    label="Name:"
                    label-for="name"
                    style="color: aqua"
                  >
                    <b-form-input
                      id="name"
                      v-model="signUpForm.name"
                      type="text"
                      required
                      placeholder="name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Email:"
                    label-for="email"
                    style="color: aqua"
                  >
                    <b-form-input
                      id="email"
                      v-model="signUpForm.email"
                      type="email"
                      required
                      placeholder="email"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Password:"
                    label-for="password"
                    style="color: aqua"
                  >
                    <b-form-input
                      id="password"
                      v-model="signUpForm.password"
                      type="password"
                      required
                      placeholder="password"
                    ></b-form-input>
                  </b-form-group>
                  <el-button @click="onSignup" :loading="loading" class="btn-main" type="success">Đăng ký</el-button>
                </b-form>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </b-row>

    </b-container>
  </div>
</template>

<script>

export default {
  layout: 'public',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signUpForm: {
        name: '',
        email: '',
        password: ''
      },
      loading:false
    }
  },
  methods: {
    onLogin(event) {
      event.preventDefault()
      this.loading = true
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
        .then(() => {
          this.$router.push({ name: 'index' })
          this.loading = false
        })
        .catch(err => {
          {
            this.$message.error(`${err}`)
            this.loading = false
          }
        })
    },

    onSignup(event) {
      event.preventDefault()
      this.loading = true
      this.$store.dispatch('signUp', {
        name: this.signUpForm.name,
        email: this.signUpForm.email,
        password: this.signUpForm.password
      })
        .then(() => {
          this.$message({
            message: 'Đăng ký thành công!',
            type: 'success'
          })
          this.loading = false
        })
        .catch(err => {
          this.$message.error(`${err}`)
          this.loading = false
        })
    }
  },
}

</script>

<style lang="scss">
@use "assets/css/base";

.wrapper-login {
  background-image: url("~assets/images/3842147.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: initial;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.btn-main {
  @include base.btnMain;
  margin-top: 1.5rem;
}

.banner-title {
  font-family: 'Goldman', cursive;
  color: base.$primary-color;
  font-size: 8rem;
}

.login-form {
  border-radius: 15px;
  padding: 3rem;
  box-shadow: -1px 2px 14px 6px rgba(255, 255, 255, 0.78);
  border: 5px solid base.$white-color;
}
</style>
