const state = {
	success: true //网络是否正常
}

const mutations = {
	SET_NETWORK_SUCCESS: (state, success) => {
		state.success = success
	},
}

const actions = {
	changeNetworkSuccess({ commit }, val){
		commit('SET_NETWORK_SUCCESS', val)
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
