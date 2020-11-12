<template>
    <section>
		<van-skeleton title :loading="skeletonLoading" :row="3" />

		<van-pull-refresh v-model="isPullRefresh" @refresh="onRefresh">
			<van-list class="product-list"
					  v-model="loading"
					  :finished="finished"
					  finished-text="No more."
					  @load="getProducts"
			>
				<productItem v-for="item in list" :key="item.id" :item="item"></productItem>
			</van-list>
		</van-pull-refresh>

    </section>
</template>
<script>
	import { getProducts } from '@/api/product'
	import productItem from '@/components/Public/productItem.vue'

    export default {
		components: {
			productItem
		},
        data(){
            return {
				isPullRefresh: false,
            	list: [],
				skeletonLoading: true,
				loading: false,
				finished: false,
				page: 1,
            }
        },
		created(){
        	//this.getProducts();
		},
		computed: {

		},
        methods: {
			onRefresh(){
				this.page = 1;
				this.getProducts().then(()=>{
					this.isPullRefresh = false
				})

			},
			getProducts(){
				return getProducts(this.page).then(res=>{

					let list = res.data || [];
					/*list = list.filter(item=>{
						return item.can_see==1;
					});*/

					this.page++;

					let pagination = res.meta.pagination;

					this.list = list;
					// 加载状态结束
					this.loading = false;
					this.skeletonLoading = false;
					// 数据全部加载完成
					if (this.list.length >= pagination.total) {
						this.finished = true;
					}

				});
			},


        }
    }
</script>
<style lang="scss">

</style>