<template>
    <div>
        <p>点击了{{$store.state.count}}次</p>
        <button @click="add">增加 1 次</button>
		<button @click="addAsync">异步 2 次</button>
    </div>
</template>

<script>
export default {
    created(){
		console.log(this.$store)
    },
    methods: {
		add(){
			this.$store.commit('increment')
		},
		addAsync(){
			this.$store.dispatch('incrementAsync')
		}
    }
}
</script>
