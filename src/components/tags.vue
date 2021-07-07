<template>
  <div id="tags-view-container" ref="tags" class="tags-view-container">
    <span
      v-for="(tag,i) in visitedViews"
      ref="tag"
      :key="tag.id"
      :class="isActive(tag,i) ? 'active' : ''"
      class="tags-view-item"
      @click="isAffix(tag)"
    >
      <!-- @contextmenu.prevent.native="openMenu(tag, $event)" -->
      <div style="transform: skew(20deg)">
        {{ tag.name }}
      </div>
      <!-- <span
        v-if="!isAffix(tag)"
        style="transform: skew(20deg)"
        @click.prevent.stop="closeSelectedTag(tag)"
      >X</span> -->
      <span v-if="isActive(tag,i)" class="right-deg"></span>
    </span>
  </div>
</template>

<script>
let _this;
window.onresize = function () {
  _this.openMore();
};
export default {
  name: "TagsView",
  data() {
    return {
      visible: false,
      moreList: [],
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      showMore: false,
      activeTag:{},
      visitedViews:[
        {name:'tab1',key:1},
        {name:'tab2',key:2},
        {name:'tab3',key:3},
        {name:'tab4',key:4},
        {name:'tab5',key:5},
        {name:'tab6',key:6},
        {name:'tab7',key:7},
        {name:'tab8',key:8},
        {name:'tab9',key:9},
        {name:'tab10',key:10},
        {name:'tab11',key:11},
        {name:'tab12',key:12},
        {name:'tab13',key:13},
        {name:'tab14',key:14},
        {name:'tab15',key:15},
        {name:'tab16',key:16},
        {name:'tab17',key:17},
        {name:'tab18',key:18},
        {name:'tab19',key:19},
        {name:'tab21',key:21},
        {name:'tab22',key:22},
        {name:'tab23',key:23},
        {name:'tab24',key:24},
        {name:'tab25',key:25},
        {name:'tab26',key:26},
        {name:'tab27',key:27},
      ]
    };
  },
  computed: {
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },

    vLength(v, a) {
      if (v > a) {
        this.$emit("goRight", this.$refs.tags.offsetWidth);
      }
    },
  },
  created() {
    _this = this;
    this.openMore();
  },
  mounted() {
    // this.addTags();
  },
  methods: {
    isEllipsis(dom) {
      let flag = false;
      if (dom.scrollWidth != undefined) {
        flag = dom.scrollWidth > dom.offsetWidth;
      }
      return flag;
    },
    openMore() {
      this.$emit("getShowTag", this.isEllipsis(this.$refs.tags));
    },
    isActive(route,i) {
      return route.name === this.activeTag.name;
    },
    isAffix(tag) {
      this.activeTag = tag;
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        // this.$store.dispatch("tagsView/addView", this.$route);
      }
      return false;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("tagsView/updateVisitedView", this.$route);
            }
            break;
          }
        }
      });
    },
    refreshSelectedTag(view) {
      this.$store.dispatch("tagsView/delCachedView", view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect" + fullPath,
          });
        });
      });
    },
    closeSelectedTag(view) {
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store
        .dispatch("tagsView/delOthersViews", this.selectedTag)
        .then(() => {
          this.moveToCurrentTag();
        });
    },
    closeAllTags(view) {
      this.$store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
        if (this.affixTags.some((tag) => tag.path === view.path)) {
          return;
        }
        this.toLastView(visitedViews, view);
      });
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Dashboard") {
          // to reload home page
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/");
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      const offsetWidth = this.$el.offsetWidth;
      const maxLeft = offsetWidth - menuMinWidth;
      const left = e.clientX - offsetLeft;

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY - 35;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    handleScroll() {
      this.closeMenu();
    },
  },
};
</script>
<style lang="">
</style>
<style lang="scss" scoped>
.tags-view-container {
  white-space: nowrap;
  .tags-view-item {
    margin: 0 2px 0 0;
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    left: 7px;
    // border: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
    color: #9a9a9a;
    background: #f0f0f0;
    padding: 0 32px 0 16px;
    font-size: 14px;
    transform: skew(-20deg);
    border-bottom: none;
    z-index: 1;
    &.active {
      background-color: #fafafa;
      color: #00469c;
      font-weight: 600;
      border-right: none;
      z-index: 10;
    }
    .right-deg {
      background-color: #fafafa;
      position: absolute;
      transform: skew(35deg);
      height: 30px;
      width: 30px;
      top: 0;
      right: -11px;
      z-index: -1;
    }
    .el-icon-close {
      position: absolute;
      top: 8px;
      right: 16px;
      color: #98aac3;
      width: 8px;
      height: 8px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
