import axios from "axios";
import RgRequest from "./request";
axios.defaults.baseURL ='/api'
const Request = new RgRequest({
  // baseURL: import.meta.env.VITE_BASE_API, //请求根Url,url = baseUrl+requestUrl（api路由）
  // baseURL: 'https://adminapi.pxtadmin.com:58081', //请求根Url,url = baseUrl+requestUrl（api路由）
  withCredentials: false,  //跨域请求时发送Cookie
  timeout: 10*1000, //超时时间
  // ... 其他配置自行查看axios 参数
}); //这点的 BsRequestConfig类型 交集(&) 了 AxiosRequestConfig
 
export default Request;