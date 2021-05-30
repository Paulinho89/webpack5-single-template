const Path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const BasePlugins = require("./plugins");

const { resolve } = Path;

const PATHS = {
    src: Path.join(__dirname, "src")
};

module.exports = {
    entry: {
        app: resolve(__dirname, "../src/main")
    },
    output: {
        filename: "js/[name]-[hash:6].js",
        chunkFilename: "js/[name]-[chunkhash:6].js",
        path: resolve(__dirname, "../dist")
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require("autoprefixer")({
                                    overrideBrowserslist: ["last 2 version", ">1%", "ios 7"]
                                })
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require("autoprefixer")({
                                    overrideBrowserslist: ["last 2 version", ">1%", "ios 7"]
                                })
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "thread-loader",
                        options: {
                            workers: 3
                        }
                    },
                    "babel-loader",
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            outputPath: "img/",
                            name: "[name]-[hash:6].[ext]"
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                          mozjpeg: {
                            progressive: true,
                            quality: 65
                          },
                          // optipng.enabled: false will disable optipng
                          optipng: {
                            enabled: false,
                          },
                          pngquant: {
                            quality: "65-90",
                            speed: 4
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          // the webp option will enable WEBP
                          webp: {
                            quality: 75
                          }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "fonts/",
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        ...BasePlugins,
        new MiniCssExtractPlugin({
            filename: "[name]_[contenthash:8].css"
        }),
        // 开启css的tree-shaking
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        })
    ],
    cache: {      
        // 将缓存类型设置为文件系统      
        type: "filesystem",       
        buildDependencies: {        
            /* 将你的 config 添加为 buildDependency，           
               以便在改变 config 时获得缓存无效*/        
            config: [__filename],        
            /* 如果有其他的东西被构建依赖，           
               你可以在这里添加它们*/        
            /* 注意，webpack.config，           
               加载器和所有从你的配置中引用的模块都会被自动添加*/      
        },      
        // 指定缓存的版本      
        version: "1.0"     
    },
    resolve: {
        extensions: [".js", ".json", ".css", ".less", ".vue"],
        alias: {
            vue$: "vue/dist/vue.common.js",
            "@": resolve(__dirname, "../src")
        }
    }
};
