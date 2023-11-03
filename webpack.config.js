const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); 
const HexEncodePlugin = require('./Hex');
const WebpackObfuscator = require('webpack-obfuscator');

// ==================================================================
// webpack打包html文件
// webpack打包时候都会选择一个入口文件，在入口文件中，通常会将项目的依赖引入其中
// webapck通过分析入口文件的各种依赖项进行打包文件，在打包好的html中，会引入bundle文件，是将所有打包好的依赖项放入html中
// webpack插件系统(plugin)很强大，允许你使用各种插件来进行打包操作，如代码压缩，代码混淆等

// webpack loader

// 代码混淆 webpack-obfuscator
module.exports = {
    mode: 'production',
    entry: './src/Obfuscationcompression/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/Obfuscationcompression/index.html'//daimahunxiao/
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new WebpackObfuscator({
        compact: true,
        rotateStringArray: true,
        stringArray: true,
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
      }),
      // new HexEncodePlugin()
    ],
    optimization: {  
      minimize: true,  
      minimizer: [  
        new CssMinimizerPlugin(), 
      ],  
    },  
}