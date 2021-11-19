<template>
  <div class="blog-info-page" v-loading="isFetching">
    <div class="back" @click='back()'>
      <svg t="1636510887671" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2416" width="35" height="35"><path d="M475.591 300.373V175.218c-11.378-52.338-54.613-20.48-54.613-20.48L120.604 411.876c-65.99 45.51-4.55 79.644-4.55 79.644l295.822 254.862c59.164 43.236 63.715-22.755 63.715-22.755V607.573c300.373-93.297 423.253 279.894 423.253 279.894 11.378 20.48 18.205 0 18.205 0C1033.102 327.68 475.59 300.373 475.59 300.373z" p-id="2417" fill="#555555"></path></svg>
    </div>
    <div class="blog-wrapper">
      <div class="blog-main">
        <div class="header">
          <avatar-header :userInfo="authorInfo" :time="blogInfo.createDate" />
        </div>
        <div v-if="blogInfo.cover" class="cover" v-css="{'background-image': 'url(' + blogInfo.cover + ')'}"></div>
        <div class="blog-info">
          <h1 class="title">{{blogInfo.title}}</h1>
          <div v-html="content" class="markdown-body"></div>
        </div>
        <!-- <div class="tag-list">
          <part-title text="关注以下标签，发现更多相似文章" />
          <span class="tag-item" v-for="item in blogInfo.tags" :key="item._id">
            <el-tag>{{item.name}}</el-tag>
          </span>
        </div> -->
      </div>
      <div
        :class="device === 'Mobile' ? 'blog-aside mobile' : 'blog-aside'"
        :style="device !== 'Mobile' ? {top: pageScrollTop + 300 + 'px'} : {}"
      >
        <!-- <span class="item like iconfont icon-dianzan"></span> -->
        <!-- <span class="item comment iconfont icon-pinglun1"></span> -->
      </div>
    </div>
  </div>
</template>

<script>
import marked from "@/plugins/marked";
import { debounce, formatDateToZH, LocalStorageManager } from "@/utils";
import avatarHeader from "@/components/avatarHeader";
import partTitle from "@/components/partTitle";
const localStorageManager = new LocalStorageManager();
export default {
  name: "BlogInfo",
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      isFetching: true,
      id: "",
      blogInfo: {},
      authorInfo: {},
      pageScrollTop: 0,
      pageDOM: ""
    };
  },
  computed: {
    content() {
      return marked(this.blogInfo.content, false, true).html;
    },
    device() {
      return this.$store.state.device.deviceType;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
      console.log(this.blogInfo);
    },
    setAuthorInfo(info) {
      for (const key in info) {
        if (info.hasOwnProperty(key)) {
          this.$set(this.authorInfo, key, info[key]);
        }
      }
    },
    async getBlogInfo() {
      this.isFetching = true;
      const { data } = await this.$http.getBlogInfo(this.id);
      if (data.status === 2000) {
        this.blogInfo = data.data;
        this.setAuthorInfo(data.data.authorId);
      }
      this.isFetching = false;
    },
    handlerScroll: debounce(function(e) {
      const scrollTop = e.target.scrollTop;
      this.pageScrollTop = scrollTop;
      localStorageManager.set(`blog-acrticle-${this.id}`, scrollTop);
    }, 500)
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val);
    }
  },
  components: {
    avatarHeader,
    partTitle
  },
  watch: {
    blogInfo: {
      handler(val) {
        this.$nextTick(() => {
          const scrollTop = localStorageManager.getStr(
            `blog-acrticle-${this.id}`
          );
          document.querySelector(".blog-info-page").scrollTop = scrollTop;
        });
      }
    }
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
    this.getBlogInfo();
  },
  mounted() {
    const pageDOM = document.querySelector(".blog-info-page");
    pageDOM.addEventListener("scroll", this.handlerScroll);
    this.pageDOM = pageDOM;
  },
  beforeDestroy() {
    this.pageDOM.removeEventListener("scroll", this.handlerScroll);
  }
};
</script>

<style lang="scss">
@import "./../../static/css/animation.scss";
@import "./../../static/css/markdown.css";
@import "./../../static/css/var.scss";
.blog-info-page {
  position: relative;
  height: 98%;
  width: 70%;
  min-width: 1000px;
  // padding: 20px;
  margin: 10px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  background-color: #f3f2ef;
  border-radius: 30px;
  padding-top: 100px;
  .back {
    position: absolute;
    top: 50px;
    left: 50px;
    cursor: pointer;
  }
  .blog-wrapper {
    margin-right: 30px;
    padding: 0 10px 10px;
    background-color: $primarybg;
    .blog-main {
      .cover {
        width: 100%;
        padding: 20%;
      }
      .blog-info {
        margin-top: 30px;
        .title {
          margin: 0 0 30px;
          font-size: 30px;
        }
      }
      .tag-list {
        margin-top: 30px;
        .tag-item {
          display: inline-block;
          margin: 0 10px 10px 0;
          cursor: pointer;
        }
      }
    }
    .blog-aside {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      position: absolute;
      right: 5px;
      width: 20px;
      transition: all 0.5s;
      font-size: 20px;
      .item {
        font-size: 20px;
      }
      &.mobile {
        position: fixed;
        bottom: -1px;
        width: 100%;
        flex-direction: row;
        padding: 5px 20px;
        // background-color: $primarybg;
        background-color: #fff;
        justify-content: start;
        .item {
          width: 50%;
          text-align: center;
        }
      }
    }
  }
}
</style>
