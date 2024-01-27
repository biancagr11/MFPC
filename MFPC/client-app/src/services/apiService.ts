import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private _api: AxiosInstance;

  constructor() {
    this._api = axios.create({
        timeout: 30000,
        baseURL: 'https://localhost:7081/', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
    });
  }

  public get<ResponseDataType, Response = AxiosResponse<ResponseDataType>>(url: string, config?: AxiosRequestConfig): Promise<Response> {
    return this._api.get(url, config);
  }

  public post<ResponseDataType, BodyType, Response = AxiosResponse<ResponseDataType>>(url: string, data: BodyType, config?: AxiosRequestConfig): Promise<Response> {
    return this._api.post(url,data, config);
  }

  public put<ResponseDataType, BodyType, Response = AxiosResponse<ResponseDataType>>(url: string, data: BodyType, config?: AxiosRequestConfig): Promise<Response> {
    return this._api.put(url,data,config);
  }
}

export default new ApiService();