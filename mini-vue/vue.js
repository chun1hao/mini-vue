class Vue{
    constructor(options){
        // 通过属性保存选项的数据
        this.$options = options || {};
        this.$data = options.data || {};
        this.$el = document.querySelector(options.el);
        // data 转化为 getter setter，并注入vue中，后续可以使用 this[key] 访问
        this._proxyData(this.$data);
        // 调用 observer 对象，监听数据变化
        new Observer(this.$data)
        // 调用 compiler，解析指令等
        new Compiler(this)
    } 
    _proxyData(data){
        Object.keys(data).forEach(key=>{            
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get(){
                    return data[key]
                },
                set(newVal){
                    if(newVal === data[key]) return;
                    data[key] = newVal;
                }
            })
        })
    }
}