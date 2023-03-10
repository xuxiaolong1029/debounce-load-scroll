### debounce-load-scroll

[![npm](https://img.shields.io/npm/v/debounce-load-scroll.svg)](https://www.npmjs.com/package/debounce-load-scroll)
[![npm](https://img.shields.io/npm/dw/debounce-load-scroll.svg)](https://npmtrends.com/debounce-load-scroll)
[![vue2](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)

#### 一款基于 vue3 带防抖的无限滚动加载数据的指令

```npm
npm i debounce-load-scroll
```

### 使用方法 一

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import debounceLoadScroll from 'debounce-load-scroll'
const app = createApp(App);
app.use(debounceLoadScroll);
app.mount("#app");
```

#### 默认用法
```html
<template>
  <div class="container" v-debounce-load-scroll="onLoad"></div>
</template>
<script lang="ts" setup>
const onLoad = ()=>{
  //api接口调用
}
</script>
```

#### 带参数用法（可以是自己封装的公共组件，也可以是引入的第三方组件）
```html
<template>
  <el-table v-debounce-load-scroll="{callback:onLoad,top:10,className:'.el-table__body-wrapper'}"></<el-table>
</template>
<script lang="ts" setup>
//top 指滑动到底部的距离才会触发onLoad事件，默认是0
//className 指子组件的类名，如果是类名是直接绑定在组件上，则用法和原生标签内用法使用一致
const onLoad = ()=>{
  //api接口调用
}
</script>
```
