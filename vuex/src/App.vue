<template>
  <div id="app">
    <Test msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Test from './components/test.vue'

export default {
  name: 'App',
  components: {
    Test
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
