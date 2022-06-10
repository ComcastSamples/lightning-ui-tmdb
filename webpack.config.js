const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const { getIfUtils } = require('webpack-config-utils');
const TerserPlugin = require('terser-webpack-plugin');
const GenerateFilePlugin = require('generate-file-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const gitRevisionPlugin = new GitRevisionPlugin({
  branch: true
});

module.exports = (env) => {
  const { ifProduction } = getIfUtils(env);

  // ASSET_PATH is the target directory in case you use folders
  const ASSET_PATH = (env.ASSET_PATH && !env.ASSET_PATH.startsWith('/') ? '/' + env.ASSET_PATH : env.ASSET_PATH) || '';
  const outputPath = 'dist' + ASSET_PATH;

  let config = {
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: ifProduction('main.bundle.[contenthash].js', 'main.bundle.js'),
      path: path.resolve(__dirname, outputPath),
      publicPath: (ASSET_PATH || '') + '/'
    },
    resolve: {
      alias: {
        'src': path.resolve(__dirname, 'src'),
        'test': path.resolve(__dirname, 'test'),
        'assets': path.resolve(__dirname, 'assets')
      },
      mainFields: [ 'module', 'main' ],
      fallback: {
        'fs': false,
        'tls': false,
        'net': false,
        'path': false,
        'zlib': false,
        'http': false,
        'https': false,
        'stream': false,
        'crypto': false,
        'crypto-browserify': false,
      },
      extensions: [ '.js', '.mjs', '.json' ]
    },
    optimization: ifProduction({
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
            keep_fnames: true
          }
        })
      ]
    }, {}),
    module: {
      rules: [
        {
          test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        },
      ]
    },
    plugins: [
      new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
      gitRevisionPlugin,
      new GenerateFilePlugin({
        file: 'version.json',
        content: () => {
          let manifest = {
            version: pkg.version,
            gitVersion: gitRevisionPlugin.version(),
            commit: gitRevisionPlugin.commithash(),
            branch: gitRevisionPlugin.branch(),
          };
          return JSON.stringify(manifest, null, 2);
        }
      }),
      new webpack.BannerPlugin({
        banner: `version ${pkg.version}`
      }),
      new HtmlWebpackPlugin({
        inject: 'head',
        template: 'index.html',
        PLAYER_VERSION,
        ASSET_PATH,
        version: `${pkg.version}`,
        scriptLoading: 'blocking'
      }),
      new HtmlWebpackPlugin({
        inject: 'head',
        template: 'index.html',
        filename: 'index-d.html',
        version: `${pkg.version}`,
        useInspector: true,
        PLAYER_VERSION,
        ASSET_PATH,
        scriptLoading: 'blocking'
      }),
      env.dev && new Dotenv(),
      !env.dev && new webpack.DefinePlugin({
        'process.env': '{}',
      }),
    ].filter(plugin => plugin)
  };

  let appLaunchUrl = 'index-d.html?' +
    `language=${process.env.LANGUAGE || 'en'}` +
    `&locale=${process.env.LOCALE || 'US'}`;

  if (env.dev) {
    config = {
      ...config,
      devtool: 'inline-source-map',
      devServer: {
        host: 'localhost',
        contentBase: path.join(__dirname, outputPath),
        compress: true,
        port: 8080,
        index: '/index-d.html',
        historyApiFallback: {
          rewrites: [
            { from: /./, to: '/index-d.html' }
          ]
        },
        hot: true,
        disableHostCheck: true,
        open: true,
        openPage: appLaunchUrl,
        writeToDisk: true // For debugging build output
      }
    };
  }
  return config;
};
