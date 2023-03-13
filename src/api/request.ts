import axios from "axios";
// import store from '@/store'; //这部分自己解决
import router from '@/router'; //这部分自己解决
// 引入 axios 实例
import type {AxiosInstance} from "axios";
import {ElLoading,ElMessage, ElMessageBox } from "element-plus";
// 引入 Loading实例
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.d.js';
import type { BsRequestConfig, BsResponse } from "@/utils/type/baseType";
import { useUserStore } from "@/stores/store";
import { Unlock } from ".";


/**
 * 数据请求-处理 类
 */

class RgRequest {
  instance: AxiosInstance; //axios实例
  showLoading: boolean; // 是否开启Loading
  loading?: LoadingInstance; //Loading实例
  constructor(config: BsRequestConfig) {
    
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? false;
    //请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        //是否Loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgb(0,0,0)"
          });
        }
        const store = useUserStore() // 定义 store 接收
        //是否token
        if(store.accessToken){
          config.headers['Authorization'] = store.accessToken
        }

        //当为get请求，将data数据给params
        if(config.method==='get'){
          config.params = config.data;
        }

        //添加时间戳防止url缓存，后端防止重放攻击
        let timestamp = Date.parse(new Date().toString()) / 1000
        if (config.url.indexOf('?') > -1) {
          config.url += `&n=${timestamp}`
        } else {
          config.url += `?n=${timestamp}`
        }
        return config;
      },
      (err) => {
        console.log("请求拦截失败");
        return err;
      }
    );
    //接收拦截
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("所有实例的拦拦截器:响应拦截成功");
        //将loading移除
        this.loading?.close();
        const data:BsResponse<any> = res.data as any;
        //其他 code处理按照自己项目处理
        if (data.code !== 200) {
          console.log('请求结果:',data);
          errorCodeType(data)
          return data;
        } 
        else {
          return data;
        }
      },
      (err) => {
        console.log("响应拦截失败");
        this.loading?.close();
        if (err.response.status === 404) {
          console.log("404的错误");
        }
        return err;
      }
    );
  }
  private async request<T>(config: BsRequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			if (config.showLoading === true) {
				this.showLoading = config.showLoading;
			}
			this.instance
				.request<any, any>(config)
				.then(res => {
					this.showLoading = false;
					resolve(res);
				})
				.catch(err => {
					this.showLoading = false;
					reject(err);
					return err;
				});
		});
 }
  
/**
 * get 请求
 * @param config 参数
 * @returns 
 */
  public async get<T = any>(config: BsRequestConfig): Promise<BsResponse<T>> {
    return this.request<BsResponse<T>>({...config, method: "get"});
  }
  
  /**
   * post请求
   * @param config 
   * @returns 
   */
  public async post<T = any>(config: BsRequestConfig): Promise<BsResponse<T>> {
    return this.request<BsResponse<T>>({...config, method: "post"});
  }
  
  /***
   * delete请求
   */
  public async delete<T = any>(config: BsRequestConfig): Promise<BsResponse<T>> {
    return this.request<BsResponse<T>>({...config, method: "delete"});
  }
 
  /***
   * patch请求 局部更新使用
   */
  public async patch<T = any>(config: BsRequestConfig): Promise<BsResponse<T>> {
    return this.request<BsResponse<T>>({...config, method: "patch"});
  }

  /***
   * put请求 
   */
   public async put<T = any>(config: BsRequestConfig): Promise<BsResponse<T>> {
    return this.request<BsResponse<T>>({...config, method: "put"});
  }
}
 
export default RgRequest;

const errorCodeType = function(data:any){
  let msg:string = ""
  switch (data.code) {
      case 401:
          ElMessage.error('认证失败，无法访问系统资源');
          break;
      case 403:
          ElMessage.error('当前操作没有权限');
          break;
      case 404:
          ElMessage.error('访问资源不存在');
          break;
      case 90001:
            ElMessageBox.prompt('', '您的账号被锁定，请解锁！', {
              confirmButtonText: '立即解锁',
              cancelButtonText: '取消',
              inputPlaceholder:'请输入密码',
              center: true,
              inputPattern:
                /^[0-9]*$/,
              inputErrorMessage: '请输入密码',
              })
              .then(({ value }) => {
                console.log("value",value)
                let params = {
                  pwd:value
                }
                const res = Unlock('data/Unlock',JSON.stringify(params));
                console.log(res)
                if(!value){
                  ElMessage.error(!value?'请输入密码':'');
                  return;
                }
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: 'Input canceled',
                })
              })
            //调用全局组件
            break;
      case "default":
          ElMessage.error('系统未知错误，请反馈给管理员');
          break;
      default:
          ElMessage.error(data.message);
  }
}
