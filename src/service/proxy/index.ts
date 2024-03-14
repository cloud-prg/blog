// manual proxy for rewriting not work
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const serverMap = {
  dev: 'http://localhost:3002/api',
  prod: 'http://localhost:3002/api',
}

export const proxySuffix = serverMap[env];
