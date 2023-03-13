
import Request from './api'
/**
 * 获取验证码
 * @param url api地址
 * @param data 入参
 * @param type 注册或者登录类型
 * @returns 
 */
export function GetCode(url:string, data: object, type:string) {
  // any 是接口 data里面 返回的数据类型，默认不写是 any
  //可以自己声明接收类型 、与后端接口dto类似
  return Request.get<any>({
    url: url, //自己的接口路由
    data
  })
}
/**
 * 获取token
 * @param url api地址
 * @param data 入参
 * @returns 
 */
export function GetToken(url:any, data: any) {
  // any 是接口 data里面 返回的数据类型，默认不写是 any
  //可以自己声明接收类型 、与后端接口dto类似
  return Request.post<any>({
    url: url, //自己的接口路由
    headers: {
      "Content-Type": "application/json"
    }, //按照自己的后端接口要求来
    data
  })
}
/**
 * 获取后台应用模块
 * @param url api地址
 * @returns 
 */
export function GetModules(url:string) {
  // any 是接口 data里面 返回的数据类型，默认不写是 any
  //可以自己声明接收类型 、与后端接口dto类似
  return Request.get<any>({
    url: url, //自己的接口路由
    headers: {
      "Content-Type": "application/json"
    }, 
  })
}
/**
 * 解锁
 * @param url api地址
 * @param data 入参
 * @returns 
 */
export function Unlock(url:any, data: any) {
  // any 是接口 data里面 返回的数据类型，默认不写是 any
  //可以自己声明接收类型 、与后端接口dto类似
  return Request.post<any>({
    url: url, //自己的接口路由
    headers: {
      "Content-Type": "application/json"
    }, //按照自己的后端接口要求来
    data
  })
}


