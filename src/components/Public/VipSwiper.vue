<template>
	<div>
		<div class="card">
			<div class="card-bd">

				<div class="product-info">
					<div class="info-row bottom-line">
						<p class="info-title">{{$t('str.loanAmount')}}({{$t('str.unit')}})</p>
						<div class="info-list">
							<div class="info-item" :class="card.id==item.id?'active':''"
								 v-for="item in cardList" :key="item.id" @click="setLoanItem(item)">
								<span>{{ item.description }}</span>
							</div>
						</div>
					</div>

					<div class="info-row bottom-line">
						<p class="info-title">{{$t('str.term')}} ({{$t('str.day')}})</p>
						<div class="info-list">
							<div class="info-item" :class="period==item.value?'active':''"
								 v-for="item in periodList" :key="item.value" @click="setPeriod(item)">
								<span>{{ item.value }}</span>
							</div>
						</div>
					</div>

					<div class="desc-row small flex bottom-line">
						<div class="flex-1 text-left">{{$t('str.interest')}}</div>
						<div class="bold">{{$t('str.unit')}}{{interest}}</div>
					</div>
					<div class="desc-row small flex bottom-line">
						<div class="flex-1 text-left">
							{{$t('str.repaymentAmount')}}<!--(<span class="small red">-{{$t('str.unit')}}{{auditFee}}</span>)-->
						</div>
						<div class="bold">{{$t('str.unit')}}{{repayment}}</div>
					</div>
					<div class="desc-row small flex">
						<div class="flex-1 text-left">{{$t('str.loanTerm')}}</div>
						<div class="bold">{{period}} {{$t('str.days')}}</div>
					</div>
				</div>
			</div>
			<div class="card-ft">

				<div class="vip-btn-wrap">
					<van-button type="primary" class="vip-btn"
								:disabled="isSubmitting"
								:loading="isSubmitting"
								loading-text="Đệ trình..."
								@click="onSubmitOrder"
								block
					>
						<div class="flex count-down">
							<van-icon name="underway-o" />
							<van-count-down millisecond ref="countDown" :time="countDownTime" :auto-start="false" format="HH:mm:ss:SS" />
						</div>
						<p>{{$t('str.immediateWithdrawal')}}</p>
					</van-button>
				</div>
				<div class="vip-btn-wrap" style="margin-top: 15px;" v-if="userInfo.is_member">
					<van-button type="default"
								block
								@click="toHomePage()">
						{{$t('str.chooseOtherLoanProduct')}}
					</van-button>
				</div>

				<div class="warn-tips">
					<div class="tips-hd">
						<span class="title">{{$t('str.warning')}}:  </span><van-icon name="warning-o" />
					</div>
					<div class="tips-bd">
						<div class="tip-item bottom-line">
							<p>① {{$t('str.warningTips1')}} {{$t('str.unit')}}{{auditFee}}</p>
						</div>
						<div class="tip-item bottom-line">
							<p>② {{$t('str.warningTips2')}}</p>
						</div>
						<div class="tip-item bottom-line">
							<p>③ {{$t('str.warningTips3')}}</p>
							<p class="tip-desc">• {{$t('str.warningTips4')}}</p>
							<p class="tip-desc">• {{$t('str.warningTips5')}}</p>
							<p class="tip-desc">• {{$t('str.warningTips6')}}</p>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import { getMemberCardList,submitOrdersOddPay,payOrders } from '@/api/order';

	export default {
		data() {
			return {
				cardList: [],
				card: null,
				periodList: [
					//{ value: 7 },
					{ value: 14 },
					{ value: 30 },
					{ value: 60 },
					{ value: 90 },
					//{ value: 180 },
				],
				period: 14,//周期
				//interest: 0,
				//repayment: 0,//还款金额
				//auditFee: 0,//定金
				sold_count: 0,
				countDownTime: 90 * 60 * 1000,//倒计时
				isSubmitting: false,
			}
		},
		computed: {
			appVersionId () {
				return this.$store.getters.appVersionId
			},
			userInfo(){
				return this.$store.getters.info
			},
			//利息
			interest(){

				let interest = 0;
				//利息的计算方式 额度*周期/1000

				if(this.card){
					let amount = +this.card.description;
					let period = this.period;
					interest = amount * period / 500;
				}

				return interest;
			},
			//定金
			auditFee(){
				let auditFee = 0;
				if(this.card){
					auditFee = +this.card.price;
				}
				return auditFee;
			},
			//还款金额
			repayment(){
				let repayment = 0;
				if(this.card){
					let amount = +this.card.description;
					repayment = amount - (+this.interest);
				}
				return repayment;
			},

		},
		mounted() {
			 if(this.userInfo.is_member){//true
			 	this.toEndPage();
			 }else {
				this.getMemberCardList();
			}
		},
		methods: {
			getMemberCardList(){
				getMemberCardList().then((res)=>{
					this.cardList = res.data || [];
					this.card = this.cardList[0];
				});
			},
			setLoanItem(item){
				this.card = item;
				this.setCountdown();
			},
			setPeriod(item){
				this.period = item.value;
			},
			setCountdown(){
				this.$refs.countDown.reset();
				setTimeout(()=>{
					this.$refs.countDown.start();
				},100);
			},
			onSubmitOrder(){
				let productInfo = this.card;
				if(!productInfo){
					return false;
				}
				this.$store.dispatch('product/setProductInfo',productInfo);
				this.submitOrder(productInfo);
			},
			submitOrder(productInfo){

				if(!this.userInfo.name){
					this.toInfoPage();
					return false;
				}

				let return_url = location.href.slice(0,location.href.search('#'))+'#/step03';
				const params = {
					return_url: return_url, //成功后跳转的url
					member_card_id: productInfo.id,//支付产品ID
				};

				if(this.isSubmitting){
					return false;
				}
				this.isSubmitting = true;

				try {
					Adjust.trackEvent(clickPayEvent);
				}catch (e) {

				}


				submitOrdersOddPay(params).then((res)=>{
					const { data } = res;
					//this.isSubmitting = false;
					if(data){
						this.$store.dispatch('product/setOrderInfo',data);
						this.toStep03Page();
					}
					//this.toStep03Page();
				}).catch(()=>{
					this.isSubmitting = false;
				});
			},
			toStep04Page(){
				this.$router.push({name:'step04'});
			},
			toStep03Page(){
				this.$router.push({name:'step03'});
			},
			toHomePage(){
				this.$router.push({name:'home'});
			},
			toInfoPage(){
				this.$router.push({name:'info'});
			},
			toEndPage(){
				this.$router.replace({name:'end'});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.product-swiper{
		margin-top: 0;
	}
	.card{
		border-radius: 0;
		width: 100%;
		padding: 20px 30px;
		background: linear-gradient(180deg, $primary 0%, $primary 30%, rgba(255, 255, 255, 1) 30% );
		.card-bd{
			padding: 0 30px;
			color: #333;
			text-align: left;
		}
	}
	.card-hd{
		.tips-title{
			line-height: 1;
			font-size: 29PX;
			font-weight: 500;
			margin-bottom: 20px;
		}
		.tips-desc{
			line-height: 1;
			font-size: 16PX;
		}
		.heading{
			color: #fff;
			font-size: 20PX;
			line-height: 1;
			margin-top: 38px;
			.title{
				font-size: 32PX;
				line-height: 1;
				margin-top: 30px;
				margin-bottom: 10px;
			}
		}
	}
	.card-ft{
		margin-top: 60px;
	}

	.product-info{
		margin: 20px 0 0 0;

		.info-row{
			padding-bottom: 10px;
		}
		.info-title{
			text-align: left;
			font-size: 15PX;
			padding: 14px 0;
		}
		.info-list{

		}
		.info-item{

			background: #eee;
			padding: 12px 32px;
			border-radius: 50px;

			display: -webkit-inline-box;
			display: -webkit-inline-flex;
			display: inline-flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			justify-content: center;
			min-width: 100px;
			margin: 0 24px 24px 0;
			font-size: 13PX;
			line-height: 1.2;
			vertical-align: middle;

			&.active{
				background: $primary;
				color: #fff;
			}
		}

		.desc-row{
			font-size: 15PX;
			padding: 10px 0 10px 0;

		}
	}
	.warn-tips{
		color: #333;
		font-size: 15PX;
		margin: 40px 0 160px 0;

		span{
			vertical-align: middle;
		}
		i{
			vertical-align: middle;
			color: $primary;
			font-size: 23PX;
		}
		.tips-hd{
			position: relative;
			padding: 0 0 0 30px;
			&::before{
				content: ' ';
				display: block;
				position: absolute;
				left: 0;
				height: 100%;
				width: 12px;
				background: $primary;
				border-radius: 8px;
			}
		}
		.title{
			font-weight: 700;
		}
		.tip-item{
			padding: 16px 0 16px 30px;
			line-height: 1.4;
			font-size: 13PX;
			.tip-desc{
				padding-left: 40px;
			}
		}

	}
	.count-down{
		justify-content: center;
		color: #fff;
		.van-count-down{
			margin-left: 20px;
			color: #fff;
		}
	}
</style>