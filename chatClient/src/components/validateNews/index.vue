<template>
  <div class="validatenews-com">
    <div class="wrapper">
      <div class="title">验证消息</div>
      <div class="filter">
        <el-tag type="info">选择过滤条件：</el-tag>
        <el-select v-model="filterType" placeholder="请选择">
          <el-option
            label="群"
            :value="1" />
          <el-option
            label="好友"
            :value="0" />
        </el-select>
        <el-select v-model="filterStatus" placeholder="请选择">
          <el-option
            label="全部"
            :value="-1" />
          <el-option
            label="未处理"
            :value="0" />
          <el-option
            label="已同意"
            :value="1" />
          <el-option
            label="已拒绝"
            :value="2" />
        </el-select>
      </div>
      <div class="counter">
        <span>
          一共{{outcomteList.length}}条记录
        </span>
      </div>
      <!-- <div class="validatenews-item"> -->
      <div class="validatenews-item" v-for="item in outcomteList" :key="item.time">
        <div class="apply-info">
          <span class="title">
            <!-- <el-tooltip class="item" effect="dark" content="点击查看用户主页" placement="top"> -->
            <el-avatar :size="60" :src="IMG_URL + item.senderAvatar" @error="()=>true">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            <div class="title-right">
              <span class="nickname">
                <router-link :to="`/user/${item.senderId}`" class="">
                  {{item.senderNickname.slice(0,10)}}
                </router-link>
              </span>
              <!-- </el-tooltip> -->
              <!-- {{item.validateType === 0 ? validateNewsTips.applyFriend}} -->
              <div class="title-message">
                <span v-if="item.validateType === 0">
                  {{validateNewsTips.applyFriend}}
                </span>
                <span v-else-if="item.validateType === 1">
                  {{validateNewsTips.applyGroup}}：{{item.groupId && item.groupId.title}}
                </span>
                <span class="time">
                  {{item.time}}
                </span>
              </div>
            </div>
          </span>
        </div>
        <div class="go-operation">
          <el-popover
            placement="left"
            width="300"
            trigger="click">
            <div class="validate-popover-body" v-loading="isAdding">
              <div class="sender-info">
                <el-avatar :size="60" :src="IMG_URL + item.senderAvatar" @error="()=>true">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                </el-avatar>
                <div class="info">
                  <span class="nickname">{{item.senderNickname}}</span>
                </div>
              </div>
              <div class="addition">
                <el-tag size="mini" type="info">附加消息：</el-tag>
                <div class="content">
                  <span>{{item.additionMessage}}</span>
                </div>
              </div>
              <!-- <div class="operation"> -->
              <div class="operation" v-if="item.status === 0">
                <el-button type="success" plain size="small" @click="agreeValidate(item)">同意</el-button>
                <el-button type="danger" plain size="small">拒绝</el-button>
              </div>
              <div class="operation" v-else-if="item.status === 1">
                <el-tag type="success">已同意</el-tag>
              </div>
              <div class="operation" v-else-if="item.status === 2">
                <el-tag type="danger">已拒绝</el-tag>
              </div>
            </div>
            <el-button slot="reference" type="success">查看</el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_UNREAD_NEWS_TYPE_MAP } from "@/store/constants";
import { validateNewsTips } from "@/const";
export default {
  props: ["validateNewsList"],
  data() {
    return {
      validateNewsTips,
      IMG_URL: process.env.IMG_URL,
      filterType: 0, // 0人，1群
      filterStatus: 0, // -1全部，0未处理，1已同意，2已拒绝
      isAdding: false
    };
  },
  computed: {
    outcomteList() {
      return this.validateNewsList.filter(item => {
        if (this.filterStatus === -1) {
          return item.validateType === this.filterType;
        } else {
          return (
            item.status === this.filterStatus &&
            item.validateType === this.filterType
          );
        }
      });
    },
    systemValidateUsers() {
      return this.$store.state.app.sysUsers.filter(
        item => item.code === "111111"
      )[0];
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    device() {
      return this.$store.state.device.deviceType;
    }
  },
  methods: {
    agreeValidate(item) {
      if (item.validateType === 0) {
        this.$socket.emit("sendAgreeFriendValidate", item);
      } else if (item.validateType === 1) {
        this.$socket.emit("sendAgreeGroupValidate", item);
      }
      this.$store.dispatch("app/SET_AGREE_FRIEND_VALIDATE", true);
      this.isAdding = true;
      setTimeout(() => {
        this.isAdding = false;
        this.$emit("changeValidateNewsStatus", item, 1);
        this.$alert("添加成功", "提示！", {
          confirmButtonText: "确定"
        });
      }, 500);
    }
  },
  mounted() {
    this.$store.dispatch("news/SET_UNREAD_NEWS", {
      roomid: this.systemValidateUsers._id + "-" + this.userInfo._id,
      count: 0,
      type: SET_UNREAD_NEWS_TYPE_MAP.clear
    });
  }
};
</script>

<style lang="scss">
.validate-popover-body {
  .sender-info {
    display: flex;
    align-items: center;
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      .nickname {
        font-size: 20px;
        color: #21aa93;
      }
    }
  }
  .addition {
    margin: 17px 0;
    .content {
      margin-top: 5px;
      font-size: 14px;
    }
  }
  .operation {
    text-align: right;
  }
}
.validatenews-com {
  width: 100%;
  height: 95%;
  overflow-x: hidden;
  .wrapper {
    padding: 10px;
    box-sizing: border-box;
    .title {
      font-size: 20px;
      color: #555;
      display: flex;
      justify-content: center;
      &-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 30px;
        padding: 5px 0;
        .nickname a {
          color: #21aa93;
        }
        .time {
          margin-left: 20px;
        }
      }
    }
    .filter {
      display: flex;
      align-items: center;
      padding: 50px 0 10px 0;
      .el-tag.el-tag--info {
        font-size: 16px;
        padding: 5px;
        height: 40px;
        background-color: #f3f2ef;
        color: #555;
        border: none;
      }
      * {
        padding: 0 5px;
      }
    }
    .counter {
      padding: 10px 0;
    }
    .validatenews-item {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #c0c4cc;
      &:last-child {
        border-bottom: 1px solid #c0c4cc;
      }
      .apply-info {
        .title {
          line-height: 20px;
          .nickname {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
