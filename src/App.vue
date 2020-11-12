<template>
  <div id="app">
	  <keep-alive>
		  <router-view v-if="$route.meta.keepAlive && networkSuccess"/>
	  </keep-alive>
	  <router-view v-if="!$route.meta.keepAlive || !networkSuccess"/>
  </div>
</template>
<script>
	export default {
		data(){
			return{

			}
		},
		computed: {
			networkSuccess(){
				return this.$store.getters.networkSuccess
			}
		},
		watch: {
			'$route' () {
				if (window._czc) {
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
		},
		mounted () {
			const script = document.createElement('script')
			script.src = '//s4.cnzz.com/z_stat.php?id=1279354777&web_id=1279354777'
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
	}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
