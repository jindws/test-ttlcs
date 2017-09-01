const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let publicPath = '';

module.exports = {
    entry: {
        app: './src/app.js',
        common: [
            "jquery",
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename: '[name].[hash].js',
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
            loader: 'style-loader!css-loader!postcss-loader',
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
        // 发布版本
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
                __PRO__:true,//生产环境
                __DEV__:false,
            }
        }),
        new webpack.ProvidePlugin({"$": "jquery"}),
        new webpack.optimize.CommonsChunkPlugin({names: ['common'], minChunks: Infinity}),
        new HtmlWebpackPlugin({template: './index.html'}),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
    ]
}
