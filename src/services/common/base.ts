import { AxiosRequestConfig } from "axios";
import getConfig from "./getConfig";
import { get, post } from "./request";

const configData = getConfig();

export default class BaseService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private getFullUrl = (url: string, params: any): string => {
        let curUrl = url;
        if (params) {
            const paramsArray: string[] = [];
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined) {
                    paramsArray.push(`${key}=${params[key]}`);
                }
            });
            if (url.indexOf("?") === -1) {
                curUrl += `?${paramsArray.join("&")}`;
            } else {
                curUrl += `&${paramsArray.join("&")}`;
            }
        }
        return curUrl;
    };

    getFullPath = (path: string) => `${this.baseUrl}/${path}`;

    /**
     *  处理简单的Query参数
     * @param baseUrl 基础地址
     * @param query queryString
     * @param config 其他配置
     * @returns
     */
    getBySimpleQuery = <T>(baseUrl: string, query: Record<string, string> = {}, config?: AxiosRequestConfig): Promise<T> => {
        const curPath = this.getFullUrl(baseUrl, query);
        return this.get<T>(curPath, config);
    };

    get = <T>(path: string, config?: AxiosRequestConfig): Promise<T> =>
        get<T>(this.getFullPath(path), config);

    post = <T>(path: string, data: any = {}, config?: AxiosRequestConfig): Promise<T> =>
        post<T>(this.getFullPath(path), data, config);
}

export const apiService = new BaseService(configData.API_SERVER);

export const weatherService = new BaseService(configData.API_SERVER_WEATHER);
