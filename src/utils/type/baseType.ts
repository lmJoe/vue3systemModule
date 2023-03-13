import type { AxiosRequestConfig } from "axios";
import type { LoadingInstance } from "element-plus/es/components/loading/src/loading";

/**
 * api数据请求 类型
 */
export type BsRequestConfig = {
  showLoading?: boolean; // 是否开启Loading
  loading?: LoadingInstance; //Loading实例,
} & AxiosRequestConfig;

/**
* 请求返回数据 
*/
export type BsResponse<T> = {
  code?: number,
  data?: T,
  extras?: any,
  msg?: string,
  timestamp?: number
}

