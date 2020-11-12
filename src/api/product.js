import request from '@/utils/request'

export function getHomeProducts(page) {//获取首页产品列表
	return request({
		url: '/home/current',
		method: 'get',
		params: {page}
	})
}

export function getProducts(page) {//获取产品列表
	return request({
		url: '/products/current',
		method: 'get',
		params: {page}
	})
}
export function getProductDetailById(id) {//获取产品详情
	return request({
		url: '/product/'+id,
		method: 'get',
	})
}
