
'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
// var webpack = require('webpack'),
//     path = require('path'),
//     srcPath = path.join(__dirname, 'src'),
//     AsyncModulePlugin = require('async-module-loader/plugin')
module.exports = {
    entry: __dirname + '/src/entry.js', //唯一入口文件
    output: {
        path: __dirname + '/build', //打包后的文件存放的地方
        filename: 'bundle.js' //打包后输出文件的文件名
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets:['es2015','react','stage-1'],
                    plugins: [
                        ['import', [{ libraryName: "antd", style: true }]],
                    ]
                }
            },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.(css|less)$/, loader: ExtractTextPlugin.extract("style", "css!less")},
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192' }
        ]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],
    devtool: '#inline-source-map',
    devServer: {
        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
        port: 3000,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true  //实时刷新
    },

    plugins: [
        new ExtractTextPlugin('main.css')
        // new webpack.HotModuleReplacementPlugin(),
        // //new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.js" }),
        // new webpack.NamedModulesPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.LoaderOptionsPlugin({
        //     debug: true
        // })
    ]
}
