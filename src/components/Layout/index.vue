<template>
  <div class="app-frame">
	  <keep-alive>
		  <router-view v-if="$route.meta.keepAlive"/>
	  </keep-alive>
	  <router-view v-if="!$route.meta.keepAlive"/>
      <van-tabbar route v-if="isShowFooter">
          <van-tabbar-item replace to="/home" icon="home-o">
              Cash Wallet
          </van-tabbar-item>
          <van-tabbar-item replace to="/loanall" icon="apps-o">
              Loan All
          </van-tabbar-item>
          <van-tabbar-item replace to="/me" icon="user-circle-o">
              Me
          </van-tabbar-item>
      </van-tabbar>
  </div>
</template>
<script>
	export default {
		data() {
			return {
				isShowFooter: false,
			}
		},
        mounted() {
			//处理URL中的token参数
			//this.handleTokenFromURLParam();
			//this.getUserInfo();
		},
		methods: {
			handleTokenFromURLParam(){
				let token = this.$route.query.token || '';
				this.$store.dispatch('user/setTokenFromURLParam',token)
			},
            getUserInfo(){
				this.$store.dispatch('user/getInfo')
                    .then((data)=>{
					  console.log(data);
                    });
            }
		}
	}
</script>
<style lang="scss" scoped>
  .app-frame{
    .footer {
      position: fixed;
      z-index: 2;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 -1px 1px rgba(213, 213, 214, .5);
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;

      .nav-item {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
        text-align: center;
        margin: 8px 0;
        line-height: 1;
        -webkit-user-select: none;
        user-select: none;

        .icon{
          display: block;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-size: contain;
          width: 50px;
          height: 50px;
          margin: 0 auto;
        }
        .txt {
          color: #999;
          line-height: 1;
          font-size: 20px;
        }
      }

      .on .txt {
        color: $primary;
      }
      .nav-home .icon{
        background-image: url("../../assets/imgs/frame/home-default.png");
      }
      .on .nav-home .icon{
        background-image: url("../../assets/imgs/frame/home-active.png");
      }

      .nav-dq .icon{
        background-image: url("../../assets/imgs/frame/dq-default.png");
      }
      .on .nav-dq .icon{
        background-image: url("../../assets/imgs/frame/dq-active.png");
      }
      .nav-me .icon{
        background-image: url("../../assets/imgs/frame/me-default.png");
      }
      .on .nav-me .icon{
        background-image: url("../../assets/imgs/frame/me-active.png");
      }
    }
  }

</style>
