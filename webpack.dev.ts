import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import common from './webpack.common';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IDENTITY_SERVER_URL: "'http://localhost:5000'",
      API_URL: "'http://localhost:5200'",
      SPA_URL: "'http://localhost:5100'",
      MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
      MAPBOX_STYLE: process.env.MAPBOX_STYLE,
    }),
  ],
});
