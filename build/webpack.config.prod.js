const Webpack = require("webpack");
const { merge: WebpackMerge } = require("webpack-merge");
const WebpackConfig = require("./webpack.config.base.js");

module.exports = WebpackMerge(WebpackConfig, {
    mode: "production",
    devtool: "hidden-source-map",
    plugins: [
        new Webpack.DllReferencePlugin({
            manifest: require("../library/library.json")
        })
    ]
});
