export interface ResponseData<T> {
    errCode: number;
    errMsg?: string;
    data: T;
}
