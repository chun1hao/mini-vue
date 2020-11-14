<template>
  <div>
    <router-link to="/">回到主页</router-link>|
    <router-link to="/info">看看彦祖的信息</router-link>|
    <router-link to="/pic" :next="1">看看彦祖的照片</router-link>
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>