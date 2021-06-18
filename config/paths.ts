import { resolve } from 'path';
import { realpathSync } from 'fs';

const appDirectory = realpathSync(process.cwd());
const resolveApp = (relativePath: string): string => resolve(appDirectory, relativePath);

const PATHS: { [k: string]: any } = {
  appDirectory,
  mainEntry: resolveApp('index.ts'),
  build: resolveApp('build'),
  dist: resolveApp('dist'),
  config: resolveApp('config'),
  src: resolveApp('src'),
  types: resolveApp('types'),
  envFiles: {
    production: resolveApp('config/.env/production'),
    development: resolveApp('config/.env/development'),
  },
  prodScript: resolveApp('dist/index.production.cjs'),
  nodemonScript: resolveApp('build/index.development.cjs'),
  nodeModules: resolveApp('node_modules'),
  hotPoll: resolveApp('node_modules/webpack/hot/poll'),
};

export default PATHS;
