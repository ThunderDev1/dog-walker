/* eslint @typescript-eslint/camelcase: 0 */
import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebPackPlugin from 'html-webpack-plugin';
import * as WebpackPwaManifest from 'webpack-pwa-manifest';
// @ts-ignore
import * as OfflinePlugin from 'offline-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const config: webpack.Configuration = {
  entry: {
    main: './src/index.tsx',
    silentRenew: './silentRenew/index.js',
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: ['url-loader?limit=25000'],
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './index.html',
      favicon: 'favicon.ico',
      excludeChunks: ['silentRenew'],
    }),
    new HtmlWebPackPlugin({
      template: './silentRenew/silentRenew.html',
      filename: 'silentRenew.html',
      chunks: ['silentRenew'],
    }),
    new WebpackPwaManifest({
      name: 'Nova',
      short_name: 'Nova',
      description: 'Application pour balader son chien',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      crossorigin: 'anonymous',
      start_url: '.',
      display: 'standalone',
      orientation: 'portrait-primary',
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        },
      ],
    }),
    new OfflinePlugin({
      responseStrategy: 'network-first',
      ServiceWorker: {
        entry: './serviceWorker.js',
      },
    }),
  ],
};

export default config;
