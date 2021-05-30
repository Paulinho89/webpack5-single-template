const WebpackConfig = require("./webpack.config.base.js");
const { merge: WebpackMerge } = require("webpack-merge");
const Webpack = require("webpack");

module.exports = WebpackMerge(WebpackConfig, {
    mode: "development",
    target: "web",
    devServer: {
        port: 3000,
        hot: true,
        contentBase: "../dist"
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
});
