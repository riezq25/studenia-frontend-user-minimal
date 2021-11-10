const path = require('path')

module.exports = {
  publicPath: '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['./node_modules', './src/assets'],
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@public': path.resolve(__dirname, 'public'),
        '@repdir': path.resolve(__dirname, 'src/repositories'),
        '@repofactory': path.resolve(
          __dirname,
          'src/repositories/RepositoryFactory.js'
        ),
        '@navigation': path.resolve(__dirname, 'src/navigation'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@validations': path.resolve(
          __dirname,
          'src/@core/utils/validations/validations.js'
        ),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
        '@vue/composition-api': path.resolve(
          path.join(__dirname, './node_modules/@vue/composition-api/')
        ),
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src',
        }
        return options
      })
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
}
