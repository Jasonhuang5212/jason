<template>
	<div class="default-page feedback-page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title="Feedback"
					fixed
					left-arrow
					@click-left="onClickLeft"
					placeholder
			></van-nav-bar>
		</header>
		<section class="page-body">
			<van-form @submit="onSubmitFeedback">
				<van-field
						v-model="message"
						rows="5"
						autosize
						type="textarea"
						maxlength="1000"
						placeholder="Please enter your feedback"
						show-word-limit
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
	export default {

		data(){
			return {
				message: '',
				isSubmitting: false,
			}
		},
		computed: {
			isShowHeader() {
				const route = this.$route
				const { meta } = route
				return meta.showHeader
			},
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			},
			onSubmitFeedback(){
				this.isSubmitting = true;

				setTimeout(()=>{
					this.isSubmitting = false;
					this.$toast('Submit successfully');
				},300)
			}
		}


	}
</script>
<style lang="=scss">

</style>