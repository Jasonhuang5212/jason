<template>
	<div class="default-page page">
		<section class="msg-success">
			<div class="pay-msg">
				<div class="pay-msg__icon-area">
					<van-icon style="font-size: 2.8rem;" class="pay-icon_msg pay-icon-success" name="clock" />
				</div>
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
				<div class="pay-msg__opr-area">
					<div class="vip-btn-wrap">
						<van-button type="primary" class="vip-btn" block @click="toLastPage">{{$t('str.next')}}</van-button>
					</div>
				</div>

			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: "step04",
		data(){
			return {

			}
		},
		computed: {
			order () {
				return this.$store.getters.order
			}
		},
		methods: {
			toLastPage(){
				this.toVipPage();
			},
			toVipPage(){
				this.$router.push({name:'vip'});
			},
		}
	}
</script>
