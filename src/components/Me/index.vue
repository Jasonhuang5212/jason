<template>
	<div class="default-page me-page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title="Me"
					fixed
					placeholder
			></van-nav-bar>
		</header>
		<section class="page-body">
			<div class="user-info">
				<div class="avatar">
					<img class="head-img" :src="userInfo.avatar || 'imgs/me/head.png'">
				</div>
				<p class="user-name" v-if="userInfo.phone_number">{{ userInfo.nickname || userInfo.phone_number }}</p>
			</div>

			<div class="custom-cell-area">
				<van-cell title="Feedback(प्रतिपुष्टि)" is-link to="/feedback" />
				<van-cell title="Set NickName(निक नाम सेट करें)" is-link to="/setnickname" />
				<van-cell title="Modify Head Portrait(अवतार सेट करें)" is-link to="/setavatar" />
				<van-cell title="FAQs(सामान्य प्रश्न)" is-link to="/faqs" />
				<van-cell title="About Us(हमारे बारे में)" is-link to="/aboutus" />
			</div>
			<div class="custom-cell-area">
				<van-collapse v-model="activeNames">
					<van-collapse-item title="Customer service(ग्राहक सेवा)" name="1">

						<div type="button"
							 v-clipboard:copy="message"
							 v-clipboard:success="onCopy"
							 v-clipboard:error="onError">
							<p>Click to copy whatsapp: {{message}}</p>
							<p>कॉपी पर क्लिक करें whatsapp: {{message}}</p>
						</div>
					</van-collapse-item>
				</van-collapse>
			</div>
			<div class="custom-cell-area">
				<van-cell title="Logout(लॉग आउट)" is-link @click="logout" />
			</div>

		</section>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				message: '+918939705079',
				activeNames: ['1']
			}
		},
		mounted() {

		},
		computed: {
			isShowHeader() {
				const route = this.$route
				const { meta } = route
				return meta.showHeader
			},
			userInfo(){
				return this.$store.getters.info
			},
		},
		methods: {
			async logout() {
				await this.$store.dispatch('user/logout')
				this.$router.push(`/login?redirect=${this.$route.fullPath}`)
			},
			onCopy (e) {
				this.$toast.success('Copy successfully');
			},
			onError (e) {
				this.$toast.fail('Copy Failed')
			},
		}
	}
</script>
<style>

</style>