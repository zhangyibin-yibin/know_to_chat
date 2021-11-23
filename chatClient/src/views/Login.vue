<template>
  <div class="login-page" :style="{'backgroundColor':color}">
    <transition name="fade">
      <avatar-choose
        v-if="showChooseAvatar"
        @close="setShowChooseAvatar(false)"
        @choose="chooseAvatar"
      />
    </transition>
    <div class="wrapper hor-ver-center" :style="device === 'Mobile' ? {width: '90%'}:{}">
      <div class="com-top">
      <div class="logo">
        <svg t="1636427501205" class="icon" viewBox="0 0 1505 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19896" data-spm-anchor-id="a313x.7781069.0.i45" width="100" height="100"><path d="M256.104629 876.286334c-10.828633 0-21.518438-4.997831-28.321042-14.577006-33.874187-47.340564-35.401302-78.021692-35.401301-132.581345 0-49.145336 13.744035-97.735358 39.704989-140.21692 24.989154-40.815618 60.806941-75.661605 103.704989-100.650759 16.520607-9.718004 37.761388-4.02603 47.479393 12.494577 9.718004 16.520607 4.02603 37.761388-12.494577 47.479392-68.303688 39.843818-108.980477 107.453362-108.980478 181.032538 0 49.145336 0.832972 61.778742 22.490239 92.182213 11.106291 15.548807 7.496746 37.206074-8.052061 48.451193-5.969631 4.303688-13.049892 6.386117-20.130151 6.386117z" fill="#21aa93" p-id="19897" data-spm-anchor-id="a313x.7781069.0.i41" class="selected"></path><path d="M218.482069 1024c-9.579176 0-18.880694-4.02603-25.544469-11.106291-7.913232-8.607375-10.967462-20.685466-8.190889-32.069414l37.62256-147.574837c4.720174-18.603037 23.600868-29.848156 42.203904-25.127983 18.603037 4.720174 29.848156 23.600868 25.127983 42.203905l-24.43384 95.791757 122.030369-20.824295c6.247289-1.110629 12.494577-0.416486 18.32538 1.804772 29.292842 11.383948 60.529284 17.075922 92.737527 17.075922 69.691974 0 135.496746-27.765727 180.616052-76.078091 13.049892-14.021692 34.984816-14.715835 49.006507-1.665944 14.021692 13.049892 14.715835 34.984816 1.665944 49.006508-58.169197 62.334056-142.438178 98.151844-231.288503 98.151843-37.483731 0-73.856833-6.247289-108.563992-18.464208L224.4517 1023.444685c-1.943601 0.277657-4.02603 0.555315-5.969631 0.555315z" fill="#21aa93" p-id="19898" data-spm-anchor-id="a313x.7781069.0.i39" class="selected"></path><path d="M1233.041722 601.266811l58.86334 231.010846L1018.551483 785.631236c-50.672451 19.574837-106.342733 30.542299-164.650759 30.5423-234.481562 0-424.537961-174.924078-424.537961-390.663775S619.280334 34.707158 853.900724 34.707158s424.537961 174.924078 424.537961 390.663775c0 79.27115-1.388286 114.255965-45.396963 175.895878" fill="#CCE187" p-id="19899" data-spm-anchor-id="a313x.7781069.0.i44" class="selected"></path><path d="M1291.905062 866.984816c-1.943601 0-3.887202-0.138829-5.830802-0.555315l-264.052061-45.119306C968.573175 840.885033 911.931093 850.741866 853.900724 850.741866c-122.169197 0-237.119306-43.869848-323.748373-123.557484-42.342733-39.010846-75.661605-84.546638-98.984816-135.219089-24.295011-52.754881-36.511931-108.841649-36.51193-166.59436s12.355748-113.839479 36.51193-166.59436c23.32321-50.672451 56.642082-96.208243 98.984816-135.219089 86.629067-79.687636 201.579176-123.557484 323.748373-123.557484s237.119306 43.869848 323.748373 123.557484c42.342733 39.010846 75.661605 84.546638 98.984816 135.219089 24.295011 52.754881 36.511931 108.841649 36.51193 166.59436 0 77.882863-1.943601 120.780911-42.62039 182.559653l54.976139 215.739696c2.915401 11.383948-0.138829 23.462039-8.19089 32.069414-6.524946 7.219089-15.826464 11.245119-25.40564 11.24512zM1018.551483 750.924078c1.943601 0 3.887202 0.138829 5.830803 0.555315l220.737527 37.761388-45.67462-179.227766c-2.498915-9.856833-0.555315-20.407809 5.414316-28.737527 37.206074-52.060738 38.872017-77.049892 38.872018-155.626898 0-196.303688-174.924078-355.956616-389.830803-355.956616s-389.830803 159.652928-389.830803 355.956616c0 196.303688 174.924078 355.956616 389.830803 355.956616 52.754881 0 103.982646-9.440347 152.156182-28.182213 4.02603-1.804772 8.190889-2.498915 12.494577-2.498915z" fill="#21aa93" p-id="19900" data-spm-anchor-id="a313x.7781069.0.i38" class="selected"></path><path d="M929.007015 470.490239c0 46.091106-37.483731 83.574837-83.574838 83.574837s-83.574837-37.483731-83.574837-83.574837h167.149675z" fill="#2A9B74" p-id="19901"></path><path d="M845.432177 574.889371c-57.613883 0-104.399132-46.785249-104.399132-104.399132 0-11.522777 9.301518-20.824295 20.824295-20.824295h167.149675c11.522777 0 20.824295 9.301518 20.824295 20.824295 0 57.475054-46.785249 104.399132-104.399133 104.399132z m-59.140998-83.574837c8.607375 24.433839 31.930586 41.926247 59.140998 41.926247s50.533623-17.492408 59.140998-41.926247H786.291179z" fill="#2A9B74" p-id="19902"></path><path d="M865.423501 543.930586H825.440854c-11.661605 0-21.37961-9.579176-21.379609-21.37961v-3.193058c0-11.661605 9.579176-21.37961 21.379609-21.37961h39.982647c11.661605 0 21.37961 9.579176 21.379609 21.37961v3.193058c0 11.800434-9.579176 21.37961-21.379609 21.37961z" fill="#FFFFFF" p-id="19903"></path><path d="M865.423501 544.624729H825.440854c-12.078091 0-22.073753-9.856833-22.073753-22.073753v-3.193058c0-12.078091 9.856833-22.073753 22.073753-22.073753h39.982647c12.078091 0 22.073753 9.856833 22.073752 22.073753v3.193058c0 12.21692-9.856833 22.073753-22.073752 22.073753z m-39.982647-45.813449c-11.383948 0-20.685466 9.301518-20.685466 20.685466v3.193059c0 11.383948 9.301518 20.685466 20.685466 20.685466h39.982647c11.383948 0 20.685466-9.301518 20.685466-20.685466v-3.193059c0-11.383948-9.301518-20.685466-20.685466-20.685466H825.440854z" fill="#2A9B74" p-id="19904"></path><path d="M682.308533 383.722343m-47.201735 0a47.201735 47.201735 0 1 0 94.40347 0 47.201735 47.201735 0 1 0-94.40347 0Z" fill="#2A9B74" p-id="19905"></path><path d="M1007.584021 383.722343m-47.201735 0a47.201735 47.201735 0 1 0 94.40347 0 47.201735 47.201735 0 1 0-94.40347 0Z" fill="#2A9B74" p-id="19906"></path></svg>
        <span class="logo-title">知聊</span>
      </div>
      <a target="_blank" class="admin_login" href="http://localhost:3000/">管理员登录接口</a>
      <!-- <div class="todo">
        <todo />
      </div> -->
    </div>
      <div class="login_bg">
        <img src="static/image/login_bg.png" alt="">
      </div>
      <div class="login_form">
        <el-form class="login-form" v-if="isLoginState">
          <div class="avatar">
            <el-avatar :size="100" :src="IMG_URL + loginInfo.avatar" @error="()=>true">
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </el-avatar>
          </div>
          <el-form-item>
            <el-input autocomplete="new-password" v-model="loginInfo.account" prefix-icon="el-icon-user" @keydown.enter="login" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input autocomplete="new-password" type="password" v-model="loginInfo.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="cv-code">
            <el-input autocomplete="on" class="cv-code-inp" v-model="loginInfo.cvCode" @keydown.enter.native="login" prefix-icon="el-icon-lock" placeholder="验证码(不区分大小写)"></el-input>
            <canvas v-show="!cvCodeing" width="120" height="40" ref="loginCanvas" @click="getCVCode"></canvas>
            <span style="width: 200px" v-show="cvCodeing">获取中...</span>
          </el-form-item>
          <el-form-item>
            <el-button  :style="{'backgroundColor':color}" class="login-btn" type="primary" @click="login">登录</el-button>
            <span>没有账号？<span class="operation-text" style="display: inline" @click="changeState(false)"  :style="{'color':color}">注册</span></span>
          </el-form-item>
        </el-form>
        <el-form class="register-form" v-if="!isLoginState">
          <div class="avatar" @click="setShowChooseAvatar(true)">
            <img :src="avatar" alt="" srcset="" width="100" height="100" style="border-radius: 50%">
            <!-- <el-avatar :size="100" :src="avatar">
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </el-avatar> -->
            <span class="secondary-font" style="display: block; margin: 10px 0" :style="{'color':color}" >
              点击头像切换头像
            </span>
          </div>
          <el-form-item>
            <el-input type="text" autocomplete="new-password" v-model="registerInfo.account" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
            <!-- <span class="account-errinfo">{{ registerErrInfo.account }}</span> -->
          </el-form-item>
          <el-form-item>
            <el-input type="text" autocomplete="new-password" onfocus="this.type = 'password'" v-model="registerInfo.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
            <!-- <span class="password-errinfo">{{ registerErrInfo.password }}</span> -->
          </el-form-item>
          <el-form-item>
            <el-input type="text" autocomplete="new-password" onfocus="this.type = 'password'" v-model="registerInfo.rePassword" prefix-icon="el-icon-lock" placeholder="请确认密码"></el-input>
            <!-- <span class="password-errinfo">{{ errInfo.password }}</span> -->
          </el-form-item>
          <el-form-item class="cv-code">
            <el-input class="cv-code-inp" v-model="registerInfo.cvCode" prefix-icon="el-icon-lock" placeholder="验证码(不区分大小写)"></el-input>
            <canvas width="120" height="40" ref="registerCanvas" @click="getCVCode"></canvas>
          </el-form-item>
          <el-form-item class="oper">
            <el-button class="login-btn" type="primary" @click="register" :style="{'backgroundColor':color}">注册</el-button>
            <span>已有账号？<span class="operation-text" style="display: inline" @click="changeState(true)" :style="{'color':color}">登录</span></span>
          </el-form-item>
        </el-form>
        <div class="revise_color" :style="{'color':color}">
          <el-color-picker
          class="revise_color-input"
            v-model="color"
            show-alpha
            :predefine="predefineColors">
          </el-color-picker>
          <div class="revise_color-text">修改背景颜色</div>
        </div>
      </div>
    </div>
    <copy-right />
  </div>
