import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import PATHS from '../paths';

process.env.NODE_ENV = 'development';
import common from './common';

const devConfig = merge(common, {
  devtool: 'inline-source-map',
  entry: [PATHS.hotPoll, PATHS.mainEntry],
  externals: [
    nodeExternals({
      allowlist: [PATHS.nodeModules, PATHS.hotPoll],
    }),
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new NodemonPlugin({
      script: PATHS.nodemonScript,
      watch: PATHS.build,
      ext: 'cjs',
    }),
  ],
  watch: true,
});

export default devConfig;
