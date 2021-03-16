import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CopyWebpackPlugin from "copy-webpack-plugin";
import DotenvPlugin from "dotenv-webpack";
import path from "path";

import { SRC_PATH, DIST_PATH, NODE_ENV, IS_PRO, ENV_CONFIG_PATH, getCDNPath } from "./variable";


// peerDependencies WARNING script-ext-html-webpack-plugin@* requires a peer of webpack@^1.0.0 || ^2.0.0 || ^3.0.0 || ^4.0.0 but webpack@5.4.0 was installed


export function getPlugins() {

    // clean
    const cleanPlugin = new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", '!dll', '!dll/*.*']
    });

    // script ext
    const scriptExtHtmlWebpackPlugin = new ScriptExtHtmlWebpackPlugin({
        custom: {
            test: /\.js$/,
            attribute: 'crossorigin',
            value: 'anonymous'
        }
    });


    // define
    const definePlugin = new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
        // 只有产线才使用cdn , development/test使用本地
        LOG_PATH: JSON.stringify(process.env["LOG_PATH"]),
        BAIDU_STATISTICS_KEY: JSON.stringify(process.env["BAIDU_STATISTICS_KEY"]),
        CDN_ROOT: JSON.stringify(process.env.CDN_ROOT),
        CDN_PATH: JSON.stringify(getCDNPath())
    });

    const copyPlugin = new CopyWebpackPlugin({
        patterns: [
            { from: 'src/assets', to: 'assets' },
            // { from: 'pwa', to: '' },
            { from: 'src/favicon.ico', to: '' }
        ]
    });

    const dotenvPlugin = new DotenvPlugin({
        path: ENV_CONFIG_PATH
    });

    const dllLibraryPlugin = new webpack.DllReferencePlugin({
        manifest: path.join(__dirname, "../../dist/dll/library-manifest.json")
    })

    return [
        cleanPlugin,
        ...getHTMLPlugins(),
        scriptExtHtmlWebpackPlugin,
        definePlugin,
        copyPlugin,
        dotenvPlugin,
        dllLibraryPlugin
    ]

}

function getHTMLPlugins() {

    const htmlPlugin = new HtmlWebpackPlugin({
        template: `${SRC_PATH}/index.html`,
        filename: `${DIST_PATH}/index.html`,
        inject: 'body',
        hash: true, // 会在打包好的bundle.js后面加上hash串
        chunks: ["index"],
        title: "",
        minify: {
            removeComments: true, // 删除注释
            collapseWhitespace: true,
            minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
            minifyJS: true // 压缩 HTML 中出现的 JS 代码
        },
        page: "index"
    });


    return [htmlPlugin]
}

