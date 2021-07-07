<template>
  <div class="mt-top-nav">
    <div class="nav-content">
      <div v-if="showMore" class="tabs-arrow" @click="toLeft"></div>
      <div class="option-content" ref="tagsP">
        <TagsView
          @getShowTag="getShowTag"
          @goRight="goRight"
          ref="tagsV"
        ></TagsView>
      </div>
      <!-- <span v-if="showMore" @click="toRight"> > </span> -->
      <div
        v-if="showMore"
        class="tabs-arrow arrow-right"
        @click="toRight"
      ></div>
    </div>
  </div>
</template>

<script>
import TagsView from "./tags.vue";
export default {
  name: "TopNav",
  components: {
    TagsView
  },
  data() {
    return {
      scrollNum: 0,
      openM: true,
      showMore: false,
    };
  },
  methods: {
    goRight(a) {
      if (this.showMore) {
        let distance = this.$refs.tagsP.scrollLeft;
        let scrollNum = this.$refs.tagsP.scrollLeft + a;
        let step = (distance - scrollNum) / 50;
        if (step < 0) step = -step;
        this.moveSlow(distance, scrollNum, step, true);
      }
    },
    toRight() {
      // 往右滚动
      // this.$refs.tagsP.scrollLeft = this.scrollNum;
      let distance = this.$refs.tagsP.scrollLeft;
      let scrollNum = distance + 200;
      let step = (distance - scrollNum) / 50;
      if (step < 0) step = -step;
      this.moveSlow(distance, scrollNum, step, true);
    },
    toLeft() {
      // 左滚动
      let distance = this.$refs.tagsP.scrollLeft;
      let scrollNum = distance - 200;
      if (scrollNum < 0) {
        scrollNum = 0;
      }
      let step = (distance - scrollNum) / 50;
      if (step < 0) step = -step;
      this.moveSlow(distance, scrollNum, step, false);
    },
    moveSlow(distance, total, step, LOR) {
      // 正向滚动 和 反向滚动
      if (LOR) {
        // 每隔1毫秒移动一小段距离，直到移动至目标至为止，反之亦然
        if (distance < total) {
          distance += step;
          this.$refs.tagsP.scrollLeft = distance;
          setTimeout(() => {
            this.moveSlow(distance, total, step, true);
          }, 1);
        } else {
          this.$refs.tagsP.scrollLeft = total;
        }
      } else if (!LOR) {
        if (distance > total) {
          distance -= step;
          this.$refs.tagsP.scrollLeft = distance;
          setTimeout(() => {
            this.moveSlow(distance, total, step, false);
          }, 1);
        } else {
          this.$refs.tagsP.scrollLeft = total;
        }
      }
    },
    getShowTag(a) {
      this.showMore = a;
    }
  }
};
</script>

<style lang="scss" scoped>
.mt-top-nav {
  height: 60px;
  background: #fafafa;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  z-index: 2;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .tabs-arrow {
    // display: none;
    width: 20px;
    height: 30px;
    line-height: 30px;
    position: relative;
    cursor: pointer;
    border-radius: 4px 0 0 0;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 0;
      border-right: 4px solid #6e7a8d;
      left: 8px;
      top: 12px;
    }
    &.arrow-right {
      border-radius: 0 4px 0 0;
      &:after {
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 4px solid #6e7a8d;
        border-right: 0;
      }
    }
  }

  .nav-content {
    display: flex;
    flex: 1;
    background: #f5f5f5;
    align-items: flex-end;
    justify-content: space-between;
    // padding: 0 10px 0 6px;
    .option-content {
      overflow-y: hidden;
      overflow-x: auto;
      width: calc(100vw - 60px);
      min-width: 350px;
      height: calc(100% - 30px);
      &::-webkit-scrollbar {
        display: none;
      }
      &:hover {
        &::-webkit-scrollbar {
          display: block;
        }
      }
    }
  }
}
</style>
