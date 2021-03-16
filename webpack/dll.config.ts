import { Configuration, DllPlugin } from "webpack";
import path from "path";

const dllPath = path.join(__dirname, '../dist/dll');

const config: Configuration = {
    mode: "production",
    entry: {     
        library: [  
            "axios"    
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: dllPath,
        library: '[name]_[fullhash]'
    },
    plugins: [
        new DllPlugin({
            name: '[name]_[fullhash]',
            path: path.join(dllPath, '[name]-manifest.json')
        })
    ],
    optimization:  {
        minimize: true
    }
};

module.exports = config;
