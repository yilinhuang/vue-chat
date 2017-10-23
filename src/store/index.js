import Vuex from 'vuex';
import Vue from 'vue';
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex);


const state = {
    messages: {

    },
    threads: {

    },
    currentThreadID: null
   
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations 
})