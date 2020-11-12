<template>
	<div class="default-page set-nickname-page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title="Set Nickname"
					fixed
					left-arrow
					@click-left="onClickLeft"
					placeholder
			></van-nav-bar>
		</header>
		<section class="page-body">
			<van-form @submit="onSubmit">
				<van-field
						v-model="newNickname"
						label="Nickname"
						placeholder="Please enter the modified nickname"
						:rules="[{ required: true, message: 'Please enter the modified nickname' }]"
				/>
				<div class="vip-btn-wrap">
					<van-button type="primary" class="vip-btn"
								:disabled="isSubmitting"
								:loading="isSubmitting"
								loading-text="Submitting..."
								native-type="submit"
								block>
						Save
					</van-button>
				</div>
			</van-form>

		</section>
		<footer class="page-footer">

		</footer>
	</div>
</template>
<script>
	import { setUserInfo } from '@/api/user'

	export default {

		data(){
			return {
				newNickname: '',
				isSubmitting: false,
			}
		},
		created(){
			this.newNickname = this.userInfo.nickname || '';
		},
		computed: {
			isShowHeader() {
				const route = this.$route
				const { meta } = route
				return meta.showHeader
			},
			userInfo(){
				return this.$store.getters.info
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			},
			onSubmit(){
				if(!this.newNickname){
					return false;
				}
				this.isSubmitting = true;

				setUserInfo({
					nickname: this.newNickname
				}).then(res=>{
					const { data } = res;
					this.$store.dispatch('user/setInfo',data)

					this.isSubmitting = false;
					this.$toast('Submit successfully');
				}).catch((e) => {
					this.isSubmitting = false
				});


			}
		}


	}
</script>
<style lang="=scss">

</style>