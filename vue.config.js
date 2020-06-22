module.exports = {
  // disable the linter
  lintOnSave: false,

  // we serve our staging server at relative path, at messageofprotest.com/staging
  // we need to set the publicPath so webpack generated resources have correct paths
  publicPath: process.env.SERVER === 'staging'
    ? '/staging/' : '/',
}
