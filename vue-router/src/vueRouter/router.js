let Vue
export default class Router{
    constructor(options){
        this.$options = options
        this.routeMap = {};
        // 将path转化为响应式
        this.pathIfo = new Vue({
            data: {
                path: window.location.hash.split('#')[1] || '/'
            }
        })
    }
    // 初始化
    init(){
        this.listenHash();
        this.initRouterMap(this.$options);
        this.initComponent();
    }
    // 监听hash
    listenHash(){
        window.addEventListener('hashchange', ()=> {
            this.pathIfo.path = window.location.hash.split('#')[1];
        }, false)
    }
    // 初始化路由表
    initRouterMap(options){
        options.routes.forEach(item=> {
            this.routeMap[item.path] = item;
        })
    }
    // 初始化 router-link和router-view
    initComponent(){
        // Vue-view
        Vue.component('router-view', {            
            render: h=>{
                const comp = this.routeMap[this.pathIfo.path].component
                return h(comp)
            }
        });
        // router-link
        Vue.component('router-link', {
            // jsx
            props: {
                to: String
            },
            render(){
                let toPath = `/#${this.to}`
                return <a href={toPath}>{this.$slots.default}</a>
            }
        })
    }
    static install(_Vue){
        Vue = _Vue
        Vue.mixin({
            beforeCreate(){
                if(this.$options.router){
                    // new Vue的时候传递的  
                    Vue.prototype.$router = this.$options.router;
                    this.$options.router.init()
                }
            }
        })        
    }
}