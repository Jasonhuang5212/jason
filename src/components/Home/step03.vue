<template>
	<div class="default-page status-page page">
		<section class="msg-waiting" v-if="pageShow==1">
			<div class="pay-msg">
				<div class="pay-msg__icon-area">

					<van-circle
							class="flex"
							ref="circle"
							v-model="currentRate"
							:rate="rate"
							:speed="100"
							:stroke-width="60"
							color="#ffb936"
							layer-color="#eee"
							size="240px"
					>
						<van-count-down class="flex-1"
										ref="countDown"
										:time="time"
										@change="setCircleRate"
										format="ss"></van-count-down>
					</van-circle>
				</div>
				<div class="pay-msg__tips-area">
					<p class="pay-msg__tips">
						Checking payment status...
					</p>
				</div>
			</div>
		</section>
		<section class="msg-success" v-if="pageShow==2">
			<div class="pay-msg">
				<div class="pay-msg__icon-area">
					<van-icon class="pay-icon_msg pay-icon-success" name="checked" />
				</div>
				<div class="pay-msg__text-area">
					<h2 class="pay-msg__title">Payment is successful</h2>
					<p class="pay-msg__desc"></p>
				</div>
				<div class="pay-msg__opr-area">
					<div class="vip-btn-wrap">
						<van-button type="primary" class="vip-btn" block @click="toHomePage">Close</van-button>
					</div>
				</div>

			</div>
		</section>
		<section class="msg-warn" v-if="pageShow==3">
			<div class="pay-msg">
				<div class="pay-msg__icon-area">
					<van-icon class="pay-icon_msg pay-icon-fail" name="warning" />
				</div>
				<div class="pay-msg__text-area">
					<h2 class="pay-msg__title">Payment is failed</h2>
				</div>

				<div class="pay-msg__opr-area">
					<div class="vip-btn-wrap">
						<van-button type="default" class="vip-btn" block  @click="toLastPage">Back</van-button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import { queryOrderPayStatus } from '@/api/order'
	import { Toast } from 'vant';//
	export default {
		data(){
			return {
				pageShow: 1,//[1,2,3]

				time: 30 * 1000,
				rate: 100,
				currentRate: 0,
				payStatus: 40003,
				payStatusTxt: 'Checking payment status...',
				seconds: 30,
			}
		},
		mounted(){
			this.queryOrderPayStatus();
		},
		computed: {
			order () {
				return this.$store.getters.order
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			},
			setCircleRate(timeData){
				this.seconds = timeData.seconds;
				this.rate = (30-timeData.seconds)/30*100;
				if(this.payStatus==40003 && (timeData.seconds%5)==0){
					this.queryOrderPayStatus();
				}
			},
			queryOrderPayStatus(){
				let order_id = this.order.order_id;
				queryOrderPayStatus(order_id).then((res)=>{
					const { data } = res;

					switch (data.status) {
						case 40001://支付成功
							this.$refs.countDown.pause();
							this.payStatusTxt = res.data.message;
							this.payStatus = data.status;
							this.pageShow = 2;
							break;
						case 40002://支付失败
							this.$refs.countDown.pause();
							this.payStatusTxt = res.data.message;
							this.payStatus = data.status;
							this.pageShow = 3;
							break;
						case 40003://处理中
							if(this.seconds==0){
								this.$refs.countDown.reset();
							}
							this.payStatus = data.status;
							this.pageShow = 1;
							break;
						case 40004://待付款
							this.payStatusTxt = res.data.message;
							this.payStatus = data.status;
							this.pageShow = 3;
							break;
						default://其他失败场景
							this.payStatusTxt = res.data.message;
							this.payStatus = data.status;
							this.pageShow = 3;
							break;
					}

				});
			},

			toHomePage(){
				this.$router.go(-3);
			},
			toLastPage(){
				switch (this.payStatus) {
					case 40002://支付失败
						this.$router.go(-3);
						break;
					case 40004://待付款
						this.$router.go(-1);
						break;
					default://其他失败场景
						this.$router.go(-3);
						break;

				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.van-circle{
		margin: 0 auto;
	}
	.van-count-down {
		font-size: 46PX;
	}
</style>