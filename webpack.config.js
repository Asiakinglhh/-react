const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 负责将html文档虚拟到根目录下
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    // 虚拟html的模板为public下的index.html
    template: path.resolve(__dirname, './public/index.html'),
    // 虚拟的html文件名 index.html
    filename: 'index.html',
});

module.exports = {
    // 配置入口文件
    entry: './src/index.js',
    // 生产模式
    mode: 'development',
    // 定义导出的js模块如何转换，有哪些规则数组
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',// 只使用一个加载程序时，loader是use属性的缩写
                options: { presets: ['@babel/env'] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    // 指定Webpack将解析哪些扩展，允许我们导入模块而不需要添加它们的扩展
    resolve: { extensions: ["*", ".js", ".jsx"] },
    // 配置出口文件
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: process.env.NODE_ENV === "production" ? './' : '/',// 指定bundle放在哪个目录中，还有webpack dev server从哪里提供文件，路径不对将得到404
        filename: 'bundle.js'
    },
    // 配置开发服务器, 并配置自动刷新
    devServer: {
        // 根目录下public为基本目录
        contentBase: path.join(__dirname, 'public/'),// 静态文件的位置
        // 设置是否自动压缩
        compress: true,
        // 是否自动打开浏览器
        open: true,
        // 服务端口为3000
        port: 3000,
        // 告诉服务器绑定的代码实际在哪里
        publicPath: "http://localhost:3000",
        // 热更新
        hotOnly: true
    },
    // 装载虚拟目录插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        htmlWebpackPlugin
    ],
}