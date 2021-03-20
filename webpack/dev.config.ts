import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import merge from "webpack-merge";
import { config as baseConfig } from "./base.config";
import { DIST_PATH } from "./utils/variable";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const hotPlugin = new webpack.HotModuleReplacementPlugin();
const definePlugin = new webpack.DefinePlugin({
    IS_LOCAL: true
});

const config: Configuration = {
    mode: "development",
    plugins: [definePlugin, hotPlugin],
    devServer: {
        open: "chrome",
        contentBase: DIST_PATH,
        compress: true,
        publicPath: "/",
        host: "localhost",
        // host: "0.0.0.0",
        port: 8083,
        disableHostCheck: true,
        hot: true,
        // stats: 'errors-only',
        proxy: {
            // "/service": {
            //     target: "http://localhost:3000"
            // }          
        }
    }
};

export default merge(baseConfig, config);
