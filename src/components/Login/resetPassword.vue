<template>
	<div class="login-page default-page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title="Reset Password"
					fixed
					placeholder
					left-arrow
					@click-left="onClickLeft"
			></van-nav-bar>
		</header>
		<section class="login-page-body">
			<h2 class="vip-doc-block__title">Reset Password</h2>
			<div ref="login_form">
				<!--<van-field
						readonly
						name="picker"
						:value="countryCodeText"
						label="Country देश"
						placeholder="Please select country code"
						@click="showPicker = true"
				/>-->
				<!--<van-popup v-model="showPicker" position="bottom">
					<van-picker
							show-toolbar
							:columns="columns"
							@confirm="onConfirm"
							@cancel="showPicker = false"
					/>
				</van-popup>-->
				<van-field
						v-model="telephone"
						name="telephone"
						type="tel"
						label="Telephone टेलीफोन"
						placeholder="Please enter telephone"
				/>
				<van-field
						v-model="password"
						name="password"
						type="text"
						label="New Password कुंजिका"
						placeholder="Please enter new password"
				/>
				<van-field
						v-model="code"
						center
						clearable
						type="digit"
						label="Code कोड"
						placeholder="Please enter code"
				>
					<template #button>
						<van-button size="small" type="default" class="vip-btn"
									:disabled="isGetting"
									@click="getCode">{{isGetting?$t('btn.smsCountDown',[count]):'Get Code'}}</van-button>
					</template>
				</van-field>
				<div class="vip-btn-wrap">
					<van-button type="primary" class="vip-btn"
								:disabled="isSubmitting"
								:loading="isSubmitting"
								loading-text="Submitting..."
								@click="onSubmitNewPassword"
								block>Reset Password ( पासवर्ड रीसेट )</van-button>
				</div>
			</div>
		</section>

	</div>
</template>
<script>
	import { getCountryCodes,getVerificationCodes,sendCode,updatePwd } from '@/api/user'
	import defaultSettings from '@/settings'
	export default {
		data(){
			return {
				countryCodeText: 'India 0091',
				countryCode: '0091',

				columns: [],
				showPicker: false,

				telephone: '',//9829666666
				password: '',
				code: '',
				codekey: '',
				isGetting: false,
				gettingText: '',
				count: 60,
				COUNT_DEFAULT: 60,
				isSubmitting: false,
			}
		},
		created(){
			/*getCountryCodes().then((res)=>{
				const list = res.data || [];
				list.sort((item1,item2)=>{
					if(item1.is_hot < item2.is_hot){
						return 1;
					}else if(item1.is_hot > item2.is_hot){
						return -1;
					}else{
						return 0;
					}
				});
				list.forEach((item)=>{
					item.text = item.name +' '+ item.intl_code;
				});
				this.columns = list;
			});*/
		},
		computed: {
			isShowHeader() {
				const route = this.$route
				const { meta } = route
				return meta.showHeader
			},
		},
		methods: {
			onConfirm(value) {

				this.countryCode = value.intl_code;
				this.countryCodeText = value.text;

				this.showPicker = false;
			},
			getCode(){
				if(!this.telephone){
					this.$toast('Please enter telephone');
					return false;
				}
				if(this.isGetting){
					return false;
				}
				this.isGetting = true;

				const countDownFn = ()=>{
					this.count--;
					if(this.count>0){
						setTimeout(countDownFn,1000);
					}else{
						this.isGetting = false;
						this.count = this.COUNT_DEFAULT;
					}
				}
				countDownFn();

				sendCode({
					intl_code: this.countryCode,
					phone_number: this.telephone,
					app_version_id: this.$store.getters.appVersionId,
				}).then((res)=>{
					this.codekey = res.data.key;
					//this.isGetting = false;
					//this.count = this.COUNT_DEFAULT;
				}).catch((e)=>{
					this.isGetting = false;
					this.count = this.COUNT_DEFAULT;
				})

			},
			/**
			 * 提交密码修改
			 * */
			onSubmitNewPassword(){
				if(!this.telephone){
					this.$toast('Please enter telephone');
					return false;
				}

				if(!this.password){
					this.$toast('Please enter new password');
					return false;
				}

				if(!this.code){
					this.$toast('Please enter code');
					return false;
				}

				//更新密码
				this.isSubmitting = true;
				updatePwd({
					verification_key: this.codekey,
					verification_code: this.code,

					device_number: this.$store.getters.deviceNumber,
					platform: this.$store.getters.platform,
					app_version_id: this.$store.getters.appVersionId,
					phone_number: this.telephone,
					password: this.password,
				})
					.then(() => {
						this.isSubmitting = false;
						this.$toast('Password update successful, and automatic login in progress');
						this.autoLogin();
					})
					.catch(() => {
						this.isSubmitting = false
					})

			},
			/**
			 * 修改密码后自动登录
			 * */
			autoLogin(){

				var toast = this.$toast.loading({duration: 0, message: 'Loading...', forbidClick: true,});

				let params = {
					device_number: this.$store.getters.deviceNumber,
					platform: this.$store.getters.platform,
					app_version_id: this.$store.getters.appVersionId,

					phone_number: this.telephone,
					password: this.password,
				}

				this.$store.dispatch('user/login', params)
					.then(() => {
						toast.clear();
						this.toHomePage();
					})
					.catch(() => {
						toast.clear();
					})

			},

			toHomePage(){
				this.$router.push({name:'home'});
			},
			onClickLeft() {
				this.$router.go(-1);
			},
		}
	}
</script>
<style>

</style>