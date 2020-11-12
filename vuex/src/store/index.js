import Vue from 'vue'
import Vuex from './vuex.js'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state, n=1) {
            state.count += n
        }
    },
    actions: {
        incrementAsync({commit}){
            setTimeout(() => {
                commit('increment', 2)
            }, 1000);
        }
    },
    modules: {}
})