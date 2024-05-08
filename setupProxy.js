// NOTICE: 
// manual proxy for rewriting not work
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const serverMap = {
  dev: 'https://api.cloudprg.cn/api',
  prod: 'https://api.cloudprg.cn/api',
}

const proxySuffix = serverMap[env];

module.exports = {
  serverMap,
  proxySuffix
}
