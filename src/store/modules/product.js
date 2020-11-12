import {
	getProductInfo, setProductInfo, removeProductInfo,
	getPaymentOptionInfo, setPaymentOptionInfo, removePaymentOptionInfo,
	getOrderInfo, setOrderInfo, removeOrderInfo,
} from '@/utils/order'

const state = {
	productInfo: getProductInfo(),
	paymentOptionInfo: getPaymentOptionInfo(),
	orderInfo: getOrderInfo(),
}

const mutations = {
	SET_PRODUCT_INFO: (state, info) => {
		state.productInfo = info
	},
	SET_PAYMENT_OPTION_INFO: (state, info) => {
		state.paymentOptionInfo = info
	},
	SET_ORDER_INFO: (state, info) => {
		state.orderInfo = info
	},
}

const actions = {
	setProductInfo({ commit }, info){
		commit('SET_PRODUCT_INFO', info)
		setProductInfo(info)
	},
	setPaymentOptionInfo({ commit }, info){
		commit('SET_PAYMENT_OPTION_INFO', info)
		setPaymentOptionInfo(info)
	},
	setOrderInfo({ commit }, info){
		commit('SET_ORDER_INFO', info)
		setOrderInfo(info)
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
