<template>
    <div class="default-page loan-all-page">
        <header v-if="isShowHeader">
            <van-nav-bar
                    title="Loan All"
                    fixed
                    placeholder
            ></van-nav-bar>
        </header>
        <section class="page-body">
            <van-notice-bar scrollable left-icon="info-o">
                Download more loan app can help you get money more easily.
            </van-notice-bar>
            <productList></productList>
        </section>
    </div>
</template>
<script>
    import productList from '@/components/Public/productList'
    export default {
        components:{
            productList
        },
        data(){
            return {

            }
        },
		computed: {
			isShowHeader() {
				const route = this.$route
				const { meta } = route
				return meta.showHeader
			},
		},
    }
</script>


