// store.js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedRow: null,
        selectedMenu: '',
        selectedSettings: {
            font_size: 18,
            padding_size: 10,
            font_family: "SimSun",
            bg_color: "#ffffff",
            zt_color: "#000000",
        },
        selectedBookSource: '',
        // other state properties
    },
    mutations: {
        setSelectedRow(state, row) {
            state.selectedRow = row;
        },
        setSelectedMenu(state, menu) {
            state.selectedMenu = menu;
        },
        setSelectedSettings(state, settings) {
            state.selectedSettings = settings;
        },
        setSelectedBookSource(state, source) {
            state.selectedBookSource = source;
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