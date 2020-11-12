const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}


module.exports = {
	transpileDependencies: ['*'],
	productionSourceMap:false,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://idc.wonderloan.top/api',
				ws: false,//是否代理websockets
				changeOrigin: true,   // 设置同源  默认false，是否需要改变原始主机头为目标URL
				pathRewrite:{
					'^/api':''
				}
			}
		},
	},
	configureWebpack: {
		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		resolve: {
			alias: {
				'@': resolve('src')
			}
		},
		plugins: [
			new CompressionPlugin({
				test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
				threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
				deleteOriginalAssets: false // 是否删除原文件
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[id].css',
			}),
			new OptimizeCssnanoPlugin({
				sourceMap: false,
				cssnanoOptions: {
					preset: [
						'default',
						{
							mergeLonghand: false,
							cssDeclarationSorter: false
						}
					]
				}
			}),

		],
	},
	// webpack 链接 API，用于生成和修改 webapck 配置
	// https://github.com/mozilla-neutrino/webpack-chain
	chainWebpack: (config) => {
		config.entry.app = ['babel-polyfill', './src/main.js'];

		// 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
		config.optimization
			.splitChunks({
				cacheGroups: {
					vendor: {
						chunks: 'initial',
						test: /node_modules/,
						name: 'vendor',
						minChunks: 1,
						maxInitialRequests: 5,
						minSize: 0,
						priority: 100
					},
					styles: {
						name: 'styles',
						test: /\.(sa|sc|c)ss$/,
						chunks: 'all',
						enforce: true
					},
					runtimeChunk: {
						name: 'manifest'
					}
				}
			});


	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `
				@import "~@/assets/styles/_variable.scss";
				`
			}
		}
	}
}
