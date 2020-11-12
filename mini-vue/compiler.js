class Compiler{
    constructor(vm){
        this.vm = vm;
        this.el = vm.$el;
        
        
        const fragment = this.compileFragment(this.el);
        this.compile(fragment);
        this.el.appendChild(fragment);
    }
    compileFragment(el){
        // 避免回流重绘
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild){
            f.appendChild(firstChild)
        }
        return f;
    }
    // 处理文本节点和元素节点
    compile(fragment){
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node=>{
            if(this.isTextNode(node)){
                this.compileText(node)
            }else if(this.isElementNode(node)){
                this.compileElement(node)
            }
            // 处理子节点
            if(node.childNodes && node.childNodes.length){
                this.compile(node)
            }
        })        
    }
    // 处理元素节点和指令
    compileElement(node){
        Array.from(node.attributes).forEach(attr=>{
            let { name, value} = attr;
            if(this.isDirective(attrName)){
                // v-model v-text v-bind v-on:click
                const [, directive] = name.split('-');
                const [compileKey, eventName] = directive.split(':');
                name = name.slice(2);
                this[`${compileKey}Update`](node, value, eventName)
            }else if(this.isEventName(name)){
                // @ 方法
                const [, eventName] = name.split('@'); 
                this[`onUpdate`](node, value, eventName)
            }
        })
    }
    // 处理v-text
    textUpdate(node, key){
        node.textContent = this.vm[key]
        new Watcher(this.vm, key, newVal=> node.textContent = newVal)
    }
    // v-model
   modelUpdate(node, key){
        node.value = this.vm[key]
        new Watcher(this.vm, key, newVal=> node.value = newVal)
        // 双向绑定
        node.addEventListener('input', e=>{
            this.vm[key] = e.target.value
        })
    }
    // 处理文本节点和差值表达式
    compileText(node){
        let reg = /\{\{(.+?)\}\}/;
        let value = node.textContent;
        if(reg.test(value)){
            let key = RegExp.$1.trim();
            node.textContent = value.replace(reg, this.vm[key])
            
            // 创建watcher，数据改变更新视图
            new Watcher(this.vm, key, (newVal)=>{               
                node.textContent = newVal
            })
        }
    }
    // 处理事件
    onUpdate(node, key, eventName){
        const fn = this.vm.$options.methods[key];
        node.addEventListener(eventName, fn.bind(this.vm), false)
    }
    // 判断元素属性是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode(node){
        return node.nodeType === 3
    }
    // 判断是否是元素节点
    isElementNode(node){
        return node.nodeType === 1
    }
    // 判断是否为 @ 事件
    isEventName(name){
        return name.startsWith('@')
    }
}
