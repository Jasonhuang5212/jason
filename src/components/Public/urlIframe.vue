<template>
  <div id="urlIframe" class="default-page">
    <header v-if="isShowHeader">
      <van-nav-bar
              :title="title"
              fixed
              left-arrow
              @click-left="onClickLeft"
              placeholder
      ></van-nav-bar>
    </header>
    <iframe frameborder="0" id="external-frame" style="width: 100%;height: 100%" scrolling="auto" :src="path"></iframe>
  </div>
</template>
<script>
  export default {
    name: 'urlIframe',
    data() {
      return {
        path:'',
        title:'',
        iframeHeight:'100%',
      }
    },
    created (){
      let path = this.$route.params.path;
      let title = this.$route.params.title;
      this.path = path;
      this.title = title;
    },
    computed: {
      isShowHeader() {
        const route = this.$route
        const { meta } = route
        return meta.showHeader
      },
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1);
      },
    }
  }
</script>
<style scoped lang="scss">
  #urlIframe {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
</style>
