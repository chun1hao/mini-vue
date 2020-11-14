# vue-router

设计思路：
1. vue-router 包含两个组件 
- router-link：相当于禁用了默认事件的 a 标签，点击改变路由
- router-view：占位
2. 监听路由（hash pushState）变化
3. 在传入的路由表（router-map）中进行查找，找到需要加载得到组件
4. 将找到的组件塞到 router-view 里面
5. matcher 匹配多级路由管理器

使用：
1. import vueRouter
2. 使用 Vue.use
3. 配置路由信息
4. 实例化 router
5. 根组件中增加 router 对象
6. 模板中插入 <router-view> 组件
