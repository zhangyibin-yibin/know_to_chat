<template>
  <div class="setting-page" :style="device === 'Mobile' ? {width: '95%'} : {}">
    <div class="back" @click='back()'>
      <svg t="1636510887671" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2416" width="35" height="35"><path d="M475.591 300.373V175.218c-11.378-52.338-54.613-20.48-54.613-20.48L120.604 411.876c-65.99 45.51-4.55 79.644-4.55 79.644l295.822 254.862c59.164 43.236 63.715-22.755 63.715-22.755V607.573c300.373-93.297 423.253 279.894 423.253 279.894 11.378 20.48 18.205 0 18.205 0C1033.102 327.68 475.59 300.373 475.59 300.373z" p-id="2417" fill="#555555"></path></svg>
    </div>
    <div class="header">
      <div class="avatar">
        <img :src="IMG_URL + userInfo.photo" alt="" srcset="">
      </div>
      <div class="info-list">
        <div class="info-item"> 
          <span class="info-item-title"> MessagerId</span>
          <span class="info-item-text">{{userInfo.code}}</span>
        </div>
        <div class="info-item"> 
          <span class="info-item-title"> 账号</span>
          <span class="info-item-text">{{userInfo.name}}</span>
        </div>
        <div class="info-item"> 
          <span class="info-item-title"> 昵称</span>
          <span class="info-item-text">{{userInfo.nickname}}</span>
        </div>
        <div class="info-item"> 
          <span class="info-item-title"> 注册时间</span>
          <span class="info-item-text">{{userInfo.signUpTime | formatDate}}</span>
        </div>
        <div class="info-item"> 
          <span class="info-item-title"> 登录时间</span>
          <span class="info-item-text">{{userInfo.lastLoginTime | formatDate}}</span>
        </div>
        <div class="info-item"> 
          <span class="info-item-title"> 用户等级</span>
          <span class="info-item-text">{{getLevel()}}</span>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="nav-list">
        <span
          :class="currentTab === 'setting' ? 'operation-text isactive' : 'operation-text'"
          @click="setCurrentTab('setting')">个人资料</span>
        <span
          :class="currentTab === 'password' ? 'operation-text isactive' : 'operation-text'"
          @click="setCurrentTab('password')"
        >
          密码设置
        </span>
      </div>
      <div class="content" v-loading="fetching">
        <ul v-show="currentTab === 'setting'" class="user-setting-list">
          <li
            class="setting-item"
            v-for="item in settingList"
            :key="item"
          >
            <span class="title">{{listZHMap[item]}}</span>
            <div class="inp-box">
              <template v-if="item === 'sex'">
                <el-radio-group v-model="userSetting[item]" :disabled="!isModifying[item]" size="mini">
                  <el-radio-button label="0">男</el-radio-button>
                  <el-radio-button label="1">女</el-radio-button>
                  <el-radio-button label="3">保密</el-radio-button>
                </el-radio-group>
              </template>
              <template v-else>
                <input
                  type="text"
                  :ref="item"
                  :disabled="!isModifying[item]"
                  v-model="userSetting[item]"
                >
              </template>
            </div>
            <div class="action">
              <span
                v-show="!isModifying[item]"
                class="operation-text"
                @click="setModily(item, true)"
              >
                修改
              </span>
              <div class="oper" v-show="isModifying[item]">
                <span class="operation-text__danger" @click="saveModify(item)">保存</span>
                <span class="operation-text__danger" @click="setModily(item, false)">取消</span>
              </div>
            </div>
          </li>
        </ul>
        <ul v-show="currentTab === 'password'" class="user-password">
          <li
            class="pwd-item"
            v-for="(value, key) in pwdMap"
            :key="key"
          >
            <span class="title">{{value}}</span>
            <div class="inp-box">
              <input
                :placeholder="pwdPlaceholder[key]"
                type="text"
                autocomplete="new-password"
                onfocus="this.type = 'password'"
                v-model="pwdSetting[key]"
              />
            </div>
          </li>
          <div class="action">
            <el-button type="primary" @click="updateUserPwd">确认</el-button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate, computedLevel } from "@/utils";
