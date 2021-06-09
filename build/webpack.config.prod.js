const Path = require("path");
const Webpack = require("webpack");
const { merge: WebpackMerge } = require("webpack-merge");
const WebpackConfig = require("./webpack.config.base.js");

const { resolve } = Path;

module.exports = WebpackMerge(WebpackConfig, {
    mode: "production",
    devtool: "hidden-source-map",
    entry: {
        app: resolve(__dirname, "../src/main")
    },
    plugins: [
        new Webpack.DllReferencePlugin({
            manifest: require("../library/library.json")
        })
    ]
});
