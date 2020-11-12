class Observer{
    constructor(data){
        this.walk(data)
    }
    walk(data){
        // 遍历data所有属性
        if(typeof data === 'object' && data){
            Object.keys(data).forEach(key=>{
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive(obj, key, val){
        let t = this;
        let dep = new Dep();
        // 如果val 是对象，也添加 defineProperty
        this.walk(val);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get(){
                // 收集依赖
                Dep.target && dep.addSub(Dep.target);
                
                // 不能使用obj[key] 死循环
                return val
            },
            set(newVal){
                if(newVal === val) return;
                val = newVal;
                // 新赋值的对象，也添加 defineProperty
                t.walk(newVal);
                // 发送通知
                dep.notify()
            }
        })
    }
}