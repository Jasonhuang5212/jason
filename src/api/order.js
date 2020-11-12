import request from '@/utils/request'

export function getMemberCardList() {//获取会员卡商品展示列表
	return request({
		url: '/member/cards',
		method: 'get',
	})
}

export function getPaymentChannelList() {//获取会员卡支付通道
	return request({
		url: '/payment/channels',
		method: 'get'
	})
}

export function submitOrders(data) {//会员生成订单
	return request({
		url: '/member/orders',
		method: 'post',
		data
	})
}

export function payOrders(data) {//会员订单支付
	return request({
		url: `/orders/${data.order_id}/mpurse`,
		method: 'post',
		data
	})
}

export function queryOrderPayStatus(order_id) {//会员订单查询
	return request({
		url: '/payment/mpurse/return',
		method: 'get',
		params: { order_id }
	})
}