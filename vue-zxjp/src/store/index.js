import Vuex from 'vuex'
import Vue from 'vue'
import productList from './modules/productList'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        productList
    }
})


