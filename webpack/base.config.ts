import path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import { config as loadConfig } from "dotenv";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from "webpack";
import { getPlugins } from "./utils/plugins";
import { getVersion } from "./utils/util";
import { DIST_PATH, IS_PRO, IS_DEV, NODE_ENV, SRC_PATH, ENV_CONFIG_PATH, getCDNPath } from "./utils/variable";

const resolveConfig = require("./resolve");

console.log("::ENV_CONFIG_PATH", ENV_CONFIG_PATH);

loadConfig({
    path: ENV_CONFIG_PATH
});

const version = getVersion();

// TODO:: 修改path

// eslint-disable-next-line import/prefer-default-export
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
        publicPath: getCDNPath(),
    },
    devtool: IS_DEV ? "source-map" : false,
    // stats: 'errors-only',
    plugins: getPlugins() as any[],
    cache: {
        type: "memory"
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
                            workers: require("os").cpus().length - 1,
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
                type: 'asset/resource',
                generator: {
                    filename: (context: any) => {
                        // demo: src/assets/images/phaser-logo.png
                        const { filename } = context;
                        const filePath = path.resolve(__dirname, "../", filename);

                        // 获得相对路径 assets\images\phaser-logo.png
                        const relativePath = path.relative(SRC_PATH, filePath);
                        // 截取 assets\images
                        const pre = relativePath.slice(0, relativePath.lastIndexOf("\\"));

                        // console.log("filename:", filename,  "filePath:", filePath, " src_path", SRC_PATH, " relativePath:", relativePath);

                        // console.log("pre", pre);

                        return `${pre}/[name].[hash:6][ext]`;
                    }
                },
                // use: [
                //     {
                //         loader: "file-loader",
                //         options: {
                //             name: "[folder]/[name].[ext]",
                //             // outputPath: "images/",
                //             limit: 0,
                //             esModule: false
                //         },
                //     },
                //     {
                //         loader: 'image-webpack-loader',
                //         options: {
                //             mozjpeg: {
                //                 progressive: true,
                //                 quality: 85
                //             },
                //             optipng: {
                //                 enabled: false,
                //             },
                //             pngquant: {
                //                 quality: [0.65, 0.90]
                //             },
                //             gifsicle: {
                //                 interlaced: false,
                //             }
                //         }
                //     }
                // ]
            }
        ]
    },
    externals: {
        phaser: "Phaser"
    },
    resolve: resolveConfig
};
