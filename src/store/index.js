import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
// const store = new Vuex.Store({
	state: {
		foods: [],
		ele: {}
	},
	getters: {
		foods: state => state.foods,
		ele: state => state.ele
	},
	mutations: {
		selected (state, food) {
			state.foods = food
		},
		getEle (state, ele) {
			state.ele = ele;
		}
	}
})
export default store