<template>
  <div class="user-details-page">
    <div class="back" @click='back()'>
      <svg t="1636510887671" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2416" width="35" height="35"><path d="M475.591 300.373V175.218c-11.378-52.338-54.613-20.48-54.613-20.48L120.604 411.876c-65.99 45.51-4.55 79.644-4.55 79.644l295.822 254.862c59.164 43.236 63.715-22.755 63.715-22.755V607.573c300.373-93.297 423.253 279.894 423.253 279.894 11.378 20.48 18.205 0 18.205 0C1033.102 327.68 475.59 300.373 475.59 300.373z" p-id="2417" fill="#555555"></path></svg>
    </div>
    <div class="wrapper">
      <div :class="device === 'Mobile' ? 'details-top mobile' : 'details-top'">
        <!-- <div class="carousel">
          <el-carousel indicator-position="none" height="315px">
            <el-carousel-item v-for="(item, index) in userDetails.cover" :key="index">
              <img :src="IMG_URL + item" alt="" class="carousel-img">
            </el-carousel-item>
          </el-carousel> 
        </div> -->
        <div class="carousel">
          <img src="static/image/theme/abstract.jpg" alt="">
        </div>
        <div class="info">
          <el-avatar
            class="avatar"
            size="large"
            :src="userDetails.avatar"
            @error="() => true"
          >
            <img
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            >
          </el-avatar>
          <span class="nickname">{{userDetails.nickname}}</span>
        </div>
      </div>
      <div class="details-body">
        <el-tabs type="border-card">
          <!-- <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> TA的动态</span>
            <pyq-list-cmp
              :pyq-list-data="pyqList"
              :has-more="hasMorePyq"
              @getPyq="getUserPyq"
            />
          </el-tab-pane> -->
          <el-tab-pane label="消息中心">
            <span slot="label"><i class="el-icon-date"></i> TA的资料</span>
            <div class="tab-pane-left">
              <div class="info-item"> 
                <span class="info-item-title">昵称</span>
                <span class="info-item-text">{{userDetails.nickname}}</span>
              </div>
              <div class="info-item"> 
                <span class="info-item-title">用户名</span>
                <span class="info-item-text">{{userDetails.name}}</span>
              </div>
              <div class="info-item"> 
                <span class="info-item-title">用户ID</span>
                <span class="info-item-text">{{userDetails.code}}</span>
              </div>
              <div class="info-item"> 
                <span class="info-item-title">注册时间</span>
                <span class="info-item-text">{{signUpTime()}}</span>
              </div>
            </div>
            <div class="tab-pane-right">
              <div class="info-item"> 
                <span class="info-item-title">电子邮件</span>
                <span class="info-item-text">{{userDetails.email==''?'未填写电子邮件':userDetails.email}}</span>
              </div>
              <div class="info-item"> 
                <span class="info-item-title">性别</span>
                <span class="info-item-text">{{userDetails.sex==3?'保密':(userDetails.sex==1?'女':'男')}}</span>
              </div>
              <div class="info-item"> 
                <span class="info-item-title">年龄</span>
                <span class="info-item-text">{{userDetails.age}}</span>
              </div>
              <div class="info-item"> 
                <span class="info-item-title">地址</span>
                <span class="info-item-text">{{userDetails.loginSetting.country}}</span>
              </div>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import pyqListCmp from "@/components/mzonePyq";
import { formatting } from "@/utils";
export default {
  name: "UserDetails",
  data() {
    return {
      userDetails: {},
      IMG_URL: process.env.IMG_URL,
      pyqList: [],
      hasMorePyq: true,
      pyqPage: 0,
      pyqPageSize: 7
    };
  },
  computed: {
    device() {
      return this.$store.state.device.deviceType;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    signUpTime() {
      let fromatTime = new Date(this.userDetails.signUpTime).getTime();
      return formatting(fromatTime);
    },
    getUserPyq() {
      const { id } = this.$route.params;
      const params = {
        userId: id,
        page: this.pyqPage,
        pageSize: this.pyqPageSize
      };
      this.$http.getUserPyq(params).then(res => {
        const { data, status } = res.data;
        if (status === 2000 && res.status < 400) {
          this.pyqList = [...this.pyqList, ...data];
          this.pyqLoading = false;
          if (data.length < 7) {
            this.hasMorePyq = false;
          } else {
            this.hasMorePyq = true;
            this.pyqPage++;
          }
        }
      });
    }
  },
  components: {
    pyqListCmp
  },
  async created() {
    const { id } = this.$route.params;
    // this.getUserPyq()
    const { data } = await this.$http.getUserInfo(id);
    const { data: userDetails, status } = data;
    if (status === 2000) {
      userDetails.avatar = this.IMG_URL + userDetails.photo;
      this.userDetails = userDetails;
    }
  }
};
</script>

<style lang="scss">
.user-details-page {
  width: 100%;
  // background-color: #e9ebee;
  position: relative;
  height: 98%;
  width: 70%;
  min-width: 1000px;
  padding: 20px;
  margin: 10px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  background-color: #f3f2ef;
  border-radius: 30px;
  margin-top: 1vh;
  overflow: scroll;
  .back {
    position: absolute;
    top: 30px;
    left: 50px;
    cursor: pointer;
  }
  .wrapper {
    width: 100%;
    margin-top: 50px;
    .details-top {
      height: 315px;
      position: relative;
      margin-bottom: 10px;
      &.mobile {
        height: 200px;
      }
      .carousel {
        width: 100%;
        height: 300px;
        overflow: hidden;
        img {
          width: 100%;
          height: 300px;
        }
      }
      .info {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 30px;
        z-index: 999;
        padding: 0 10px;
        // height: 60px;
        .avatar {
          width: 100px;
          height: 100px;
        }
        .nickname {
          margin: 0 30px;
          font-size: 27px;
          color: #ffffff;
        }
      }
    }
    .details-body {
      .el-tabs--border-card {
        background-color: #e9ebee;
      }
      .el-tabs {
        box-shadow: none;
        // background-color: #e9ebee;
        .el-tabs__header {
          .is-active {
            position: relative;
            border-bottom: none;
            &::before {
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              transition: all 0.5s ease;
              content: "";
              width: 0;
              height: 0;
              border-bottom: 10px solid #e9ebee;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
            }
          }
        }
        .el-tabs__content {
          margin-top: 10px;
          // background: #FFF
          .el-tab-pane {
            display: flex;
            width: 100%;
            font-size: 16px;
            .tab-pane-right,
            .tab-pane-left {
              width: 50%;
              padding: 0 20px;
              .info-item {
                padding: 10px;
                display: flex;
                justify-content: space-between;
                &:nth-child(even) {
                  background-color: #f5f7fa;
                }
              }
            }
            .tab-pane-left {
              border-right: 2px solid #999;
            }
          }
        }
      }
    }
  }
}
</style>
