const Path = require("path");
const { merge: WebpackMerge } = require("webpack-merge");
const WebpackConfig = require("./webpack.config.base.js");

module.exports = WebpackMerge(WebpackConfig, {
    mode: "production",
    devtool: "source-map"
});
