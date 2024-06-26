// NOTICE: 
// manual proxy for rewriting not work
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const serverMap = {
  // dev: 'http://localhost:3002/api',
  dev: 'http://114.55.7.80:4002/api',
  // prod: 'http://localhost:3002/api',
  prod: 'http://114.55.7.80:4002/api',
}

const proxySuffix = serverMap[env];

module.exports = {
  serverMap,
  proxySuffix
}
