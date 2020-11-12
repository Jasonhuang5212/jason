<template>
	<div class="default-page about-us-page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title="About Us"
					fixed
					left-arrow
					@click-left="onClickLeft"
					placeholder
			></van-nav-bar>
		</header>
		<section class="page-body">
			<div class="company">
				<p>
					<span class="title">KAIDE INTERNATIONAL INFO TECH PRIVATE LIMITED</span>
					<span> is a local technology innovation company in India. We are committed to providing customers with high-quality loan products and services to meet their complete loan needs.</span>
				</p>
			</div>

			<div class="van-hairline--bottom"></div>

			<div class="contact-us">
				<p>Contact Us:</p>
				<p>Customer Service Email: qhwr2019@gmail.com</p>
				<p>Customer Service phone: 8939705079</p>
				<p>Whatsapp: 8939705079</p>
				<p>Company name: KAIDE INTERNATIONAL INFO TECH PRIVATE LIMITED</p>
				<p>Company address: C-615,JALVAYU TOWERS,SECTOR-56,GURUGRAM,Gurgaon,Haryana</p>

			</div>

		</section>
		<footer class="page-footer">

		</footer>
	</div>
</template>
<script>
	export default {

		data(){
			return {
				activeNames: [],
				isSubmitting: false,
				list: []
			}
		},
		computed: {
			isShowHeader() {
				const route = this.$route
				const { meta } = route
				return meta.showHeader
			},
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			},

		}


	}
</script>
<style lang="=scss">

</style>