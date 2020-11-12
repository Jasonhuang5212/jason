import router from './router'
import store from './store'
import { Toast } from 'vant'

import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'


var whiteList = ['/login','/resetpassword'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {

	// set page title
	document.title = getPageTitle(to.meta.title)

	if(to.query && to.query.device_number){
		store.dispatch('user/setDeviceNumber',to.query.device_number)
	}
	if(to.query && to.query.platform){
		store.dispatch('user/setPlatform',to.query.platform)
	}
	if(to.query && to.query.app_version_id){
		store.dispatch('user/setAppVersionId',to.query.app_version_id)
	}

	// determine whether the user has logged in
	const hasToken = getToken()

	if (hasToken) {
		if (to.path === '/login') {
			// if is logged in, redirect to the home page
			next({ path: '/' })
		} else {
			next()
			const hasGetUserInfo = store.getters.phoneNumber
			if (hasGetUserInfo) {
			  next()
			} else {
			  try {
				// get user info
				await store.dispatch('user/getInfo')

				next()
			  } catch (error) {
				// remove token and go to login page to re-login
				store.dispatch('user/resetToken')
				Toast.fail(error || 'Has Error')
				next(`/login?redirect=${to.path}`)
			  }
			}
		}
	} else {
		/* has no token*/
		let regPositionStatus = store.getters.regPositionStatus

		if(!regPositionStatus){//为0 表示还未获取是前置登录还是后置登录
			let data = await store.dispatch('user/getRegPositionStatus');
			regPositionStatus = data.reg_position_status;
		}

		if(regPositionStatus==1){//1-前置注册
			whiteList = ['/login','/resetpassword'] // no redirect whitelist
		}else if(regPositionStatus==2){//2-后置注册
			whiteList = ['/login','/resetpassword','/home','/loanall'] // no redirect whitelist
		}

		if (whiteList.indexOf(to.path) !== -1) {
			// in the free login whitelist, go directly
			next()
		} else {
			// other pages that do not have permission to access are redirected to the login page.
			next(`/login?redirect=${to.path}`)
		}
	}
})

router.afterEach(() => {
	// finish progress bar
})
