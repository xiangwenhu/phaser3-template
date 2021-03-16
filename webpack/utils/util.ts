import fs from "fs";

export function readFile(path) {
    const content = fs.readFileSync(path, "utf-8");
    return content;
}

export function getVersion() {
    const version =  process.env.version;
    return version;
}


export default {
    readFile,
    getVersion
};