</template>


<script>
import ocean1 from "./../../static/image/ocean1.jpg";
import { createCanvas } from "@/utils/cvcode";
import canvasImg from "./../../static/image/canvas2.jpg";
import { accountReg, passwordReg } from "@/utils/index";
import avatarChoose from "@/components/avatarChoose";
import copyRight from "@/components/copyright";
import Todo from "@/components/todo";
// import { Swiper, SwiperSlide } from "swiper/vue";
const faceRandom = Math.ceil(Math.random() * 10);
export default {
  name: "Login",
  data() {
    return {
      loginInfo: {
        account: "",
        password: "",
        cvCode: "",
        cvCodeTimestamp: "",
        avatar:
          JSON.parse(window.localStorage.getItem("userInfo") || "{}").photo ||
          ""
      },
      registerInfo: {
        account: "",
        password: "",
        rePassword: "",
        cvCode: "",
        avatar: `face/face${faceRandom}.jpg`
      },
      cvCode: "", // 验证码
      cvCodeing: true, // 正在获取验证码？
      isLoginState: true,
      bgUrl: ocean1,
      showChooseAvatar: false,
      IMG_URL: process.env.IMG_URL,
      color: "#21a79e",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577"
      ]
    };
  },
  computed: {
    device() {
      return this.$store.state.device.deviceType;
    },
    avatar() {
      return this.IMG_URL + this.registerInfo.avatar;
    }
  },
  methods: {
    login() {
      if (!accountReg.test(this.loginInfo.account)) {
        return this.$message.error("请输入3-6位由数字字母下划线组成的账号");
      }
      if (!passwordReg.test(this.loginInfo.password)) {
        return this.$message.error("请输入6-64位由数字字母组成的密码");
      }
      const returnCitySN = window.returnCitySN ? window.returnCitySN : {};
      const params = {
        ...this.loginInfo,
        setting: {
          os: window.OSInfo,
          browser: window.Browser,
          ip: returnCitySN["cip"],
          country: returnCitySN["cname"]
        }
      };
      this.$http.login(params).then(res => {
        let { status, data, msg } = res.data;
        if (status === 1002) {
          // 验证码错误重新获取验证码
          this.loginInfo.cvCode = "";
          this.getCVCode();
        }
        if (status === 1007) {
          this.getCVCode();
          return;
        }
        if (res.status === 200 && status === 1000) {
          this.$message.success("登录成功！");
          this.$store.dispatch("user/LOGIN", data);
          const redirect = this.$router.currentRoute.query.redirect;
          const next = redirect ? redirect : "/chat/home";
          this.$router.replace(next);
        } else {
          this.$message.error(msg);
          if (status === 1006 || status === 1007) {
            this.$confirm(
              `你的${msg}，如需恢复请联系管理员：ccdebuging@gmail.com`,
              `通知：${msg}`,
              {
                // confirmButtonText: '确定',
                // cancelButtonText: '取消',
                type: "error"
              }
            );
          }
        }
      });
    },
    register() {
      if (!accountReg.test(this.registerInfo.account)) {
        return this.$message.error("请输入3-6位由数字字母下划线组成的账号");
      }
      if (!passwordReg.test(this.registerInfo.password)) {
        return this.$message.error("请输入6-64位由数字字母组成的密码");
      }
      if (this.registerInfo.password !== this.registerInfo.rePassword) {
        return this.$message.error("两次输入的密码不一致");
      }
      this.$http.register(this.registerInfo).then(res => {
        let { msg, status, data } = res.data;
        if (status !== 1005) {
          this.$message.error(msg);
          status === 1002 ? this.getCVCode() : "";
        } else if (status === 1005) {
          this.$alert(
            `这是你的chat账号:${data}，你可以以此账号登录系统`,
            "注册成功"
          );
          this.isLoginState = true;
        }
      });
    },
    getCVCode() {
      // 获取验证码
      this.cvCodeing = true;
      this.$http.getCVCode().then(res => {
        let { data, status, timestamp } = res.data;
        this.cvCode = data;
        this.loginInfo.cvCodeTimestamp = timestamp;
        this.$nextTick(() => {
          const currCanvas = this.isLoginState
            ? this.$refs.loginCanvas
            : this.$refs.registerCanvas;
          createCanvas(this.cvCode, currCanvas, canvasImg, () => {
            this.cvCodeing = false;
          });
        });
      });
    },
    changeState(flag) {
      this.isLoginState = flag;
      this.getCVCode();
    },
    setShowChooseAvatar(flag) {
      this.showChooseAvatar = flag;
    },
    chooseAvatar(item) {
      this.registerInfo.avatar = item;
    }
  },
  components: {
    avatarChoose,
    copyRight,
    Todo
  },
  async mounted() {
    this.getCVCode();
    this.$socket.emit("leave");
  }
};
</script>

