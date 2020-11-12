<template>
	<div class="default-page set-avatar-page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title="Modify Head Portrait"
					fixed
					left-arrow
					@click-left="onClickLeft"
					placeholder
			></van-nav-bar>
		</header>
		<section class="page-body">
			<van-form @submit="onSubmit">
				<van-field name="uploader" label="Image">
					<template #input>
						<van-uploader v-model="fileList" :after-read="afterRead" :max-count="1"/>
					</template>
				</van-field>

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
	import { setUserInfo,uploadImage } from '@/api/user'

	export default {

		data(){
			return {
				avatar: '',
				avatarId: '',
				fileList: [],
				isSubmitting: false,
			}
		},

		created(){
			this.avatar = this.userInfo.avatar || '';
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
			afterRead(file){
				file.status = 'uploading';
				file.message = 'uploading...';

				let param = new FormData();
				param.append('type','avatar');
				param.append('image',file.file);

				uploadImage(param).then(res=>{
					file.status = 'done';
					const { data } = res;
					this.avatar = data.path;
					this.avatarId = data.id;
				}).catch(()=>{
					file.status = 'failed';
					file.message = 'failed';
				});

			},
			onSubmit(){

				if(!this.avatarId){
					this.$toast('Please select image');
					return false;
				}

				this.isSubmitting = true;
				setUserInfo({
					avatar_image_id: this.avatarId
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