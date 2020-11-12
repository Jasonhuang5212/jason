<template>
	<div class="default-page faqs-page">
		<header v-if="isShowHeader">
			<van-nav-bar
					title="FAQs"
					fixed
					left-arrow
					@click-left="onClickLeft"
					placeholder
			></van-nav-bar>
		</header>
		<section class="page-body">
			<van-collapse v-model="activeNames">
				<van-collapse-item :title="item.title" :name="index" v-for="(item,index) in list" :key="index">
					{{item.content}}
				</van-collapse-item>
			</van-collapse>

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
				list: [
					{
						title: 'How do i get a loan?',
						content: 'Our app app has partnered with the best loan\n' +
							'\t\t\t\t\tproviders in the market. Choose the best loan\n' +
							'\t\t\t\t\tprovider for your needs and click the download app\n' +
							'\t\t\t\t\toption and apply. lt will redirect you to our partner’s\n' +
							'\t\t\t\t\tplaystore listing. Here, you can download the app\n' +
							'\t\t\t\t\tand apply for loan.',
					},{
						title: 'Am i eligible for a loan?',
						content: 'At our app, we try our best to list out the various\n' +
							'criteria necessary to be eligible for a loan. These\n' +
							'criteria are provided by the loan providers so if you\n' +
							'Fit in such criteria, You will be eligible for a loan\n' +
							'from our partner apps. (The final decision rests on\n' +
							'our partner apps.)\n',
					},{
						title: 'What is the interest rate?',
						content: 'At our app, our partners try their best to keep the\n' +
							'interest rate as possible. At our app, you can\n' +
							'choose from loan on attractive interest rate\n' +
							'providers.\n',
					},{
						title: 'What is the loan amount and time period range?',
						content: 'At our app, different partners provide different loan\n' +
							'amount and time period for loan. Overall, loan\n' +
							'amount ranges from 2000rs to 20000rs and time\n' +
							'period can be up 365 days.\n',
					},{
						title: 'How much is the processing fees?',
						content: 'At our app, loan providers tend to keep processing\n' +
							'fees marginal. However, this will vary from one\n' +
							'partner to another Overall, this processing may be\n' +
							'fixed or varying based on the loan amount and will\n' +
							'be charged only once while disbursing the loan\n',
					},{
						title: 'How long does it take to disburse the loan?',
						content: 'Upon successful loan application approval, it hardly\n' +
							'takes 15minutes to disburse loan amount in our\n' +
							'partner apps. However, this time may increase\n' +
							'drastically based on unavoidable technical issues.\n',
					},{
						title: 'What documents are required to apply for a loan?',
						content: 'Partners require certain documents such as ldentity\n' +
							'proof, Address proof, Salary/lncome proof while\n' +
							'applying for a loan. Please note that these\n' +
							'documents may differ for each of our partners.\n',
					},{
						title: 'Can i take multiple loans?',
						content: 'For mow you cannot get multiple loans at one time\n' +
							'From any one of our partners.However, you Can\n' +
							'apply for loan from all Of our partners. Alse,you can\n' +
							'apply for a new instant loan with Avail after\n' +
							'completing the EMI payments for your previous loan.',
					},{
						title: 'Will this affect my credit score?',
						content: 'Timely repayment of your EMI payments can\n' +
							'improve your credit score. If you fail to pay in a\n' +
							'timely manner on your loan’s EMls, it will negatively\n' +
							'affect your credit score. By paying your loan’s EMls\n' +
							'and dues timely, your credit score will increase,\n' +
							'Which in turn would help you avail larger loans in the\n' +
							'future.\n',
					},{
						title: 'Can i pre-close the loan?',
						content: 'Yes, per-closing loan facility is available with our\n' +
							'partners at zero extra coast, just dial the customer\n' +
							'care number for your loan provider and follow the\n' +
							'steps given them by them pre-close the loan.\n',
					},{
						title: 'Can i pay after due date?',
						content: 'While we prefer and appreciate timely repayment of\n' +
							'EMls, our loan partners understand the unforeseable\n' +
							'Circumstances while a person doesn’t repay on time.\n' +
							'ln this case, our loan partners charge a late payment\n' +
							'fee and overdue fee. Please avoid late repayment Of\n' +
							'EMIS a S it may affect your credit score in a negative\n',
					},{
						title: 'Does our app provides loan services?',
						content: 'our app has partnered with best loan providers in\n' +
							'lndia. These loan partners provide the loan via their\n' +
							'android app, So No, as of now our app is just a medium,not a loan provider\n',
					},
				]
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