class Compiler{
    constructor(vm){
        this.vm = vm;
        this.el = vm.$el;
        this.compile(this.el);
    }
    // 处理文本节点和元素节点
    compile(el){
        let childNodes = el.childNodes;
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
            let attrName = attr.name;
            if(this.isDirective(attrName)){
                attrName = attrName.slice(2);
                let key = attr.value
                this.update(node, key, attrName);
            }
        })
    }
    update(node, key, attrName){
        let fn = this[`${attrName}Updater`]
        fn && fn.call(this, node, key, this.vm[key])
    }
    // 处理v-text
    textUpdater(node, key,value){
        node.textContent = value;
        new Watcher(this.vm, key, newVal=>{
            node.textContent = newVal;
        })
    }
    // v-model
    modelUpdater(node, key, value){
        node.value = value
        new Watcher(this.vm, key, newVal=>{
            node.value = newVal;
        })
        // 双向绑定
        node.addEventListener('input', ()=>{
            this.vm[key] = node.value
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
}