const list = ["nickname", "age", "email", "sex", "signature"];
const listZHMap = {
  nickname: "昵称",
  age: "年龄",
  email: "Email",
  sex: "性别",
  signature: "个性签名"
};
const tabMap = {
  setting: "setting",
  password: "password"
};
const pwdMap = {
  oldPwd: "旧密码",
  newPwd: "新密码",
  reNewPwd: "确认新密码"
};
const pwdPlaceholder = {
  oldPwd: "请输入原始密码",
  newPwd: "请输入新密码",
  reNewPwd: "请确认新密码"
};
export default {
  name: "Setting",
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      currentTab: tabMap.setting,
      settingList: list,
      listZHMap: listZHMap,
      userSetting: {}, // 用户修改的信息
      isModifying: {}, // 标识哪一项正在修改
      pwdMap,
      pwdPlaceholder,
      pwdSetting: {
        oldPwd: "",
        newPwd: "",
        reNewPwd: ""
      },
      fetching: false // 正在网络请求中
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    device() {
      return this.$store.state.device.deviceType;
    },
    level() {
      return computedLevel(this.userInfo.onlineTime);
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getLevel() {
      return this.level;
    },
    setCurrentTab(tab) {
      this.currentTab = tab;
    },
    setUserSetting(userInfo) {
      for (const item of list) {
        this.$set(this.userSetting, item, userInfo[item]);
        this.$set(this.isModifying, item, false);
      }
    },
    setModily(key, flag) {
      for (const key in this.isModifying) {
        if (this.isModifying.hasOwnProperty(key)) {
          this.isModifying[key] = false;
        }
      }
      if (!key) return;
      this.isModifying[key] = flag;
      if (flag) {
        this.$nextTick(() => {
          this.$refs[key] && this.$refs[key][0].focus();
          this.$refs[key] && this.$refs[key][0].select();
        });
      } else {
        const userInfo = this.userInfo;
        this.setUserSetting(userInfo);
      }
    },
    /**更新用户信息 */
    async saveModify(key) {
      if (this.userSetting[key] === this.userInfo[key]) {
        this.setModily(undefined, false);
        return;
      }
      const params = {
        field: key,
        value: this.userSetting[key],
        userId: this.userInfo._id
      };
      this.fetching = true;
      const { data } = await this.$http.updateUserInfo(params);
      if (data.status === 2000) {
        const userInfo = await this.$http.getUserInfo(this.userInfo._id);
        this.$store.dispatch("user/LOGIN", userInfo.data.data);
        this.fetching = false;
        this.$message({ type: "success", message: "修改成功！" });
      } else {
        this.fetching = false;
        this.setUserSetting(this.userInfo);
        this.$message({ type: "error", message: "修改失败！" });
      }
      this.setModily(undefined, false);
    },
    async updateUserPwd() {
      const params = Object.assign({}, this.pwdSetting, {
        userId: this.userInfo._id
      });
      const { data } = await this.$http.updateUserPwd(params);
      if (data.status === 2000) {
        this.$message({ type: "success", message: data.msg });
      } else {
        this.$message({ type: "warning", message: data.msg });
      }
    }
  },
  filters: {
    formatDate(val) {
      return formatDate(new Date(val));
    }
  },
  created() {
    const userInfo = this.$store.state.user.userInfo;
    this.setUserSetting(userInfo);
  }
};
</script>

<style lang="scss">
@import "./../../static/css/var.scss";
.setting-page {
  position: relative;
  height: 98%;
  width: 70%;
  min-width: 1000px;
  padding: 20px;
  margin: 10px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  background-color: #f3f2ef;
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  padding-top: 100px;
  .back {
    position: absolute;
    top: 50px;
    left: 50px;
    cursor: pointer;
  }
  .header {
    // display: flex;
    width: 50%;
    // margin: 0 auto;
    text-align: center;

    .avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info-list {
      margin-top: 50px;
      color: #555;
      .info-item {
        margin: 0 auto;
        margin-top: 10px;
        width: 70%;
        height: 60px;
        background-color: #dad9d7;
        border-radius: 10px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        font-size: 16px;
        border: 2px solid transparent;
      }
      .info-item:hover {
        border: 2px solid #21aa93;
      }
    }
  }
  .header::after {
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
    content: "";
    width: 2px;
    height: 80vh;
    background-color: #ccc;
  }
  .body {
    width: 50%;
    // margin: 0 auto;
    .nav-list {
      margin: 10px 0;
      text-align: center;
      span {
        color: #21aa93;
        font-size: 20px;
        padding: 5px;
      }
      .isactive {
        background-color: #dad9d7;
      }
    }
    .content {
      .user-setting-list {
        color: #555;
        .setting-item {
          display: flex;
          align-items: center;
          padding: 1.5rem 0;
          border-top: 1px solid #cccccc;
          &:last-child {
            border-bottom: 1px solid #cccccc;
          }
          .title {
            width: 80px;
          }
          .inp-box {
            // width: 60%;
            flex: 1;
            input {
              width: 100%;
              border: none;
              outline: none;
              background-color: transparent;
              color: $secondaryfont;
            }
          }
          .action {
            width: auto;
            margin-left: 5px;
            text-align: right;
            .operation-text {
              color: #21aa93;
            }
          }
        }
      }
      .user-password {
        .pwd-item {
          display: flex;
          align-items: center;
          padding: 1.5rem 0;
          border-bottom: 1px solid #cccccc;
          &:first-child {
            border-top: 1px solid #cccccc;
          }
          .title {
            width: 100px;
          }
          .inp-box {
            // width: 60%;
            flex: 1;
            input {
              width: 100%;
              border: none;
              outline: none;
              background-color: transparent;
              color: $secondaryfont;
            }
          }
        }
        .action {
          margin-top: 20px;
          text-align: right;
          .el-button--primary {
            background-color: #21aa93;
            outline: none;
            border: none;
          }
        }
      }
    }
  }
}
</style>
