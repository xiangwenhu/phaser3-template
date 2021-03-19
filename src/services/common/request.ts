import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const INVALID_TOKEN_CODES = [];

const instance = axios.create({
    timeout: 15000,
    headers: { "Content-Type": "application/json" }
});

// 发送前设置
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    instance.defaults.headers.common.platform = "";
    if (!navigator.onLine) {
        // TODO:: 
    }
    return config;
});

// 返回结果拦截
instance.interceptors.response.use(
    response => {
        const { data } = response;
        // 无效token
        if (typeof data === "object" && Reflect.has(data, "errCode") && INVALID_TOKEN_CODES.includes(data.errCode)) {
            // TODO:: 
        }

        return response;
    },
    error => {
        console.log("axios 请求错误", error);
        return Promise.reject(error);
    }
);

export function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get<T>(url, config).then((res: AxiosResponse) => res.data);
}

export function post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.post<T>(url, data, config).then((res: AxiosResponse) => res.data);
}

export function setAuthorization(token: string) {
    instance.defaults.headers.common.Authorization = token;
}
