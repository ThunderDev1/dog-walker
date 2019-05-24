import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import common from './webpack.common';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      IDENTITY_SERVER_URL: "'http://localhost:5000'",
      API_URL: "'http://localhost:5200'",
      SPA_URL: "'http://localhost:5100'",
      MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
      MAPBOX_STYLE: process.env.MAPBOX_STYLE,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
