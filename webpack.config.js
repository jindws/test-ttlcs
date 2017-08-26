const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename: '[name].[hash].js',
        libraryTarget:"umd",
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
            loader: 'happypack/loader?id=happybabel'
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
              publicPath:'../'
          }
        }]
    },
    watch:true,
    plugins: [
        new HappyPack({
         id: 'happybabel',
         loaders: ['babel-loader'],
         threadPool: happyThreadPool,
         cache: true,
         verbose: true
       }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new HtmlWebpackPlugin({template: './index.html'}),
    ]
}
