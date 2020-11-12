<template>
	<div class="login-page default-page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title="Sign in"
					fixed
					placeholder
			></van-nav-bar>
		</header>
		<section class="login-page-body">
			<h2 class="vip-doc-block__title">One stop loan platform in India</h2>
			<div ref="login_form">
				<!--<van-field
						readonly
						name="picker"
						:value="countryCodeText"
						label="Country देश"
						placeholder="Please select country code"
				/>-->
				<!--
				<van-popup v-model="showPicker" position="bottom">
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
						:rules="[{ validator, message: 'Only numbers allowed' }]"
				/>
				<van-field
						v-model="password"
						name="password"
						type="password"
						label="Password कुंजिका"
						placeholder="Please enter password"
				/>
				<van-field
						v-if="isNeedConfirmPassword"
						v-model="confirm_password"
						name="confirm_password"
						type="password"
						label="Confirm Password कुंजिका"
						placeholder="Please confirm password"
				/>

				<div class="vip-btn-wrap">
					<van-button type="primary" class="vip-btn"
								:disabled="isSubmitting"
								:loading="isSubmitting"
								loading-text="Submitting..."
								@click="onSubmit"
								block><p>Login to get money now</p>
						<p>अब पैसा पाने के लिए लॉगिन करेंं</p></van-button>
					<div class="login-tips text-right">
						<p>Unregistered users will automatically create accounts</p>
						<p>अपंजीकृत उपयोगकर्ता स्वचालित रूप से खाते बनाएंगे</p>
						<br/>
						<p>We will strictly protect your privacy, please feel free to register</p>
						<p>हम आपकी गोपनीयता की सख्ती से रक्षा करेंगे, कृपया बेझिझक पंजीकरण करें</p>
					</div>
					<div class="login-forgot-password text-right">
						<a href="javascript:;" @click.prevent="toResetPasswordPage">
							<p>Forgot your password?</p>
							<p>क्या आप अपना पासवर्ड भूल गए?</p>
						</a>
					</div>
				</div>
			</div>
		</section>

	</div>
</template>
<script>
    import { debounce } from 'lodash'
	import {getCountryCodes, getVerificationCodes, queryPwd} from '@/api/user'

	export default {
		data() {
			return {
				countryCodeText: 'India 0091',
				countryCode: '0091',

				columns: [],
				showPicker: false,

				telephone: '',//9829666666
				password: '',
				confirm_password: '',
				isQueryedNeedConfirmPassword: false,//是否查询了后台
				isNeedConfirmPassword: false,
				code: '',
				codekey: '',
				checkbox: true,
				isGetting: false,
				gettingText: '',
				count: 60,
				COUNT_DEFAULT: 60,
				isSubmitting: false,
			}
		},
		created() {
            this.debouncedQueryIsNeedConfirmPassword = debounce(this.queryPassword, 500)
		},
		computed: {
			isShowHeader() {
				const route = this.$route
				const {meta} = route
				return meta.showHeader
			},
		},
		watch: {
            telephone(newTel, oldTel) {
                this.debouncedQueryIsNeedConfirmPassword();
			},
			password() {
				//this.confirm_password = this.password;
			},
		},
		methods: {
			onConfirm(value) {

				this.countryCode = value.intl_code;
				this.countryCodeText = value.text;

				this.showPicker = false;
			},
			onSubmit() {
				if (!this.telephone) {
					this.$toast('Please enter telephone');
					return false;
				}
				if (!this.password) {
					this.$toast('Please enter password');
					return false;
				}

				if (this.isNeedConfirmPassword) {

					if (!this.confirm_password) {
						this.$toast('Please confirm password');
						return false;
					}

					if (this.password != this.confirm_password) {
						this.$toast("The password doesn't match.");
						return false;
					}
				}

				this.isSubmitting = true;
				let params = {
					device_number: this.$store.getters.deviceNumber,
					platform: this.$store.getters.platform,
					app_version_id: this.$store.getters.appVersionId,

					phone_number: this.telephone,
					password: this.password,
				}
				if (this.isNeedConfirmPassword) {
					params.confirm_password = this.confirm_password
				}

				this.$store.dispatch('user/login', params)
					.then(() => {
						this.isSubmitting = false;
						this.toHomePage();
					})
					.catch(() => {
						this.isSubmitting = false
					})

			},
			toHomePage() {
				this.$router.push({name: 'home'});
			},
			// 校验函数返回 true 表示校验通过，false 表示不通过
			validator(val) {
				return /^[0-9]*$/.test(val);
			},
			checkIsNeedConfirmPassword() {
				if (this.telephone) {
					this.queryPassword();
				}
			},
			queryPassword() {
				return new Promise((resolve, reject) => {
					let params = {
						phone_number: this.telephone
					}
					queryPwd(params).then(res => {
						let data = res.data;
						this.isNeedConfirmPassword = data.has_pwd == 'Y' ? false : true;
					});
				})

			},
			toResetPasswordPage() {
				this.$router.push({
					name: 'resetPassword',
				});
			},
		}
	}
</script>
<style>

</style>