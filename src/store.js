// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedRow: null,
        // other state properties
    },
    mutations: {
        setSelectedRow(state, row) {
            state.selectedRow = row;
        },
        // other mutations
    },
    actions: {
        // your actions
    },
    getters: {
        // your getters
    },
    modules: {
        // your modules
    },
});