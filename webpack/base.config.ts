
import path from "path";
import { config as loadConfig } from "dotenv";
import { Configuration } from "webpack";
import { getPlugins } from "./utils/plugins";
import { getVersion } from "./utils/util";
import { DIST_PATH, IS_PRO, IS_DEV, NODE_ENV, SRC_PATH, ENV_CONFIG_PATH, getCDNPath } from "./utils/variable";

console.log("::ENV_CONFIG_PATH", ENV_CONFIG_PATH);

loadConfig({
    path: ENV_CONFIG_PATH
});


const version = getVersion();

// TODO:: 修改path

export const config: Configuration = {
    entry: {
        index: path.join(SRC_PATH, "./index.ts")
    },
    output: {
        // 打包同步代码
        filename: !IS_PRO ? "[name].bundle.js" : "[name].[fullhash].bundle.js",
        path: DIST_PATH,
        globalObject: "this",
        // 打包异步代码
        chunkFilename: !IS_PRO ? "[name].chunk.js" : "[name].[fullhash].chunk.js",
        publicPath: getCDNPath()
    },
    devtool: IS_DEV ? "source-map" : false,
    // stats: 'errors-only',
    plugins: getPlugins() as any[],
    cache: {
        type: "filesystem"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [SRC_PATH],
                exclude: /node_modules/,
                use: [
                    {
                        loader: "cache-loader"
                    },
                    {
                        loader: "thread-loader",
                        options: {
                            workers: require("os").cpus().length * 2,
                            parallel: true
                        }
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            happyPackMode: true,
                            // 不做检查
                            transpileOnly: true
                            // compilerOptions: {
                            //     module: "esnext"
                            // }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[folder]/[name].[ext]",
                            outputPath: "images/",
                            limit: 0,
                            esModule: false
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 85
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90]
                            },
                            gifsicle: {
                                interlaced: false,
                            }
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        phaser: "Phaser"
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, "../node_modules")],
        // 查找 package.json main
        mainFields: ['main'],
        alias: {
            "@": SRC_PATH,
            "@images": path.resolve(SRC_PATH, 'images'),
            "@services": path.resolve(SRC_PATH, 'services'),
            "@util": path.resolve(SRC_PATH, 'util'),
            "@typess": path.resolve(SRC_PATH, 'types'),
            "@consts": path.resolve(SRC_PATH, "consts")
        }
    }

}