<style lang="scss">
.login-page {
  @import "./../../static/css/animation.scss";
  @import "./../../static/css/var.scss";
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.8s ease;
  .wrapper {
    position: relative;
    background-color: #fff;
    width: 80vw;
    height: 75vh;
    min-width: 900px;
    opacity: 0.9;
    padding: 50px 20px;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    .com-top {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 50px;
      color: #21aa93;
      font-weight: 600;
    }
    .login_bg {
      width: 500px;
      height: 450px;
      margin-top: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .admin_login {
      font-size: 20px;
      color: #21aa93;
      &:hover {
        text-decoration: underline #21aa93;
      }
    }
    .login-form,
    .register-form {
      margin-top: 80px;
      padding: 30px;
      position: relative;
      .avatar {
        position: absolute;
        z-index: 1001;
        top: -110px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        margin-bottom: 10px;
        width: 110px;
        height: 100px;
        .secondary-font {
          color: #377aba;
        }
        .el-avatar {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
    }
    .revise_color {
      color: #409eff;
      position: absolute;
      bottom: -7px;
      right: 20%;
      // transform: translateX(-50%);
      line-height: 30px;
      vertical-align: top;
    }
    .cv-code {
      .el-form-item__content {
        display: flex;
        justify-content: space-between;
        .cv-code-inp {
          margin-right: 20px;
        }
      }
    }
    .login-btn {
      width: 100%;
      outline: none;
      border: none;
    }
  }
}
</style>
