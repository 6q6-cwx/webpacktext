const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HexEncodePlugin = require("./Hex");
const WebpackObfuscator = require("webpack-obfuscator");

// ==================================================================
// webpack打包html文件
// webpack打包时候都会选择一个入口文件，在入口文件中，通常会将项目的依赖引入其中
// webapck通过分析入口文件的各种依赖项进行打包文件，在打包好的html中，会引入bundle文件，是将所有打包好的依赖项放入html中
// webpack插件系统(plugin)很强大，允许你使用各种插件来进行打包操作，如代码压缩，代码混淆等

// webpack loader

// 代码混淆 webpack-obfuscator
module.exports = {
  mode: "production", //环境设置 development production
  // entry: {
  //   main:"./src/Obfuscationcompression/index.js",
  //   // styles: "./src/Obfuscationcompression/public/css/firstdemo.css" // 用来处理单个 CSS 文件
  // },
  entry: "./src/Obfuscationcompression/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "index.js", 只能用于单个文件
    filename: "[name].bundle.js",  //用于多个文件 方便文件懒加载和分割
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // include: [
        //   path.resolve(__dirname, "./src/Obfuscationcompression/public/css"),//在这个文件夹中找css
        // ],
        use: [
          MiniCssExtractPlugin.loader,
        , "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, //正则表达式用于匹配图像文件的扩展名
        include: [
          path.resolve(__dirname, "./src/Obfuscationcompression/public/image"),
        ], //指定了要处理的文件夹路径
        use: [
          {
            loader: "file-loader", //只能处理图片文件夹，用于将图像文件复制到输出目录（dist/img），并生成相应的文件名
            options: {
              name: "[path][name].[ext]",
              context: path.resolve(
                __dirname,
                "./src/Obfuscationcompression/public/image"
              ), //这个地址是图片的基础地址
              outputPath: "public/image",
              publicPath: "/image", //使用公共路径来解析图片
            },
          },
        ],
      },
    ],
  },
  plugins: [
    //Plugins是Webpack中用于实现各种功能的扩展插件
    new HtmlWebpackPlugin({
      template: "src/Obfuscationcompression/index.html", //daimahunxiao/
    }),
    new MiniCssExtractPlugin({
      filename: 'public/css/styles.css',//配置文件名称和路径
    }),
    new WebpackObfuscator({
      compact: true, //代码压缩
      rotateStringArray: true, //重新排列字符串数组的顺序
      stringArray: true, //处理字符串
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false, //Unicode转义序列转换为相应的字符
    }),
    // new HexEncodePlugin()
  ],
  optimization: {
    //自定义优化策略的配置项、配置插件中的内容
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};
