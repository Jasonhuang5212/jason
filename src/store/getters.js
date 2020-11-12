const getters = {
	token: state => state.user.token,
	phoneNumber: state => state.user.phoneNumber,
	regPositionStatus: state => state.user.regPositionStatus,
	deviceNumber: state => state.user.deviceNumber,
	platform: state => state.user.platform,
	appVersionId: state => state.user.appVersionId,
	tokenType: state => state.user.tokenType,
	info: state => state.user.info,
	product: state => state.product.productInfo,
	paymentOption: state => state.product.paymentOptionInfo,
	order: state => state.product.orderInfo,
	networkSuccess: state => state.network.success,
}
export default getters
