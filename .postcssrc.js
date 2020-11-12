// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
	plugins: {
		'autoprefixer': {
			browsers: ['Android >= 4.0', 'iOS >= 8']
		},
		'postcss-pxtorem': {
			rootValue: 75,
			propList: ['*'],
			exclude: /node_modules/i
		}
	}
}
