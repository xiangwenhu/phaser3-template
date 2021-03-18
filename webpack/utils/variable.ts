import path from "path";

export const { NODE_ENV, API_ENV } = process.env;

export const DIST_PATH = path.resolve(__dirname, "../../", "dist");
export const SRC_PATH = path.resolve(__dirname, "../../", "src");
export const PUBLIC_PATH = path.resolve(__dirname, "../../", "public");
export const ROOT_PATH = path.resolve(__dirname, "../../");

export const IS_PRO = NODE_ENV === 'prod';
export const IS_DEV = NODE_ENV === "dev";

export function getCDNPath(){
    return IS_PRO ? `/` : "/"
}


export const  packageJson = require("../../package");


export const ENV_CONFIG_PATH =  `./env/${NODE_ENV || "dev"}.env`



console.log('::NODE_ENV', NODE_ENV, '  API_ENV:', API_ENV);


