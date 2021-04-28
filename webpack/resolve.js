const path = require('path');

const SRC_PATH = path.join(__dirname, "../src");

module.exports = {
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
};
