const webpack = require('webpack')
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const zopfli = require("@gfx/zopfli");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: true,
    runtimeCompiler: true,
    productionSourceMap: false,
    configureWebpack: config => {
        const plugins = [];
        if (IS_PROD) {
            plugins.push(
                new CompressionWebpackPlugin({
                    algorithm(input, compressionOptions, callback) {
                        return zopfli.gzip(input, compressionOptions, callback);
                    },
                    compressionOptions: {
                        numiterations: 15
                    },
                    minRatio: 0.99,
                    test: productionGzipExtensions
                })
            );
            plugins.push(
                new BrotliPlugin({
                    test: productionGzipExtensions,
                    minRatio: 0.99
                })
            );
        } else {
            // 为开发环境修改配置...
        }
        config.plugins = [...config.plugins, ...plugins];
    },
    chainWebpack: config => {
        // 让 babel 转码一些最新的 js API
        config.entry('main').add('babel-polyfill')
        config.module
          .rule('image')
          .test(/\.ico$/)
          .use('url-loader')
          .loader('url-loader')
      },
}