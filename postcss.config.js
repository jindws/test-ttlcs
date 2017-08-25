module.exports = {
  plugins: [
    require('autoprefixer')({browsers:'ie >= 9,safari >= 8'}),
    // require('cssnano')({
    // 	zindex: false,
    // 	reduceIdents:false,
    // }),
    require('postcss-cssnext')()
  ]
}
