<template>
  <div class="conversationlist-com">
    <!-- <div
      class="search"
      :style="device === 'Mobile' ? {marginLeft: '50px'} : {}"
    >
      <top-search />
    </div> -->
    <div class="conversationlist-com-top">
      <div class="logo">
        <svg t="1636427501205" class="icon" viewBox="0 0 1505 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19896" data-spm-anchor-id="a313x.7781069.0.i45" width="50" height="50"><path d="M256.104629 876.286334c-10.828633 0-21.518438-4.997831-28.321042-14.577006-33.874187-47.340564-35.401302-78.021692-35.401301-132.581345 0-49.145336 13.744035-97.735358 39.704989-140.21692 24.989154-40.815618 60.806941-75.661605 103.704989-100.650759 16.520607-9.718004 37.761388-4.02603 47.479393 12.494577 9.718004 16.520607 4.02603 37.761388-12.494577 47.479392-68.303688 39.843818-108.980477 107.453362-108.980478 181.032538 0 49.145336 0.832972 61.778742 22.490239 92.182213 11.106291 15.548807 7.496746 37.206074-8.052061 48.451193-5.969631 4.303688-13.049892 6.386117-20.130151 6.386117z" fill="#21aa93" p-id="19897" data-spm-anchor-id="a313x.7781069.0.i41" class="selected"></path><path d="M218.482069 1024c-9.579176 0-18.880694-4.02603-25.544469-11.106291-7.913232-8.607375-10.967462-20.685466-8.190889-32.069414l37.62256-147.574837c4.720174-18.603037 23.600868-29.848156 42.203904-25.127983 18.603037 4.720174 29.848156 23.600868 25.127983 42.203905l-24.43384 95.791757 122.030369-20.824295c6.247289-1.110629 12.494577-0.416486 18.32538 1.804772 29.292842 11.383948 60.529284 17.075922 92.737527 17.075922 69.691974 0 135.496746-27.765727 180.616052-76.078091 13.049892-14.021692 34.984816-14.715835 49.006507-1.665944 14.021692 13.049892 14.715835 34.984816 1.665944 49.006508-58.169197 62.334056-142.438178 98.151844-231.288503 98.151843-37.483731 0-73.856833-6.247289-108.563992-18.464208L224.4517 1023.444685c-1.943601 0.277657-4.02603 0.555315-5.969631 0.555315z" fill="#21aa93" p-id="19898" data-spm-anchor-id="a313x.7781069.0.i39" class="selected"></path><path d="M1233.041722 601.266811l58.86334 231.010846L1018.551483 785.631236c-50.672451 19.574837-106.342733 30.542299-164.650759 30.5423-234.481562 0-424.537961-174.924078-424.537961-390.663775S619.280334 34.707158 853.900724 34.707158s424.537961 174.924078 424.537961 390.663775c0 79.27115-1.388286 114.255965-45.396963 175.895878" fill="#CCE187" p-id="19899" data-spm-anchor-id="a313x.7781069.0.i44" class="selected"></path><path d="M1291.905062 866.984816c-1.943601 0-3.887202-0.138829-5.830802-0.555315l-264.052061-45.119306C968.573175 840.885033 911.931093 850.741866 853.900724 850.741866c-122.169197 0-237.119306-43.869848-323.748373-123.557484-42.342733-39.010846-75.661605-84.546638-98.984816-135.219089-24.295011-52.754881-36.511931-108.841649-36.51193-166.59436s12.355748-113.839479 36.51193-166.59436c23.32321-50.672451 56.642082-96.208243 98.984816-135.219089 86.629067-79.687636 201.579176-123.557484 323.748373-123.557484s237.119306 43.869848 323.748373 123.557484c42.342733 39.010846 75.661605 84.546638 98.984816 135.219089 24.295011 52.754881 36.511931 108.841649 36.51193 166.59436 0 77.882863-1.943601 120.780911-42.62039 182.559653l54.976139 215.739696c2.915401 11.383948-0.138829 23.462039-8.19089 32.069414-6.524946 7.219089-15.826464 11.245119-25.40564 11.24512zM1018.551483 750.924078c1.943601 0 3.887202 0.138829 5.830803 0.555315l220.737527 37.761388-45.67462-179.227766c-2.498915-9.856833-0.555315-20.407809 5.414316-28.737527 37.206074-52.060738 38.872017-77.049892 38.872018-155.626898 0-196.303688-174.924078-355.956616-389.830803-355.956616s-389.830803 159.652928-389.830803 355.956616c0 196.303688 174.924078 355.956616 389.830803 355.956616 52.754881 0 103.982646-9.440347 152.156182-28.182213 4.02603-1.804772 8.190889-2.498915 12.494577-2.498915z" fill="#21aa93" p-id="19900" data-spm-anchor-id="a313x.7781069.0.i38" class="selected"></path><path d="M929.007015 470.490239c0 46.091106-37.483731 83.574837-83.574838 83.574837s-83.574837-37.483731-83.574837-83.574837h167.149675z" fill="#2A9B74" p-id="19901"></path><path d="M845.432177 574.889371c-57.613883 0-104.399132-46.785249-104.399132-104.399132 0-11.522777 9.301518-20.824295 20.824295-20.824295h167.149675c11.522777 0 20.824295 9.301518 20.824295 20.824295 0 57.475054-46.785249 104.399132-104.399133 104.399132z m-59.140998-83.574837c8.607375 24.433839 31.930586 41.926247 59.140998 41.926247s50.533623-17.492408 59.140998-41.926247H786.291179z" fill="#2A9B74" p-id="19902"></path><path d="M865.423501 543.930586H825.440854c-11.661605 0-21.37961-9.579176-21.379609-21.37961v-3.193058c0-11.661605 9.579176-21.37961 21.379609-21.37961h39.982647c11.661605 0 21.37961 9.579176 21.379609 21.37961v3.193058c0 11.800434-9.579176 21.37961-21.379609 21.37961z" fill="#FFFFFF" p-id="19903"></path><path d="M865.423501 544.624729H825.440854c-12.078091 0-22.073753-9.856833-22.073753-22.073753v-3.193058c0-12.078091 9.856833-22.073753 22.073753-22.073753h39.982647c12.078091 0 22.073753 9.856833 22.073752 22.073753v3.193058c0 12.21692-9.856833 22.073753-22.073752 22.073753z m-39.982647-45.813449c-11.383948 0-20.685466 9.301518-20.685466 20.685466v3.193059c0 11.383948 9.301518 20.685466 20.685466 20.685466h39.982647c11.383948 0 20.685466-9.301518 20.685466-20.685466v-3.193059c0-11.383948-9.301518-20.685466-20.685466-20.685466H825.440854z" fill="#2A9B74" p-id="19904"></path><path d="M682.308533 383.722343m-47.201735 0a47.201735 47.201735 0 1 0 94.40347 0 47.201735 47.201735 0 1 0-94.40347 0Z" fill="#2A9B74" p-id="19905"></path><path d="M1007.584021 383.722343m-47.201735 0a47.201735 47.201735 0 1 0 94.40347 0 47.201735 47.201735 0 1 0-94.40347 0Z" fill="#2A9B74" p-id="19906"></path></svg>
        <span class="logo-title">知聊</span>
      </div>
      <div class="todo">
        <todo />
      </div>
    </div>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane>
        <span slot="label">
          <svg t="1636423964416" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14391" width="20" height="20"><path d="M504.14253 974.868231C233.014641 974.868231 12.463574 769.49021 12.463574 516.967366S233.014641 59.066502 504.14253 59.066502s491.678956 205.378021 491.678955 457.900864c0 85.25807-24.927148 167.264773-72.252602 239.156113 42.809667 35.945669 95.012171 80.38102 91.580173 135.292997-1.445052 22.75957-11.018522 42.087141-27.997883 55.815135-46.78356 38.113247-138.00247 25.288411-226.331275 12.644205-34.86188-4.877051-73.878285-10.476627-94.470277-9.212207l-1.806315 1.806315h-8.489681c-48.951138 14.992415-99.889222 22.398307-151.911095 22.398307z m0-850.774387C268.96031 124.093844 77.671547 300.390192 77.671547 516.967366s191.288763 392.873523 426.470983 392.873523c44.615982 0 88.509437-6.322103 130.415946-18.605045l0.903157-0.722526 10.837891-2.709473h1.625683c28.539778-5.238314 70.085024 0.541895 122.287529 7.947787 60.330923 8.489681 151.369201 21.495149 175.935085 1.26442 1.986947-1.625684 3.793262-3.61263 4.154525-9.392838 1.445052-22.940201-43.351561-60.511554-70.265655-82.909861-7.767155-6.502734-15.173046-12.644205-21.856412-18.605045L835.601341 765.87758l18.243782-23.843359c50.215558-66.111131 76.949021-143.963309 76.949021-225.066855-0.180632-216.577174-191.469395-392.873523-426.651614-392.873522z" p-id="14392" fill="#555555"></path><path d="M755.581584 476.144646H272.031046c-49.312401 0-49.312401-71.349444 0-71.349444h483.73117c49.131769 0 49.131769 71.349444-0.180632 71.349444zM755.581584 629.139531H485.898748c-43.893456 0-43.893456-65.027342 0-65.027342h269.682836c36.306932 0 36.306932 65.027342 0 65.027342z" p-id="14393" fill="#555555"></path></svg>
        </span>
        <recent-conversation-list
          :current-conversation="currentConversation"
          :set-current-conversation="setCurrentConversation"
          @setCurrentConversation="setCurrentConversation"
        />
      </el-tab-pane>
      <el-tab-pane label="好友">
        <span slot="label">
          <svg t="1636423779653" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12781" width="20" height="20"><path d="M515.291429 628.845714A38.582857 38.582857 0 0 1 530.285714 597.942857a256 256 0 0 0 102.4-206.994286v-119.771428C632.685714 141.531429 532.662857 36.571429 409.051429 36.571429h-36.571429C249.051429 36.571429 149.028571 141.531429 149.028571 271.177143v119.771428a256 256 0 0 0 102.582858 206.994286 38.582857 38.582857 0 0 1 14.811428 30.902857A37.851429 37.851429 0 0 1 237.714286 666.514286C97.645714 694.857143 0 760.868571 0 837.668571 0 940.617143 174.994286 1024 390.765714 1024s390.948571-83.382857 390.948572-186.331429c0-76.8-97.645714-142.628571-237.714286-171.154285a37.851429 37.851429 0 0 1-28.708571-37.668572z" p-id="12782" fill="#555555"></path><path d="M866.011429 420.571429a25.965714 25.965714 0 0 1-9.691429-45.714286 171.154286 171.154286 0 0 0 68.388571-138.057143v-80.457143A152.868571 152.868571 0 0 0 775.497143 0h-24.137143a149.394286 149.394286 0 0 0-139.52 101.485714 277.211429 277.211429 0 0 1 57.417143 169.691429v102.034286l1.28 1.097142a25.782857 25.782857 0 0 1-2.742857 42.788572A294.217143 294.217143 0 0 1 566.857143 615.314286 420.571429 420.571429 0 0 0 763.428571 658.285714C907.337143 658.285714 1024 603.428571 1024 534.125714c0-51.2-65.097143-95.268571-157.988571-113.554285z" p-id="12783" fill="#555555"></path></svg>
        </span>
        <div class="friend-tab-header space-bw">
          <el-input size="mini" v-model="newFenzuName" placeholder="请输入分组名" style="marginRight: 5px" />
          <el-button size="mini" type="success" @click="addNewFenzu" :loading="isAdding">添加</el-button>
        </div>
        <fenzu-conversation-list
          :current-conversation="currentConversation"
          :set-current-conversation="setCurrentConversation"
          @setCurrentConversation="setCurrentConversation"
        />
      </el-tab-pane>
      <el-tab-pane label="群">
        <span slot="label">
          <svg t="1636424057640" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15939" width="20" height="20"><path d="M960 704h-63.616v-167.392a32 32 0 0 0-32-32H544V416h160a32 32 0 0 0 32-32V96a32 32 0 0 0-32-32H320a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h160v88.608H161.984a32 32 0 0 0-32 31.968L129.792 704H64a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32v-192a32 32 0 0 0-32-32H193.792l0.16-135.392H480V704h-64a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32v-192a32 32 0 0 0-32-32h-64v-135.392h288.384V704H768a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32v-192a32 32 0 0 0-32-32zM352 128h320v224H352V128zM224 896H96v-128h128v128z m352 0h-128v-128h128v128z m352 0h-128v-128h128v128z" p-id="15940" fill="#555555"></path></svg>
        </span>
        <group-conversation-list
          :current-conversation="currentConversation"
          :set-current-conversation="setCurrentConversation"
          @setCurrentConversation="setCurrentConversation"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import "./../../../static/iconfont/iconfont.css";
