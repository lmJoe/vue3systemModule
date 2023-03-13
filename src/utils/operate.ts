// vuex 数据
// import {useCounterStore} from '../stores/store'
export default {
    //接口地址
    baseUrl: function () {
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV == "development") {
            //开发环境
            return "https://adminapi.pxtadmin.com:58081";
        } else {
            //正式环境
            return "https://adminapi.pxtadmin.com:58081";
        }
    },
    /*
        格式化时间 加上时分秒
        num: 后台时间格式
        type: 'YY-MM-DD'年月日 ,'HH-MM-SS'时分秒 ,不传 年月日时分秒
    */
    happenTime: function (num: any, type: String) {
        let date = new Date(num * 1000);
        //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let y: any = date.getFullYear();
        let MM: any = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM; //月补0
        let d: any = date.getDate();
        d = d < 10 ? ('0' + d) : d; //天补0
        let h: any = date.getHours();
        h = h < 10 ? ('0' + h) : h; //小时补0
        let m: any = date.getMinutes();
        m = m < 10 ? ('0' + m) : m; //分钟补0
        let s: any = date.getSeconds();
        s = s < 10 ? ('0' + s) : s; //秒补0
        if (type === 'YY-MM-DD') {
            //年月日
            return y + '-' + MM + '-' + d;
        } else if (type === 'HH-MM-SS') {
            //时分秒
            return h + ':' + m + ':' + s;
        } else {
            //全部
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
    },
    getCookie: (name: string) => {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    },

    //设置cookie,增加到vue实例方便全局调用
    setCookie: (c_name: any, value: any, expiredays: any) => {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
    }
}
