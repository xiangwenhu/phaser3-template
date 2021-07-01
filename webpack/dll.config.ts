/* eslint-disable import/no-extraneous-dependencies */
import { Configuration, DllPlugin } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

import path from "path";
import { DIST_PATH, SRC_PATH } from "./utils/variable";

const dllPath = path.join(__dirname, '../dist/dll');

const config: Configuration = {
    mode: "production",
    entry: {
        library: [
            "axios",
            "socket.io-client"
        ]
    },
    output: {
        filename: '[name].[fullhash:8].dll.js',
        path: dllPath,
        library: '[name]_[fullhash]'
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(DIST_PATH, "dll/**/*")]
        }) as any,
        new DllPlugin({
            name: '[name]_[fullhash]',
            path: path.join(dllPath, '[name]_[fullhash:8].manifest.json')
        })
    ],
    optimization: {
        minimize: true
    }
};

module.exports = config;
