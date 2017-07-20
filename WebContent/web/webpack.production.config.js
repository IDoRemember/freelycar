
'use strict';
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: __dirname + '/src/entry.js', //唯一入口文件
    output: {
        path: __dirname + '/build', //打包后的文件存放的地方
        filename: '[name]-[hash].js', //打包后输出文件的文件名
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: [
                        ['import', [{ libraryName: "antd", style: true }]],
                    ]
                }
            },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.(css|less)$/, loader: ExtractTextPlugin.extract("style", "css!less") },
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192' }
        ]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],

    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new HtmlWebpackPlugin({ 
            template:  "test.html",
            showErrors:true,
            inject: 'body',
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(), 
        new ExtractTextPlugin("[name]-[hash].css")
    ]
}
