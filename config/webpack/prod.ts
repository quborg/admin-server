import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import RunNodeWebpackPlugin from 'run-node-webpack-plugin';
import PATHS from '../paths';

process.env.NODE_ENV = 'production';
import common from './common';

const { VERCEL, BUILD_ONLY } = process.env;
const onlyBuild = VERCEL || BUILD_ONLY;

const prodConfig = merge(common, {
  devtool: 'source-map',
  entry: PATHS.mainEntry,
  externals: [nodeExternals({})],
  plugins: [
    new CleanWebpackPlugin(),
    ...(onlyBuild ? [] : [new RunNodeWebpackPlugin({ scriptToRun: PATHS.prodScript })]),
  ],
});

export default prodConfig;
