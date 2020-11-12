<template>
	<div class="default-page step-page">
		<header>
			<van-nav-bar
					title="UPI"
					left-arrow
					left-text="Back"
					fixed
					placeholder
					@click-left="onClickLeft"
			></van-nav-bar>
		</header>
		<section>
			<div class="panel">

				<div class="panel-bd padding" v-if="false">
					<h2 class="vip__title">UPI APPs</h2>
					<div class="upi-app flex flex-wrap">
						<div class="upi-app-item active">
							<img src="@/assets/imgs/icons/googlepay.png"/>
						</div>
						<div class="upi-app-item">
							<img src="@/assets/imgs/icons/paytm.png"/>
						</div>
						<div class="upi-app-item">
							<img src="@/assets/imgs/icons/phonepe.png"/>
						</div>
						<div class="upi-app-item">
							<img src="@/assets/imgs/icons/bhim.png"/>
						</div>
						<div class="upi-app-item">
							<img src="@/assets/imgs/icons/other.png"/>
						</div>
					</div>
				</div>
				<div class="panel-bd padding">
					<h2 class="vip__title">UPI ID</h2>
					<div class="text-area">
						<van-cell-group>
							<van-field v-model="upiId" placeholder="Please enter your UPI ID" />
						</van-cell-group>
					</div>

				</div>

			</div>
			<div class="vip-btn-wrap">
				<van-button type="primary" class="vip-btn"
							:disabled="isSubmitting"
							:loading="isSubmitting"
							loading-text="Submitting..."
							block @click="veriyfyAndPayByUPIID">Veriyfy & Pay</van-button>
			</div>
		</section>
		<footer>
			<div class="pay-tips">
				<h3>Pay through UPI in 4 steps</h3>
				<p>
					<strong>Step 1:</strong>
					<span>Enter your Virtual Payment Address(VPA) & click on "Verify & Pay",you will be redirected to Waiting page</span>
				</p>
				<p>
					<strong>Step 2:</strong>
					<span>Click on the notification received on your UPI linked mobile app</span>
				</p>
				<p>
					<strong>Step 3:</strong>
					<span>Check pending transactions</span>
				</p>
				<p>
					<strong>Step 4:</strong>
					<span>Complete the payment by approving the transaction and entering MPIN</span>
				</p>
			</div>
		</footer>
	</div>
</template>
<script>
	import { payOrders } from '@/api/order'
	import { Toast } from 'vant';

	export default {
		data(){
			return {
				upiId: '',
				isSubmitting: false,
			}
		},
		mounted(){

		},
		computed: {
			order () {
				return this.$store.getters.order
			},
			paymentOption () {
				return this.$store.getters.paymentOption
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			},
			veriyfyAndPayByUPIID(){
				let upiId = this.upiId;
				if(!upiId){
					Toast('Please enter your UPI ID');
					return false;
				}
				const params = {
					order_id: this.order.order_id,
					upi: upiId,
				};
				if(this.isSubmitting){
					return false;
				}
				this.isSubmitting = true;
				payOrders(params).then((res)=>{
					this.isSubmitting = false;
					this.toStep03Page();
				}).catch(()=>{
					this.isSubmitting = false;
				});
			},
			toStep03Page(){
				this.$router.push({name:'step03'});
			}
		}
	}
</script>
<style lang="scss" scoped>

	.upi-app-item{
		margin-right: 4px;
		margin-bottom: 10px;
	}
	.pay-tips{
		padding: 30PX 16PX;
		line-height: 1.4;
		font-size: 14PX;
		color: rgba(69, 90, 100, 0.6);
		p{
			margin-bottom: 10px;
		}
	}
</style>