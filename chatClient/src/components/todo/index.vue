<template>
  <div class="todo-cmp" @click="goSchedule" title="前往日程">
    <i class="el-icon-circle-check" style="fontSize: 20px"></i>
    <span class="text" @click="findTodayTodo()">日程管理</span>
  </div>
</template>

<script>
import { fromatTime, formatting } from "@/utils";
export default {
  data() {
    return {
      todos: []
    };
  },
  methods: {
    goSchedule() {
      this.$router.push({ path: "/chat/schedule" });
    },
    findTodayTodo() {
      const allTodos = JSON.parse(window.localStorage.getItem("todo")) || [];
      console.log(allTodos);
      const todayTodos = allTodos
        .map(item => {
          if (!item.end || new Date(item.end) === new Date(item.start)) {
            if (
              formatting(new Date(item.start), false) ===
              formatting(new Date(), false)
            ) {
              item.start = formatting(new Date(item.start), false);
              item.end
                ? (item.end = formatting(new Date(item.end), false))
                : "";
              return item;
            }
          } else if (new Date(item.end) > new Date(item.start)) {
            if (
              formatting(new Date(item.start), false) <=
                formatting(new Date(), false) &&
              formatting(new Date(item.end), false) >=
                formatting(new Date(), false)
            ) {
              item.start = formatting(new Date(item.start), false);
              item.end = formatting(new Date(item.end), false);
              return item;
            }
          }
        })
        .filter(item => item);
      this.todos = todayTodos;
    }
  },
  mounted() {
    this.findTodayTodo();
  }
};
</script>

<style lang="scss">
@import "./../../../static/css/var.scss";
.todo-cmp {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: $secondarybg;
  // background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  color: $primaryfont;
  cursor: pointer;
  .text {
    margin-left: 5px;
  }
}
</style>
