import { GetCode } from '@/api'
import { onMounted, ref} from 'vue'
// 引入vant form类型 用来初始化form类型 可参考vant 若没有使用 则删除
// 封装方法   只需要传入手机号、 type类型
export const useSendCode = () => {
    // 定义定时器初始值为0
    const timer = ref(0)
    // 定义定时器id 为了清除定时器
    let timerId: number
    // 之后页面调用send方法来使用 
    const send = async (mobile:number,type: string) => {
        // 第二次点击 大于0时 直接 return
        if (timer.value > 0) return
        // 校验通过调用接口
        const params = {
          UserName: mobile,
        }
        const res = await GetCode('/code/GetVerifyCode',params, type);
        console.log("res",res)
        // 赋值倒计时  可修改成自己需要的时间
        timer.value = 60
        // 如果之前id存在可清除
        if (timerId) clearInterval(timerId)
        // 赋值定时器id
        timerId = setInterval(() => {
            // 时间-1
            timer.value--
            // 倒计时结束 清除定时器
            if (timer.value == 0)  clearInterval(timerId)
            
        }, 1000)
    }
    // 
    onMounted(() => {
        clearInterval(timerId)
    })
    return { timer, send }
}