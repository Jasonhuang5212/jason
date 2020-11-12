<template>
	<div>
		<swiper class="product-swiper" ref="productSwiper" :options="swiperOptions">
			<swiper-slide v-for="(item,index) in cardList" :key="item.id">
				<div class="card">
					<div class="card-hd">
						<p>{{ item.title }}</p>
					</div>
					<div class="card-bd">
						<div class="product-info">
							<h1 class="title">₹{{ parseInt(item.price) }}</h1>
							<p class="desc">{{ item.description }}</p>
						</div>
						<div class="sales-volume text-center">
							<p class="txt">Number of successful borrowers</p>
							<p class="num">{{ sold_count }}</p>
						</div>
						<div class="vip-btn-wrap">
							<van-button type="primary" class="vip-btn"
										:disabled="item.on_sale!==1"
										block
										@click="selectCurrentItem(item)">Get a membership</van-button>
						</div>
					</div>
				</div>
			</swiper-slide>

		</swiper>
		<div class="swiper-pagination flex" slot="pagination" id="pagination"></div>
	</div>

</template>
<script>
	import { getMemberCardList } from '@/api/order'
	export default {
		name: 'carrousel',
		data() {
			const _self = this;
			return {
				cardList: [],
				sold_count: 0,
				activeItemIndex: 1,
				swiperOptions: {
					// 设置slider容器能够同时显示的slides数量，默认为1， 'auto'则自动根据slides的宽度来设定数量
					slidesPerView: 'auto',
					/*
					* 开启这个参数来计算每个slide的progress(进度、进程)
					* 对于slide的progress属性，活动的那个为0，其他的依次减1
					*/
					watchSlidesProgress: true,
					// 默认active slide居左，设置为true后居中
					centeredSlides: true,
					// 当你创建一个Swiper实例时是否立即初始化，这里我们手动初始化
					init: false,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						renderBullet: function (index, className) {

							let text = _self.cardList[index].title;
							return '<span class="' + className + '">' + text + '</span>';
						}
					},
					// Some Swiper option/callback...
					on:{
						progress: function(progress) {
							for (let i = 0; i < this.slides.length; i++){
								const slide = this.slides[i];
								const slideProgress = slide.progress;
								const scale = 1 - Math.min(Math.abs(.2 * slideProgress), 1);
								const style = slide.style;
								style.opacity = 1 - Math.min(Math.abs(slideProgress / 2), 1);
								style.webkitTransform = style.MsTransform = style.msTransform = style.MozTransform = style.OTransform = style.transform =
									"translate3d(0px,0," + -Math.abs(150 * slideProgress) + "px)"
								;
							}

						},
						slideChange: function() {
							for (let i = 0; i < this.slides.length; i++){
								const style = this.slides[i].style;
								style.webkitTransitionDuration = style.MsTransitionDuration = style.msTransitionDuration = style.MozTransitionDuration = style.OTransitionDuration = style.transitionDuration = 0 + "ms"
							}
							let activeIndex = this.activeIndex;
							let sold_count = _self.cardList[activeIndex].sold_count;
							_self.startNumAnimation(sold_count);
						},
					},

				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.productSwiper.$swiper
			}
		},
		mounted() {
			//this.getMemberCardList();
			//this.tweenUpdate();
		},
		methods: {
			getMemberCardList(){
				getMemberCardList().then((res)=>{
					this.cardList = res.data || [];
					this.initSwiper();
				});
			},
			initSwiper() {
				this.$nextTick(async() => {
					await this.swiper.init() // 现在才初始化
					await this.swiper.slideTo(this.activeItemIndex)
				})
			},
			tweenUpdate(){
				requestAnimationFrame(this.tweenUpdate);
				this.$tweener.update();
			},
			startNumAnimation(sold_count) {
				//target,to,during,delay,easing,onUpdate,onComplete
				this.$tween.fade(
					this,//target
					{sold_count:sold_count},//to
					600,//during
					0,//delay
					'',//easing
					()=>{//onUpdate
						this.sold_count = (this.sold_count||0).toFixed();
					}
				);
			},
			selectCurrentItem(productInfo){
				this.$store.dispatch('product/setProductInfo',productInfo);
				this.toStep01Page();
			},
			toStep01Page(){
				this.$router.push({name:'step01'});
			}
		}
	}
</script>
<style lang="scss" scoped>



</style>