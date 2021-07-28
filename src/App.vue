<template>
  <div id="app">
    <div class="commentBox">
      <p class="commentTitleBox">
        <span>评价({{ commentList.length }})</span>
        <span @click="open">查看全部 ></span>
      </p>

      <div
        class="commentDetailBox"
        id="commentDetailBox"
        :class="{ commentHight: flag }"
      >
        <div
          class="commentDetail"
          v-for="(item, idx) in commentData"
          :key="idx"
        >
          <p class="headImgText">
            <span class="headImg">
              <img :src="item.headImg" alt="" />
            </span>
            <span class="userName" v-text="item.username"></span>
          </p>
          <p class="content" v-text="item.commentContent"></p>
          <p class="pic">
            <img :src="item.commentImg" alt="" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      commentData: [],
      flag: false,
      page: 0,
      number: 10,
      commentList: [],
      target1: 0,
      target2:2430,
    };
  },
  created() {
    this.ev_getCommentData();
  },
  methods: {
    ev_getCommentData() {
      this.axios
        .get("/getCommentData")
        .then((res) => {
          this.commentList = res.data;
          // let commentListData = res.data
          this.commentData = this.commentList.slice(this.page, this.number);
        })
        .catch((err) => {
          console.log(err);
        });
        let that = this
      window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop;
        that.target1 = scrollTop;
        // console.log(scrollTop);
        if (that.target1 >that.target2) {
          that.target2 = that.target2+2430;
          console.log(that.target2)
          that.ev_commentOnLoad();
        }
      };

      console.log(this.target1);
    },
    open() {
      this.flag = !this.flag;
    },
    ev_commentOnLoad() {
      this.page = this.page + 11;
      this.number = this.number + 10;
      let dataList = this.commentList.slice(this.page, this.number);
      for (var i = 0; i < dataList.length; i++) {
        this.commentData.push(dataList[i]);
      }
    },
  },
};
</script>

<style src="./assets/css/commentModule.css" scoped></style>