import recentConversationList from "./RecentConversation";
import fenzuConversationList from "./FenzuConversation";
import groupConversationList from "./GroupConversation";
import todo from "@/components/todo";
import topSearch from "./TopSearch";
import { SET_UNREAD_NEWS_TYPE_MAP } from "@/store/constants";
import { conversationTypes } from "@/const";
import {
  saveMyFriendsToLocalStorage,
  saveMyGroupToLocalStorage
} from "@/utils";
export default {
  name: "ConversationListComponent",
  props: {
    currentConversation: Object,
    setCurrentConversation: Function
  },
  data() {
    return {
      /**
       * {
          _id: 对方的ID
          conversationType:"FRIEND"
          createDate:"2020-02-10T00:00:00.000Z"
          myAvatar:"/img/picture.png"
          myId:"5d9d929f49db3825a8e76a04"
          myNickname:"chenchao"
          nickname:"chenchao2"
          photo:"/uploads/2019-11-10/f-1573390856438-f1573390856092.png"
          roomid:"5d9d929f49db3825a8e76a04-5d9d903f49db3825a8e76a03"
          signature:"hahahha,笑死我了...."
       * }
       */
      conversationList: [],
      searchKeyWord: "",
      newFenzuName: "", // 新添加的分组名称
      activeFriendFenzu: [],
      activeGorupFenzu: [],
      isAdding: false // 是否正在添加分组
    };
  },
  computed: {
    userInfo() {
      // 用户信息
      return this.$store.state.user.userInfo;
    },
    friendFenzu() {
      // 获取所有分组 [分组1， 分组2]
      return Object.keys(this.userInfo.friendFenzu);
    },
    device() {
      return this.$store.state.device.deviceType;
    }
  },
  methods: {
    async addNewFenzu() {
      if (!this.newFenzuName.trim()) return;
      if (this.friendFenzu.includes(this.newFenzuName.trim())) {
        this.$message({ type: "warning", message: "已有该分组" });
      }
      this.isAdding = true;
      const params = {
        name: this.newFenzuName.trim(),
        userId: this.userInfo._id
      };
      const { data } = await this.$http.addNewFenzu(params);
      if (data.status !== 2000) {
        this.$message({ message: data.msg, type: warning });
      }
      this.newFenzuName = "";
      const userInfo = await this.$http.getUserInfo(this.userInfo._id);
      this.isAdding = false;
      this.$store.dispatch("user/LOGIN", userInfo.data.data);
    },
    joinChatRoom() {
      // 发送websocket消息，将会话列表加入房间
      this.conversationList.forEach(item => {
        this.$socket.emit("join", item);
      });
    }
  },
  // sockets: {
  //   async receiveAgreeFriendValidate(data) {
  //     console.log('receiveAgreeFriendValidate conversationlist', data)
  //     await this.getMyFriends()
  //     this.getMyGroup()
  //   },
  // },
  // watch: {
  //   conversationList: {
  //     handler() {
  //       this.joinChatRoom()
  //     }, deep: true, immediate: true
  //   },
  //   '$store.state.app.agreeFriendValidate': {
  //     async handler(newVal, oldVal) {
  //       if (newVal) {
  //         await this.getMyFriends()
  //         this.getMyGroup()
  //       }
  //     }, immediate: true, deep: true
  //   }
  // },
  components: {
    recentConversationList,
    fenzuConversationList,
    groupConversationList,
    todo,
    topSearch
  }
};
</script>

