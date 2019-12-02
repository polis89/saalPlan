const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		app: './src/js/index.js',
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
	  new HtmlWebpackPlugin({
			title: 'Production'
		}),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
	],
	output: {
		filename: 'js/[name].[chunkhash].bundle.js',
		chunkFilename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
  module: {
    rules: [
      {
				test: /\.sass$/,
				use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS
				]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
      // {
      // 	test: /\.js$/,
      // 	loader: 'babel-loader'
      // }
    ]
  }
};
