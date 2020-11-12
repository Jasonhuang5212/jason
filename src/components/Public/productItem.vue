<template>
	<div class="product-item flex" @click="apply(item.id)">
		<div class="item-hd">
			<!--<img :src="item.product_picture_url_qiniu">-->
			<van-image :src="item.product_picture_url_qiniu" width="1.5rem" height="1.5rem" lazy-load>
				<template v-slot:loading>
					<van-loading type="spinner" size="20" />
				</template>
				<template v-slot:error><van-icon name="photo-o" /></template>
			</van-image>
		</div>
		<div class="item-bd flex-1">
			<p class="title">{{ item.product_name }}</p>
			<p class="desc">Max Amount(अधिकतम राशि): {{ item.amount_high }}</p>
			<p class="desc">Tenure(कार्यकाल): {{ item.divide_period_min + '-' + item.divide_period_max }} Months(महीने)</p>
			<p class="desc">Interest(ब्याज): {{ [item.daily_min_rate,item.daily_max_rate].join('~') }}/Daily(दिन)</p>
			<p class="desc">Loan processing time(ऋण प्रसंस्करण समय): {{ item.issue_loan_at || 0 }}</p>
			<div v-if="item.tag_des"><van-tag type="dc" plain>{{item.tag_des}}</van-tag></div>
		</div>
		<div class="item-ft">
			<!--<van-icon name="arrow" color="#969799" />-->
			<van-button size="small" type="primary" class="vip-btn">Apply<br/>आवेदन</van-button>
		</div>
	</div>
</template>
<script>
	import { recordOP } from '@/api/user'
	export default {
		props:{
			item: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data(){
			return {

			}
		},
		methods:{
			apply(id){

				let phoneNumber = this.$store.getters.phoneNumber;
				if(phoneNumber){
					recordOP({
						operation_type: '2',//1-产品申请, 2-产品点击, 4-banner广告点击（轮播图）
						product_id: id,//产品ID
						extra_id: id,//操作类型对应的对象id(如操作是点击产品，此处对应的是产品id，操作的是点击信用卡，此处对应的是信用卡id)
						phone_number: phoneNumber
					}).catch(e=>{

					});
				}



				this.toDetailPage(id);
			},
			toDetailPage(id){
				this.$router.push({name:'detail', query: { id: id }});
			}
		}
	}
</script>