<template>
	<div class="default-page step-page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title=""
					fixed
					placeholder
			></van-nav-bar>
		</header>
		<section>
			<div class="panel padding">
				<div class="panel-hd">
					<div class="card">
						<div class="card-hd">
							<p>{{$t('str.success')}}</p>
						</div>
						<div class="card-bd">
							<div class="product-info">
								<h1 class="title">{{$t('str.unit')}}{{ parseInt(product.price) }}</h1>
								<p class="desc">{{$t('str.auditExpense')}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="panel-bd ">
					<p class="vip-doc-block__title text-center">
						{{$t('str.weWillSend')}}
					</p>
				</div>

			</div>
			<div class="vip-btn-wrap">
				<van-button type="primary" class="vip-btn"
							block @click="toHomePage">{{$t('str.chooseOtherLoanProduct')}}</van-button>
			</div>

		</section>
	</div>
</template>
<script>
	import { getMemberCardList } from '@/api/order';
	export default {
		data(){
			return {
				product: {
					price : 0,
				},
			}
		},
		mounted(){
			this.getMemberCardList();
			this.$store.dispatch('user/getInfo');
		},
		computed: {
			isShowHeader() {
				const route = this.$route
				const { meta } = route
				return meta.showHeader
			},
			defaultProduct () {
				return this.$store.getters.product
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			},

			getMemberCardList(){
				getMemberCardList().then((res)=>{
					const list = res.data || [];
					if(list.length>0){
						let defaultProduct = this.defaultProduct;
						this.product = defaultProduct || list[0];
					}
				});
			},

			toHomePage(){
				this.$router.push({name:'home'});
			},

		}
	}
</script>
<style lang="scss" scoped>
	.panel{
		.panel-hd{
			.card{
				width: 100%;
				margin-bottom: 30px;
			}
			.product-info {
				margin-bottom: 0;
			}
		}
		.panel-bd{
			.van-radio-group{
				border-radius: 12px;
				overflow: hidden;
			}
		}
	}
</style>