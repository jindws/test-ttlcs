const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let publicPath = '';
// publicPath = 'ttl-web-systemttl-web-system';

module.exports = {
    devServer:{
      open: true,
      openPage: publicPath,
    },
    entry: {
        app: './src/app.js',
        common: [
            "jquery",
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        //  umd包含了对amd、commonjs、var等多种规范的支持
        libraryTarget:"umd",
        publicPath,
    },
    resolve: {
        extensions:[".js",".vue"],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'components'),
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        },{
            test: /\.(png|jpg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }
            ]
        },{
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: '[name].[ext]?[hash]',
                publicPath,
            }
        }]
    },
    watch:true,
    plugins: [
        // 开发版本
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        // 自动加载，不需要各个模块import或require
        new webpack.ProvidePlugin({"$": "jquery"}),
        // 当多个捆绑包共享一些相同的依赖关系时
        new webpack.optimize.CommonsChunkPlugin({names: ['common'], minChunks: Infinity}),
        new HtmlWebpackPlugin({template: './index.html'}),
    ]
}
