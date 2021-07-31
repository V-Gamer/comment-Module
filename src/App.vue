<template>
  <div id="app">
    <!-- <div class="commentBox" ref="commentBoxScroll" @scroll="scroll1" @mousewheel="scroll"> -->
    <div class="commentBox" ref="commentBoxScroll" @scroll="scroll">
      <div class="box" ref="box"></div>
      <div class="commentDetailBox" ref="commentDetailBox">
        <div
          class="commentDetail"
          v-for="(item, idx) in commentData"
          :key="idx"
        >
          <div>
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
          <div>
            <input type="text" v-model="item.num">
          </div>
          <div @click="del(item)" class="del">X</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
export default {
  name: "App",
  components: {},
  data() {
    return {
      // 用来保存切片后的数据
      commentData: [],
      // 用来保存请求的数据
      commentList: [],
      // 用来存储commentBox下子节点的下标
      idx: 0,
      // 用来记录调用了几次
      heiValue: 0,
      scrollH: 0,
      lastScrollH: 0,
    };
  },
  created() {
    this.ev_getCommentData();
  },
  methods: {
    async ev_getCommentData() {
      // 请求数据
      let { data } = await this.axios("/getCommentData");
      this.commentList = data;

      let child = this.$refs.commentDetailBox.children;

      // 当chlid的长度为0 此时commentDetailBox下没有节点
      if (child.length == 0) {
        this.ev_getListData(0);
      }
    },

    // 此处的idx 是commentDetailBox下的子节点的下标
    ev_getListData() {
      this.commentData = this.commentList.slice(this.idx, this.idx + 4);
      if (this.scrollH < this.lastScrollH && this.idx >= 0) {
        this.idx = this.idx - 1;
      } else if (this.scrollH > this.lastScrollH) {
        this.idx = this.idx + 1;
      }
      if (this.idx <= 0) {
        this.idx = 0;
      }
    },

    // commentDetailBox高度的增加和减少
    ev_changeHeight(heightValue) {
      let comDetailBox = this.$refs.commentDetailBox;
      let box = this.$refs.box;

      // 上滚的情况
      // if (this.scrollH < this.lastScrollH) {
      //   box.style.height = heightValue + "px";
      // } else {
      // 下滚的情况判断
      // 若box的高度为0 则滚动时不添加78px
      if (heightValue == 0) {
        box.style.height = heightValue + "px";
      } else {
        box.style.height = heightValue + "px";
      }
      comDetailBox.style.height = 178000 - (heightValue + 197) + "px";
      // }
    },

    // 监听div下的滚动距离
    scroll() {
      console.log("idx", this.idx);
      let scrolled1 = this.$refs.commentBoxScroll.scrollTop;
      let scrolled = Math.floor(this.$refs.commentBoxScroll.scrollTop);
      console.log("scrollValue", scrolled);
      this.scrollH = scrolled1;
      this.idx = Math.floor(scrolled / 197);

      console.log("this", this.scrollH);
      console.log("last", this.lastScrollH);

      // 判断下标
      if (this.idx >= 996) {
        this.idx = 997;
      }

      // 获取commentDetailBox下的子节点
      let child = this.$refs.commentDetailBox.children;
      console.log(child);

      // 调用函数
      this.ev_getListData();
      this.ev_changeHeight(scrolled1);
      this.lastScrollH = this.scrollH;
    },
    del(obj){
      console.log(obj.id)
      obj.flag = !obj.flag;
      // let idx = obj.id;
      const list  =  this.commentList.filter ( obj => obj.flag) 
      this.commentList = list;
      console.log(this.commentList)
      this.ev_getListData();
    },
  },
};
</script>

<style src="./assets/css/commentModule.css" scoped></style>