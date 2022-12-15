import type { App } from "vue";
import type { Directive, DirectiveBinding } from "vue";
//防抖函数
type CallbackFn = (item?: any) => void
let timer: any = null
export const debounce = (Callback: CallbackFn, delay = 1000)=>{
  timer != null ? clearTimeout(timer) : null
  timer = setTimeout(() => {
    Callback && Callback() //当有值才会执行
  }, delay)
}
const loadScroll: Directive<any, void> ={
    mounted(el: HTMLElement, binding: DirectiveBinding){
        let className = binding.value.className
        let direction = Object.keys(binding.modifiers).length?binding.modifiers.down?'down':'up':'-'
        let preDistance = 100000
        const selectWrap = className?el.querySelector(className):el
        selectWrap.handler = (event:any) => {
            let sign = 0;
            let {scrollHeight,scrollTop,clientHeight} = event.target
            let scrollDistance = scrollHeight - scrollTop - clientHeight-1
            if (scrollDistance <= sign&&preDistance>scrollDistance) {
                preDistance = scrollDistance
                debounce(()=>{
                    if(typeof binding.value==='function'){
                        binding.value()
                    }else{
                        binding.value.callback()
                    }
                }) 
            }else{
                preDistance=100000
            }
        }
        selectWrap.addEventListener('scroll',selectWrap.handler)
    },
    unmounted(el: HTMLElement, binding: DirectiveBinding) {
        let className = binding.value.className;
        const selectWrap = className?el.querySelector(className):el
        selectWrap.removeEventListener('scroll',selectWrap.handler)
    }
}
const vDebounceLoadScroll = {
    install(app: App) {
      app.directive("debounceLoadScroll", loadScroll)
    }
  }
  export default vDebounceLoadScroll
  export const debounceLoadScroll = vDebounceLoadScroll