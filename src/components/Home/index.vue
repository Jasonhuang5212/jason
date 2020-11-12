<template>
	<div class="default-page home-page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title="Cash Wallet"
					fixed
					placeholder
			></van-nav-bar>
		</header>
		<van-notice-bar mode="link" @click="toPolicyPage">
			Privacy policy
		</van-notice-bar>
		<van-pull-refresh v-model="isPullRefresh" @refresh="onRefresh">
			<section class="home-page-body page-body">
				<div class="panel-pic">
					<img src="https://cdn.daichaochina.top/images/20201112new_banner.png">
				</div>

				<div class="panel" v-for="category in categoryList">
					<div class="panel-hd">
						<div class="heading-item flex">
							<van-icon class="icon" name="fire"/>
							<div class="heading-item-bd flex-1">
								<p class="title">{{category.name}}</p>
								<!--<p class="desc">Unsecred Loan for persional purpose</p>-->
							</div>
						</div>
					</div>
					<div class="panel-bd">
						<van-skeleton title :loading="skeletonLoading" :row="3"/>
						<div class="product-list">
							<productItem v-for="item in category.list" :key="item.id" :item="item"
										 v-show="item.isShow"></productItem>
						</div>
					</div>
					<div class="panel-ft" v-show="category.isShowViewMoreBtn">
						<div class="text-center view-more-btn-wrap">
							<van-button class="view-more-btn" size="small" plain icon="eye" block
										@click="showMore(category)">
								View More {{ category.name }}
							</van-button>
						</div>
					</div>
				</div>

			</section>
		</van-pull-refresh>
	</div>
</template>
<script>

	import productSwiper from '@/components/Public/swiper1'
	import {getHomeProducts} from '@/api/product'
	import {recordOP} from '@/api/user'
	import productItem from '@/components/Public/productItem.vue'

	export default {
		components: {
			productSwiper,
			productItem
		},
		data() {
			return {
				categoryList: [],
				carouselList: [],
				isPullRefresh: false,
				skeletonLoading: true,
			}
		},
		created() {
			this.getHomeProducts();
		},
		computed: {
			isShowHeader() {
				const route = this.$route
				const {meta} = route
				return meta.showHeader
			},
		},
		methods: {
			onRefresh() {
				this.getHomeProducts().then(() => {
					this.isPullRefresh = false
				})

			},
			getHomeProducts() {
				return getHomeProducts().then(res => {
					this.skeletonLoading = false;
					const {data} = res;
					let list = data.special || [];
					this.categoryList = this.filterListByCategory(list);
					this.carouselList = data.carousel || [];

				})
			},
			toPolicyPage(){//
				this.$router.push({name:'policy'});
			},
			filterListByCategory(list) {

				let categoryObj = {};
				let emptyCategoryList = [];

				list.forEach(item => {
					if (item.category) {
						if (!categoryObj[item.category]) {
							categoryObj[item.category] = [];
						}
						categoryObj[item.category].push(item)
					} else {
						emptyCategoryList.push(item);
					}
				});

				let resList = [];
				for (var key in categoryObj) {

					let tempList = categoryObj[key];
					tempList.forEach((item, index) => {
						if (index < 2) {
							item.isShow = true;
						} else {
							item.isShow = false;
						}
					});

					resList.push({
						name: key,
						isShowViewMoreBtn: tempList.length > 2 ? true : false,
						list: tempList,
					})
				}
				if (emptyCategoryList.length > 0) {
					emptyCategoryList.forEach((item, index) => {
						if (index < 2) {
							item.isShow = true;
						} else {
							item.isShow = false;
						}
					});
					resList.push({
						name: 'Personnal Loan',
						isShowViewMoreBtn: emptyCategoryList.length > 2 ? true : false,
						list: emptyCategoryList,
					})
				}

				return resList;
			},
			showMore(category) {
				let list = category.list;
				list.forEach(item => {
					item.isShow = true;
				});
				category.isShowViewMoreBtn = false;
			}
		}
	}
</script>
<style lang="scss">

</style>