<style lang="scss">
@import "./../../../static/css/var.scss";
.conversationlist-com {
  height: 100%;
  width: 350px;
  padding: 10px 5px;
  background-color: #f3f2ef;
  // .search {
  //   padding: 10px 0;
  // }
  &-top {
    display: flex;
    justify-content: space-between;
  }
  .logo {
    color: #21aa93;
    font-size: 30px;
    font-weight: 600;
  }
  .todo {
    padding-bottom: 10px;
  }
  .el-tabs.el-tabs--top.el-tabs--border-card {
    height: calc(100% - 50px);
    overflow-x: hidden;
    background-color: $normalbg;
    .el-tabs__header {
      background-color: $seatbg;
      // background-color: $secondarybg;
      .el-tabs__item {
        font-size: 20px;
      }
      .el-tabs__item.is-active path {
        background-color: $normalbg;
        fill: #21aa93;
      }
    }
    .el-tabs__content {
      padding: 0;
      height: calc(100% - 40px);
      background-color: $normalbg;
      // overflow: scroll;
      // overflow-x: hidden;
      position: relative;
      .friend-tab-header {
        padding: 10px;
        .el-button {
          background-color: #21aa93;
          border: none;
          outline: none;
        }
      }
    }
  }
  .el-collapse {
    .el-collapse-item__header {
      padding-left: 10px;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
}
</style>
