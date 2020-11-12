<template>
    <swiper class="home-swiper" ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in list" :key="item.id">
            <a class="slide-product" href="javascript:;" @click="toBannerLink(item)">
                <img :src="item.picture_url_qiniu"/>
            </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>
<script>
	import { recordOP } from '@/api/user'
    export default {
        name: 'carrousel',
        props: {
           list: {
               type: Array,
               default: function () {
                   return [];
               }
           }
        },
        data() {
            return {
                swiperOptions: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    // Some Swiper option/callback...
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        mounted() {
            console.log('Current Swiper instance object', this.swiper)
            this.swiper.slideTo(3, 1000, false)
        },
		methods: {
            toBannerLink(item){

                let jump_url = item.link_url;
                if(!jump_url){return false;}

                try {
                    let t = new Date().getTime();
                    jsApi.requireAsync('openbrowser', t, JSON.stringify({
                        "reqId": t,
                        "openUrl": jump_url
                    }));

                }catch (e) {
                    //location.href = jump_url
                    this.$router.push({name:'urlIframe',params:{'title':item.desc || '','path':jump_url}});
                }

                return false;

			}
		}
    }
</script>


