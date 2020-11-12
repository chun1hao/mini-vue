let Vue
class Store{
    constructor(options = {}){
        // 响应式 改变通知页面
        this.state = new Vue({
            data: options.state
        });

        this.mutations = options.mutations;
        this.actions = options.actions;

        this.handleGetters(options.getters);
    }
    commit =  (type, arg)=> {
        this.mutations[type](this.state, arg)
    }
    dispatch(type, arg){
        this.actions[type]({
            commit: this.commit,
            state: this.state
        }, arg)
    }
    // getter 实现
    handleGetters(getters){
        // 类似computed，代理一个getter，挂载在store.getters上面
        this.getters = {};
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: ()=>{
                    return getters[key](this.state)
                }
            })
        })
    }
}

function install(_Vue){
    // store 执行时，就有了 vue
    // 所以 vue.use 必须在 new store 之前
    Vue = _Vue;
    console.log(Vue)
    _Vue.mixin({
        beforeCreate(){
            // 只有root 才有store
            if(this.$options.store){
                _Vue.prototype.$store = this.$options.store;
            }
        }
    })    
}

export default{
    Store,
    install
}