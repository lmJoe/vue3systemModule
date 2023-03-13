# vue3project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## 1.该模板采用vue3+ts+setup
## 2.数据存存储使用本地持久化Pinia
  ## 存储(组件内使用) 以accessToken为例 token为存储值
  ```vue
    <script setup lang="ts">
        import { useUserStore} from '@/stores/store' // 引用 pinia 数据 
         const store = useUserStore() // 定义 store 接收
         store.accessToken = token;
    </script>
  ```
## 3.token使用cookie存储
  ### 组件内使用方法 `proxy.$operate.setCookie('存储变量名',数据,存储时间)` `proxy.$operate.getCookie('存储变量名',数据,存储时间)`
    ```vue
      <script setup lang="ts">
          proxy.$operate.setCookie('存储变量名',数据,存储时间)
          proxy.$operate.getCookie('存储变量名',数据,存储时间)
      </script>
    ```
## 4.验证码
## 5.axios接口请求封装
## 6.拦截器添加