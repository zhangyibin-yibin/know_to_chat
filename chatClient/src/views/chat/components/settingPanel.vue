<template>
  <div class="setting-panel-cmp">
    <div class="operation-list">
      <span
        class="oper-item operation-text"
        @click.stop="showFenzu"
        v-if="currentConversation.conversationType === conversationTypes.friend"
      >切换分组</span>
      <span
        class="oper-item operation-text"
        slot="reference"
        @click.stop="showBeizhu"
        v-if="currentConversation.conversationType === conversationTypes.friend"
      >修改备注</span>
      <span
        class="oper-item operation-text__danger"
        v-if="currentConversation.conversationType === conversationTypes.friend"
      >删除好友</span>
      <span
        class="oper-item operation-text__danger"
        v-if="currentConversation.conversationType === conversationTypes.group"
      >退出群聊</span>
    </div>
  </div>
</template>

<script>
import { conversationTypes } from "@/const";
export default {
  props: ["currentConversation"],
  data() {
    return {
      conversationTypes,
      newBeizhu: ""
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    showFenzu() {
      this.$eventBus.$emit("toggleFenzuModal", {
        show: true,
        data: {
          currentConversation: this.currentConversation
        }
      });
    },
    showBeizhu() {
      this.$eventBus.$emit("toggleBeizhuModal", {
        show: true,
        data: {
          currentConversation: this.currentConversation
        }
      });
    }
  }
};
</script>

<style lang="scss">
.setting-panel-cmp {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f3f2ef;
  border-radius: 10px;
  width: 100px;
  .operation-list {
    // height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    .oper-item {
      color: #555555;
      font-size: 16px;
      padding: 10px 0;
      line-height: 25px;
      border-radius: 10px;
      border: 1px solid transparent;
      // margin-top: 10px;
    }
    .oper-item:hover {
      background-color: #21aa93;
      color: #fff;
    }
  }
}
</style>
