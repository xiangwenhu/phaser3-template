import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CopyWebpackPlugin from "copy-webpack-plugin";
import DotenvPlugin from "dotenv-webpack";
import path from "path";
import { GenerateSW, ManifestEntry } from "workbox-webpack-plugin";

import { SRC_PATH, DIST_PATH, NODE_ENV, IS_PRO, ENV_CONFIG_PATH, getCDNPath, packageJson } from "./variable";


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
            // { from: 'src/assets', to: 'assets' },
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
        dllLibraryPlugin,
        generateSW()
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


export function generateSW() {
    return new GenerateSW({
        cacheId: packageJson.name,
        // globFollow: true,  不支持
        // globDirectory: 'dist', 不支持
        // globPatterns: '**/*.{html,js,css,png,svg,jpg,gif,json}',  不支持
        // dontCacheBustUrlsMatching: /\.\w{8}\./,  不支持

        swDest: path.resolve(DIST_PATH, "sw.js"),
        sourcemap: false,
        inlineWorkboxRuntime: false,
        offlineGoogleAnalytics: false,
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        include: [/\.html$/, /\.css$/, /\.js$/, /\.png$/, /\.jpg$/, /\.json$/],
        // ignoreURLParametersMatching: [/a/],
        // modifyURLPrefix: {
        //     
        // },
        // manifestTransforms: [(manifestEntries : readonly ManifestEntry[]) => {
        //     const manifest = manifestEntries.filter(entry => {
        //         return entry.url.indexOf("") >= 0;
        //     });
        //     return { manifest, warnings: [] };
        // }],
        // chunks: [""],
        // importScripts: [""],
        // importScriptsViaChunks: [""],    // chunks 引入到 service worker
        additionalManifestEntries: [
            {
                url: "https://cdnjs.cloudflare.com/ajax/libs/phaser/3.53.1/phaser.min.js",
                revision: "1.0.0"
            }
        ],
        // runtimeCaching: [{
        //     urlPattern: /^https:\/\//,
        //     handler: 'CacheFirst',
        //     options: {
        //         cacheName: 'batting-lottie',
        //         expiration: {
        //             maxAgeSeconds: 86400 * 1,
        //             maxEntries: 100
        //         },
        //         cacheableResponse: {
        //             statuses: [0, 200]
        //         }
        //     }
        // }]
    })
}

