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
							<p>{{ product.title }}</p>
						</div>
						<div class="card-bd">
							<div class="product-info">
								<h1 class="title">{{$t('str.unit')+' '+ parseInt(product.price) }}</h1>
								<p class="desc">{{ product.description }}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="panel-bd ">
					<h2 class="vip__title">{{$t('str.selectPaymentOption')}}</h2>
					<van-radio-group v-model="paymentOptionId">
						<van-cell-group v-for="item in list" :key="item.id">
							<van-cell v-if="!item.disabled"
									  :title="item.title"
									  :label="item.description"
									  center
									  clickable
									  @click="paymentOptionId = item.id">
								<template #right-icon>
									<van-radio :name="item.id" checked-color="#ff9933"/>
								</template>
							</van-cell>
						</van-cell-group>
					</van-radio-group>
				</div>

			</div>
			<div class="vip-btn-wrap">
				<van-button type="primary" class="vip-btn"
							:disabled="isSubmitting"
							:loading="isSubmitting"
							:loading-text="$t('str.submitting')"
							block @click="submitOrder">{{$t('str.continue')}}</van-button>
			</div>

		</section>
	</div>
</template>
<script>
	import { getPaymentChannelList, submitOrders } from '@/api/order'
	import { Toast } from 'vant';
	export default {
		data(){
			return {
				list: [],
				paymentOptionId: '',
				isSubmitting: false,
			}
		},
		mounted(){
			this.getPaymentChannelList();
		},
		computed: {
			isShowHeader() {
				const route = this.$route
				const { meta } = route
				return meta.showHeader
			},
			product () {
				return this.$store.getters.product
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			},
			getPaymentChannelList(){
				getPaymentChannelList().then((res)=>{
					this.list = res.data || [];
				});
			},
			setPaymentOption(){
				const paymentOption = this.getPaymentOptionById(this.paymentOptionId);
				this.$store.dispatch('product/setPaymentOptionInfo',paymentOption);
				this.submitOrder();
			},
			getPaymentOptionById(id){
				const arr = this.list.filter((item)=>{
					return id == item.id;
				});
				return arr[0];
			},
			submitOrder(){
				let paymentOptionId = this.paymentOptionId;
				if(!paymentOptionId){
					Toast('Please Select Payment Option');
					return false;
				}
				const params = {
					payment_channel_id: this.paymentOptionId,//支付通道
					member_card_id: this.product.id,//支付产品ID
				};
				if(this.isSubmitting){
					return false;
				}
				this.isSubmitting = true;
				submitOrders(params).then((res)=>{
					this.isSubmitting = false;
					this.$store.dispatch('product/setOrderInfo',res.data);
					this.toStep02Page();
				}).catch(()=>{
					this.isSubmitting = false;
				});
			},

			toStep02Page(){
				this.$router.push({name:'step02'});
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