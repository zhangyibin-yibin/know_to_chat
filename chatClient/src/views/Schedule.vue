<template>
  <div class="schedule-page">
    <div class="schedule-top">
      <div class="back" @click='back()'>
        <svg t="1636510887671" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2416" width="35" height="35"><path d="M475.591 300.373V175.218c-11.378-52.338-54.613-20.48-54.613-20.48L120.604 411.876c-65.99 45.51-4.55 79.644-4.55 79.644l295.822 254.862c59.164 43.236 63.715-22.755 63.715-22.755V607.573c300.373-93.297 423.253 279.894 423.253 279.894 11.378 20.48 18.205 0 18.205 0C1033.102 327.68 475.59 300.373 475.59 300.373z" p-id="2417" fill="#555555"></path></svg>
      </div>
      <div class="schedule-title">
        <p>日程管理</p>
      </div>
      <div class="tip">
        <div class="tip-icon tip-danger">紧急事项</div>
        <div class="tip-icon tip-warning">重要事项</div>
        <div class="tip-icon tip-normal">一般事项</div>
        <div class="tip-icon tip-info">不重要事项</div>
      </div>
    </div>
    <full-calendar
      class="calendar"
      ref="calendar"
      :events="events"
      locale="zh-cn"
      lang="zh"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick" 
    >
     
      <template slot="fc-event-card" slot-scope="p">
        {{p}}
      </template>
    </full-calendar>
    <el-dialog
      title="请输入待办事项"
      :visible.sync="showAddEvent"
      width="35%"
      center>
      <el-form :model="eventForm" :rules="rules" ref="eventForm" label-width="100px">
        <el-form-item label="事项名称" prop="title" required>
          <el-input v-model="eventForm.title"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="start" required>
          <el-date-picker type="date" placeholder="选择日期" v-model="eventForm.start" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="eventForm.end"
            :picker-options="endOptions"
            style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="事项级别" class="matter-level">
          <el-tag
            class="item"
            v-for="item in matterLevels"
            :key="item.label"
            :type="item.type"
            :effect="eventForm.cssClass === item.type ? 'dark' : 'plain'"
            @click="handleClick(item.type)"
          >
            {{ item.label }}
          </el-tag>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canceAddEvent">取 消</el-button>
        <el-button type="primary" @click="addEvent('eventForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fromatTime } from "@/utils";
export default {
  data() {
    return {
      events: [],
      showAddEvent: false,
      eventForm: {
        title: "",
        start: "",
        end: "",
        cssClass: "normal"
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        start: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      matterLevels: [
        { type: "danger", label: "紧急事项" },
        { type: "warning", label: "重要事项" },
        { type: "normal", label: "一般事项" },
        { type: "info", label: "不重要事项" }
      ]
    };
  },
  computed: {
    endOptions() {
      const that = this;
      return {
        disabledDate(time) {
          return time.getTime() < new Date(that.eventForm.start).getTime();
        }
      };
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    addEvent(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const item = { ...this.eventForm };
          this.events = [...this.events, item];
          this.showAddEvent = false;
          this.eventForm.title = this.eventForm.start = this.eventForm.end = "";
          window.localStorage.setItem("todo", JSON.stringify(this.events));
        } else {
          this.showAddEvent = true;
        }
      });
    },
    canceAddEvent() {
      this.title = this.start = this.end = "";
      this.showAddEvent = false;
    },
    changeMonth(e) {
      console.log("changeMonth", e);
    },
    eventClick(e) {
      console.log("eventClick", e);
    },
    dayClick(e) {
      this.eventForm.start = e;
      this.showAddEvent = true;
    },
    moreClick(e) {
      console.log("moreClick", e);
    },
    handleClick(type) {
      this.eventForm.cssClass = type;
    }
  },
  created() {
    const accept = JSON.parse(window.localStorage.getItem("accept"));
    if (!accept) {
      this.$confirm("你的代办日程保存在本地，并不会同步到后端", "提示", {
        confirmButtonText: "我已了解并使用",
        cancelButtonText: "我不接受使用",
        type: "warning"
      })
        .then(() => {
          window.localStorage.setItem("accept", true);
          const events = JSON.parse(window.localStorage.getItem("todo"));
        })
        .catch(() => {
          this.$router.go(-1);
          window.localStorage.setItem("accept", false);
        });
    }
    const events = JSON.parse(window.localStorage.getItem("todo")) || [];
    this.events = events;
  }
};
</script>

<style lang="scss">
.schedule-page {
  position: relative;
  height: 120%;
  width: 70%;
  min-width: 1000px;
  padding: 20px;
  margin: 10px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  background-color: #f3f2ef;
  border-radius: 30px;
  // padding-top: 100px;
  .calendar {
    width: 100% !important;
    max-width: 1200px;
    margin-top: 20px;
  }

  .schedule-top {
    display: flex;
    justify-content: space-around;
    .back {
      // position: absolute;
      top: 30px;
      left: 50px;
      cursor: pointer;
    }
    .tip {
      .tip-icon {
        height: 30px;
        position: relative;
        &::before {
          content: "";
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #ffffff;
          position: absolute;
          top: 2px;
          left: -30px;
        }
      }
      .tip-danger::before {
        background-color: #f56c6c;
      }
      .tip-warning::before {
        background-color: #e6a23c;
      }
      .tip-normal::before {
        background-color: #21aa93;
      }
      .tip-info::before {
        background-color: #909399;
      }
    }
  }
  .schedule-title {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    width: 80%;
  }
  .danger {
    background-color: #f56c6c !important;
    color: #ffffff !important;
  }
  .warning {
    background-color: #e6a23c !important;
    color: #ffffff !important;
  }
  .normal {
    background-color: #21aa93 !important;
    color: #ffffff !important;
  }
  .info {
    background-color: #909399;
    color: #ffffff !important;
  }
  .el-dialog__body {
    .matter-level {
      .item {
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
}
</style>
