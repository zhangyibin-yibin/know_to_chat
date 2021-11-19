<template>
  <div class="mzone-blog">
    <div class="content">
      <ul class="blog-list">
        <li v-for="item in blogList" :key="item._id">
          <router-link class="entry-link" :to="`/chat/blog/${item._id}`">
            <div class="blog-item">
              <div class="blog-content">
                <div class="meta-rows">
                  <span class="meta-item avatar">
                    <el-avatar
                      class="avatar"
                      size="large"
                      :src="IMG_URL + item.authorId.photo"
                      @error="() => true"
                    >
                      <img
                        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                      >
                    </el-avatar>
                  </span>
                  <span class="meta-item">{{item.authorId.nickname}}</span>
                  <span class="meta-item">{{item.createDate | formatDateToZH}}</span>
                  <span class="meta-item" v-if="item.category">{{item.category.name}}</span>
                </div>
                <div class="title">
                  <router-link class="entry-link" :to="`/chat/blog/${item._id}`">
                    {{item.title}}
                  </router-link>
                </div>
                <div class="action"></div>
              </div>
              <div
                v-if="item.cover"
                class="blog-cover"
                v-css="{'background-image': 'url(' + item.cover + ')'}"
              ></div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="entry-wrapper">
      <router-link class="entry-link" to="/chat/editor">
        <el-button class="el-icon-edit" type="primary">
          写博客
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { formatDateToZH } from "@/utils";
export default {
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      blogList: []
    };
  },
  methods: {
    async getBlogList() {
      const { data } = await this.$http.getBlogList();
      if (data.status === 2000) {
        this.blogList = data.data;
      }
    }
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val);
    }
  },
  mounted() {
    this.getBlogList();
  }
};
</script>

<style lang="scss">
@import "./../../../static/css/var.scss";
.mzone-blog {
  background-color: $primarybg;
  padding: 10px;
  position: relative;
  .content {
    margin-top: 30px;
    ul {
      padding-left: 0;
    }
    .blog-list {
      .blog-item {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #999;
        .blog-content {
          flex: 1;
          .meta-rows {
            display: flex;
            align-items: center;
            align-content: center;
            // color: #21aa93;
            font-size: 12px;
            .meta-item {
              &::after {
                content: "·";
                margin: 0 4px;
              }
              &:last-child {
                &::after {
                  display: none;
                }
              }
            }
            .avatar {
              margin-right: 10px;
              ::after {
                content: "";
              }
            }
          }
          .title {
            padding: 10px 0;
            font-size: 20px;
            // color: #21aa93;
            .entry-link {
              &:hover {
                color: #21aa93;
                text-decoration: underline;
              }
            }
          }
        }
        .blog-cover {
          width: 56px;
          margin-left: 10px;
        }
      }
      .blog-item:hover {
        color: #21aa93;
      }
    }
  }
  .entry-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    .el-icon-edit {
      background-color: #21aa93;
      border: 0;
      outline: none;
    }
  }
}
</style>
