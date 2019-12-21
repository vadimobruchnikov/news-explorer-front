const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ghpages = require('gh-pages');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  performance: {
    maxAssetSize: 100000,
  },
  entry: {
    index: './src/pages/index/index.js',
    //dashboard: './src/pages/dashboard/dashboard.js',
    //about: './src/pages/about/about.js',
  },
  output: {
    // link on current folder __dirname and relative path to the end point (default - dist)
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/, // use for js
      exclude: /node_modules/, // excludes node_modules
      use: {
        loader: 'babel-loader',
        // options: {
        //     presets: 'env'
        // }
      },
    },
    {
      test: /\.css$/, // use for CSS
      use: [
        {
          loader:
                    MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        },
        'css-loader', 'postcss-loader',
      ],
    },
    {
      test: /\.(gif|png|jpe?g|svg|webp|ico)$/i,
      use: [
        'file-loader?name=./images/[name].[ext]',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 90,
            }, // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.75, 0.90],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            }, // the webp option will enable WEBP
            webp: {
              quality: 90,
            },
          },
        },
      ],
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]',
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false, // no need declarate style into tags
      // hash: true, // use track hash for page
      template: './src/pages/index/index.html', // html track start point file
      filename: 'index.html', // html end point file (deault - dist)
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new WebpackMd5Hash(), // hashing
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
