<template>
  <div class="mzone-page">
    <div class="mzone-wrapper">
      <div v-if="device === 'Mobile'" class="goback el-icon-arrow-left" @click="$router.go(-1)" />
      <div class="mzone-top">
        <!-- <div class="carousel" :style="'backgroundImage:url(' + IMG_URL + userInfo.cover [0] + ')'"></div> -->
        <div class="info">
          <el-avatar
            class="avatar"
            size="large"
            :src="IMG_URL + userInfo.photo"
            @error="() => true"
          >
            <img
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            >
          </el-avatar>
          <div class="nickname">
            <router-link slot="reference" :to="`/chat/user/${userInfo._id}`" class="nickname-link">
              {{userInfo.nickname}}
            </router-link>
          <i :class="'level '+ 'lv' + level"></i>
      </div>
        </div>
      </div>
      <!-- <suck-top :top="30" parent=".mzone-page" :z-index="1004"> -->
        <!-- <div ref="navtop" class="mzone-nav" :style="{width: navTopWidth + 'px'}"> -->
      <el-menu :default-active="activeTab" @select="tabSelect" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="pyq">好友动态</el-menu-item>
        <el-menu-item index="blog">博客</el-menu-item>
      </el-menu>
        <!-- </div> -->
      <!-- </suck-top> -->
      <div class="mzone-body">       
        <div v-show="activeTab === 'pyq'" class="content">
          <send-mzone @watchsend="watchSendPyq" />
          <m-pyq
            :pyq-list-data="myFriendPyqList"
            :has-more="hasMorePyq"
            @modifyPyq="modifyPyq"
            @getPyq="getMyFriendPyq"
          />
        </div>
        <div v-show="activeTab === 'blog'" class="content blog">
          <blog />
        </div>
      </div>
      <back-top target=".mzone-page" />
    </div>
  </div>
</template>

<script>
import mPyq from "@/components/mzonePyq";
import sendMzone from "@/components/sendMZone";
import backTop from "@/components/backTop";
import suckTop from "@/components/suckTop";
import Blog from "./blog";
import { computedLevel } from "@/utils";
export default {
  name: "MZone",
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      activeTab: "blog",
      navTopWidth: 0,
      menulistWidth: 0,

      newPyqItem: {}, // 用户新发表的朋友圈
      myFriendPyqList: [], // 我的好友的朋友圈李彪
      hasMorePyq: true,
      pyqLoading: true, // 正在获取朋友圈
      pyqPage: 0,
      pyqPageSize: 7
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
    tabSelect(index) {
      // console.log(a)
      this.activeTab = index;
    },
    watchSendPyq(newPyqItem) {
      // 监听用户发表新的朋友圈
      this.myFriendPyqList = [newPyqItem, ...this.myFriendPyqList];
    },
    getMyFriendPyq() {
      // 获取我的好友发表的朋友圈
      this.pyqLoading = true;
      const params = {
        id: this.userInfo._id,
        page: this.pyqPage,
        pageSize: this.pyqPageSize
      };
      this.$http.getFriendlyPyq(params).then(res => {
        const { data, status } = res.data;
        if (status === 2000 && res.status < 400) {
          this.myFriendPyqList = [...this.myFriendPyqList, ...data];
          this.pyqLoading = false;
          if (data.length < 7) {
            this.hasMorePyq = false;
          } else {
            this.hasMorePyq = true;
            this.pyqPage++;
          }
        }
      });
    },
    modifyPyq(newPyqList) {
      this.myFriendPyqList = newPyqList;
    }
  },
  components: {
    mPyq,
    sendMzone,
    backTop,
    suckTop,
    Blog
  },
  mounted() {
    const mzoneWrapper = document.querySelector(".mzone-wrapper");
    // const menulist = document.querySelector('.menulist')
    const mzoneWrapperWidth = window.getComputedStyle(mzoneWrapper).width;
    // const menulistWidth = window.getComputedStyle(menulist).width
    this.navTopWidth = parseInt(mzoneWrapperWidth);
    // this.menulistWidth = parseInt(menulistWidth)
  }
};
</script>

<style lang="scss" scoped>
.mzone-page {
  // width: 100%;
  // background-color: #e9ebee;
  // height: 100%;
  // padding: 0 10px;
  // overflow-y: scroll;
  position: relative;
  height: 98%;
  width: 70%;
  min-width: 1000px;
  // padding: 20px;
  margin: 10px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  background-color: #f3f2ef;
  border-radius: 30px;
  padding: 10px 20px;
  .mzone-wrapper {
    // width: 100%;
    position: relative;
    margin: 0 auto;
    .mzone-top {
      height: 150px;
      position: relative;
      padding-top: 30px;
      // align-items: center;
      .carousel {
        height: 150px;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .info {
        display: flex;
        align-items: center;
        // position: absolute;
        // bottom: -10px;
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
          color: #555;
          .nickname-link {
            text-decoration: none;
            color: #222222;
            &:hover {
              text-decoration: underline;
              color: #21aa93;
            }
          }
        }
      }
    }
    .mzone-nav {
      .el-tabs {
        box-shadow: none;
        background-color: #e9ebee;
        .el-tabs__header {
          .is-active {
            position: relative;
            border-bottom: none;
            // &::before {
            //   position: absolute;
            //   bottom: 0;
            //   left: 50%;
            //   transform: translateX(-50%);
            //   transition: all .5s ease;
            //   content: '';
            //   width: 0;
            //   height: 0;
            //   border-bottom: 10px solid #e9ebee;
            //   border-left: 10px solid transparent;
            //   border-right: 10px solid transparent;
            // }
          }
        }
        .el-tabs__content {
          margin-top: 10px;
          background: #fff;
        }
      }
    }
    .mzone-body {
      // display: flex;
      // justify-content: space-between;
      margin-top: 10px;
      .menulist {
        width: 20%;
      }
      .content {
        width: 100%;
        margin-left: 25px;
        &.blog {
          margin-left: 0;
        }
      }
      &.mobile {
        .menulist {
          display: none;
        }
        .content {
          width: 100%;
          margin-left: 0;
        }
      }
    }
  }
}
</style>
