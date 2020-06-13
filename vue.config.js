module.exports = {
  // disable the linter
  lintOnSave: false,
}

// configuring webpack publicpath temporarily, when we get a root level domain we can remove this #12
if(process.env.GITHUB_ACTIONS) {
    module.exports.publicPath = '/yay/'
}