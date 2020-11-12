import axios from 'axios'
import store from '@/store'
import router from '@/router';
import { Dialog,Toast } from 'vant'
import { getToken,getTokenType } from '@/utils/auth'
import { getLanguage } from '@/i18n/index'

// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		// do something before request is sent

		if (store.getters.token) {
			// let each request carry token
			// please modify it according to the actual situation
			if(!config.params){
				config.params = {}
			}
			config.params['token'] = getToken()
			config.headers['Authorization'] = getTokenType() +' '+ getToken()//Authorization: Bearer + access_token
		}

		if (store.getters.deviceNumber) {
			// let each request carry token
			// please modify it according to the actual situation
			if(!config.params){
				config.params = {}
			}
			config.params['device_number'] = store.getters.deviceNumber
			config.params['platform'] = store.getters.platform
			config.params['app_version_id'] = store.getters.appVersionId
		}

		config.headers['Accept-Language'] = getLanguage();//Accept-Language:en

		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	response => {
		const res = response.data

		store.dispatch('network/changeNetworkSuccess',true)

		// if the custom code is not 20000, it is judged as an error.
		const { data, meta } = res;


		if (meta && meta.message !== 'success' ) {
			Toast({
				message: meta.message || 'Server ist falsch',
				type: 'fail',
				position: 'bottom',
				duration: 3 * 1000
			})

			return Promise.reject(new Error(res.message || 'Error'))
		} else {
			return res
		}
	},
	error => {
		const { response } = error;

		if(response.config && response.config.url!=="/user/operations"){
			//(error.response && error.response.status !== 200
			if(response && response.status !== 200){

				if(error.response.status === 401){//token过期，重新登录
					// to re-login
					Dialog.confirm({
						title: 'Confirm logout',
						message: 'You have been logged out, you can cancel to stay on this page, or log in again',
						confirmButtonText: 'Re-Login',
						cancelButtonText: 'Cancel',
						type: 'warning'
					}).then(() => {
						store.dispatch('user/resetToken').then(() => {
							location.reload()
						})
					})

				}else{
					Toast({
						message: response.data.message,
						type: 'fail',
						position: 'bottom',
						duration: 3 * 1000
					})
				}

			}else{
				// 处理断网的情况
				// eg:请求超时或断网时，更新state的network状态
				// network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
				// 关于断网组件中的刷新重新获取数据，会在断网组件中说明
				store.dispatch('network/changeNetworkSuccess',false).then(() => {
					router.push({path:'refresh'})
				})
			}
		}

		return Promise.reject(error)
	}
)

export default service
