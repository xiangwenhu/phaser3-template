import webpack, { Configuration } from "webpack";
import merge from "webpack-merge";
// import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import WebpackObfuscator from 'webpack-obfuscator';


import { config as baseConfig } from "./base.config";


const definePlugin = new webpack.DefinePlugin({
    IS_LOCAL: false
});

const obfuscatorPlugin = new WebpackObfuscator(
    {
        rotateStringArray: true,
        stringArray: true,
        stringArrayThreshold: 0.75
    },
    ['sw.js']
)

const config: Configuration = {
    mode: "production",
    plugins: [definePlugin, obfuscatorPlugin],
    // 优化
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false
            })
        ],
        minimize: true,
        splitChunks: {
            chunks: "all", // 匹配的块的类型：initial（初始块），async（按需加载的异步块），all（所有块）
            automaticNameDelimiter: "-",
            cacheGroups: {
                // 项目第三方组件
                vendor: {
                    name: false,
                    enforce: true, // ignore splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests and splitChunks.maxInitialRequests
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10
                    // filename: "vendor.[hash].js"
                },
                // 项目公共组件
                default: {
                    minSize: 0, // 分离后的最小块文件大小默认3000
                    name: "common", // 用以控制分离后代码块的命名
                    minChunks: 2, // 最小共用次数
                    priority: 10, // 优先级，多个分组冲突时决定把代码放在哪块
                    reuseExistingChunk: true
                }
            }
        }
    }
};

const mergedConfig = merge(baseConfig, config);
// console.log("production:", mergedConfig);
module.exports = mergedConfig;
