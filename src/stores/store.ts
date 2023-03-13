import { defineStore } from 'pinia'
export const useUserStore = defineStore('storeUser', {
  state:()=>{
    return {
      accessToken: '',
    }
  },
  // 使用该插件，开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      { 
        storage: localStorage,
        paths: ['accessToken'] 
      },
    ],
  },
})