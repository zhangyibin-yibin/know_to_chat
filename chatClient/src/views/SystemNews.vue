<template>
  <div class="system-page">
    <div class="back" @click='back()'>
      <svg t="1636510887671" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2416" width="35" height="35"><path d="M475.591 300.373V175.218c-11.378-52.338-54.613-20.48-54.613-20.48L120.604 411.876c-65.99 45.51-4.55 79.644-4.55 79.644l295.822 254.862c59.164 43.236 63.715-22.755 63.715-22.755V607.573c300.373-93.297 423.253 279.894 423.253 279.894 11.378 20.48 18.205 0 18.205 0C1033.102 327.68 475.59 300.373 475.59 300.373z" p-id="2417" fill="#555555"></path></svg>
    </div>
    <!-- <p class="title">我的系统消息</p> -->
    <validate-news :validateNewsList="validateNewsList" @changeValidateNewsStatus="changeValidateNewsStatus" />
  </div>
</template>

<script>
import validateNews from "@/components/validateNews";
export default {
  name: "System",
  data() {
    return {
      validateNewsList: []
      // validateNewsList: [{"_id":"5e37d26d01cc1f45685a7acf","roomid":"5e366c6f6b00323a2446512b-5d9d929f49db3825a8e76a04","senderId":"5e2eac0300a77529b8580ddd","senderName":"123456","senderNickname":"良牙03","senderAvatar":"/img/picture.png","reveiverId":"5d9d929f49db3825a8e76a04","time":"2020-02-03 15:57:33","additionMessage":"123123123123","status":1,"validateType":0,"__v":0},{"_id":"5e3fa8b2721ba61d34dbda0e","roomid":"5e366c6f6b00323a2446512b-5d9d929f49db3825a8e76a04","senderId":"5dbec4dbf4972d5754d35d66","senderName":"test","senderNickname":"达也97","senderAvatar":"/img/picture.png","reveiverId":"5d9d929f49db3825a8e76a04","time":"2020-02-09 14:37:38","additionMessage":"你好","status":1,"validateType":0,"__v":0},{"_id":"5e3fb0f3721ba61d34dbda0f","roomid":"5e366c6f6b00323a2446512b-5d9d929f49db3825a8e76a04","senderId":"5dbec4dbf4972d5754d35d66","senderName":"test","senderNickname":"达也97","senderAvatar":"/img/picture.png","reveiverId":"5d9d929f49db3825a8e76a04","time":"2020-02-09 15:12:51","additionMessage":"123","status":1,"validateType":0,"__v":0},{"_id":"5e3fb779721ba61d34dbda11","roomid":"5e366c6f6b00323a2446512b-5d9d929f49db3825a8e76a04","senderId":"5dc8277865b0e64374cccf12","senderName":"chen2","senderNickname":"童虎1c","senderAvatar":"/img/picture.png","reveiverId":"5d9d929f49db3825a8e76a04","time":"2020-02-09 15:40:41","additionMessage":"你好","status":1,"validateType":0,"__v":0},{"_id":"5e3fb781721ba61d34dbda12","roomid":"5e366c6f6b00323a2446512b-5d9d929f49db3825a8e76a04","senderId":"5dc8277865b0e64374cccf12","senderName":"chen2","senderNickname":"童虎1c","senderAvatar":"/img/picture.png","reveiverId":"5d9d929f49db3825a8e76a04","time":"2020-02-09 15:40:49","additionMessage":"你好2","status":1,"validateType":0,"__v":0}]
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    device() {
      return this.$store.state.device.deviceType;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async fetchMyValidateNews() {
      const { _id: id } = this.userInfo;
      const { data } = await this.$http.getMyValidateNews({ id });
      const { data: validateNewsList, status } = data;
      console.log(data);
      if (status === 2000) {
        this.validateNewsList = validateNewsList;
      }
    },
    changeValidateNewsStatus(item, status) {
      console.log(item, status);
      const { roomid, senderId, reveiverId } = item;
      this.validateNewsList.forEach(item => {
        if (
          item.roomid === roomid &&
          item.senderId === senderId &&
          item.reveiverId === reveiverId
        ) {
          item.status = status;
        }
      });
      // this.fetchMyValidateNews()
    }
  },
  components: {
    validateNews
  },
  sockets: {
    receiveValidateMessage(data) {
      console.log("在system页面接收新的验证消息：", data);
      this.validateNewsList = [...this.validateNewsList, data];
    }
  },
  created() {
    // this.$http.getMyValidateNews()
    this.fetchMyValidateNews();
  }
};
</script>

<style lang="scss">
.system-page {
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
  // padding-top: 100px;
  // margin-top: 1pc;
  .back {
    position: absolute;
    top: 50px;
    left: 50px;
    cursor: pointer;
  }
  .title {
    margin-top: 0;
  }
}
</style>
