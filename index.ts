//防抖函数
let timer: any = null
export const debounce = (Callback: any, delay = 1000)=>{
  timer != null ? clearTimeout(timer) : null
  timer = setTimeout(() => {
    Callback && Callback() //当有值才会执行
  }, delay)
}
export default (app:any) => {
    app.directive('debounceLoadScroll',{
        mounted(el:any, binding:any) {
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
        unmounted(el:any, binding:any) {
            let className = binding.value.className;
            const selectWrap = className?el.querySelector(className):el
            selectWrap.removeEventListener('scroll',selectWrap.handler)
        }
    })
}