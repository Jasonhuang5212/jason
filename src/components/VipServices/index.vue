<template>
	<div class="vip-page page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title=""
					fixed
					placeholder
			></van-nav-bar>
		</header>
		<section class="home-page-bdoy">
			<productSwiper></productSwiper>
		</section>
	</div>
</template>
<script>

	import productSwiper from '@/components/Public/VipSwiper'
	export default {
		components:{
			productSwiper
		},
		data(){
			return {
			}
		},
		mounted(){
			this.$store.dispatch('user/getInfo')
		},
		computed: {
			isShowHeader() {
				const route = this.$route
				const { meta } = route
				return meta.showHeader
			},
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			}
		}
	}
</script>
<style lang="scss">
	.vip-page{
		background: #fff;
	}
</style>