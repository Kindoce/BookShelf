// store.js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedRow: null,
        selectedMenu: '',
        // other state properties
    },
    mutations: {
        setSelectedRow(state, row) {
            state.selectedRow = row;
        },
        setSelectedMenu(state, menu) {
            state.selectedMenu = menu;
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