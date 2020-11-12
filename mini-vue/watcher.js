class Watcher{
    constructor(vm, key, cb){
        this.vm = vm;
        this.key = key;
        // 回调函数，更新视图
        this.cb = cb;
        // 把watcher记录到Dep的target中
        Dep.target = this
        // 访问vm[key]，触发get，调用addSub
        this.oldValue = vm[key]
        Dep.target = null
    }
    update(){
        let newVal = this.vm[this.key];
        if(newVal === this.oldValue) return;
        this.cb(newVal)
    }
}