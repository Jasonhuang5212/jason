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
							color="#82ccdd"
							layer-color="#eee"
							size="240px"
					>
						<van-count-down class="flex-1"
										ref="countDown"
										:time="time"
										auto-start
										@change="setCircleRate"
										format="ss"></van-count-down>
					</van-circle>
				</div>
				<!--<div class="pay-msg__tips-area">
					<p class="pay-msg__tips">
						{{$t('str.checkingPaymentStatus')}}
					</p>
				</div>-->
				<div class="pay-msg__text-area" style="padding: 0 0.3rem;">
					<h2 class="pay-msg__title">{{$t('str.waitingForYourPayment')}}</h2>
					<p class="pay-msg__desc text-left">
						<van-cell-group>
							<van-cell :title="$t('str.amount')" :value="$t('str.unit')+order.amount" />
							<van-cell :title="$t('str.bankCode')" :value="order.bank_code" />
							<van-cell :title="$t('str.accountNo')" :value="order.account_no" />
							<van-cell :title="$t('str.accountName')" :value="order.account_name" />
						</van-cell-group>
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
					<h2 class="pay-msg__title">{{$t('str.paymentIsSuccessful')}}</h2>
					<p class="pay-msg__desc"></p>
				</div>
				<div class="pay-msg__opr-area">
					<div class="vip-btn-wrap">
						<van-button type="primary" class="vip-btn" block @click="toEndPage">{{$t('str.next')}}</van-button>
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
					<h2 class="pay-msg__title">{{$t('str.paymentIsFailed')}}</h2>
				</div>

				<div class="pay-msg__opr-area">
					<div class="vip-btn-wrap">
						<van-button type="default" class="vip-btn" block  @click="toLastPage">{{$t('str.back')}}</van-button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import { queryOrderPayStatus,queryOrderPayAccount } from '@/api/order'
	export default {
		data(){
			return {
				pageShow: 1,//[1,2,3]

				time: 300 * 1000,
				rate: 100,
				currentRate: 0,
				payStatus: 40003,
				payStatusTxt: this.$t('str.checkingPaymentStatus'),
				seconds: 300,
				orderAccount: null,//支付账户信息
			}
		},
		mounted(){
			this.getOrderPayAccount();
		},
		computed: {
			order () {
				if(this.orderAccount){
					return this.orderAccount;
				}else {
					return this.$store.getters.order
				}
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			},
			getOrderPayAccount(){
				queryOrderPayAccount().then(res=>{
					let data = res.data;
					this.orderAccount = data;
				})
			},
			setCircleRate(timeData){

				this.seconds = timeData.minutes*60 + timeData.seconds;
				this.rate = (300-this.seconds)/300*100;
				if((this.payStatus==40003||this.payStatus==40004) && (timeData.seconds%5)==0){
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
							try {
								Adjust.trackEvent(paySuccessEvent);
							}catch (e) {
								
							}


							setTimeout(()=>{
								this.toEndPage();
							},1000);
							break;
						case 40002://支付失败
							this.$refs.countDown.pause();
							this.payStatusTxt = res.data.message;
							this.payStatus = data.status;
							this.pageShow = 3;
							try {
								Adjust.trackEvent(payFailEvent);
							}catch (e) {
								
							}
							

							break;
						case 40004://待付款
						case 40003://处理中
							if(this.seconds==0){
								this.$refs.countDown.reset();
							}
							this.payStatus = data.status;
							this.pageShow = 1;
							break;
						/*case 40004://待付款
							this.payStatusTxt = res.data.message;
							this.payStatus = data.status;
							this.pageShow = 3;
							break;*/
						default://其他失败场景
							this.payStatusTxt = res.data.message;
							this.payStatus = data.status;
							this.pageShow = 3;
							break;
					}

				}).catch(()=>{
					this.pageShow = 3;
				});
			},

			toEndPage(){
				this.$router.push({name:'end'});
			},
			toVipPage(){
				this.$router.push({name:'vip'});
			},
			toLastPage(){
				switch (this.payStatus) {
					case 40002://支付失败
						this.toVipPage();
						break;
					case 40004://待付款
						this.toVipPage();
						break;
					default://其他失败场景
						this.toVipPage();
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