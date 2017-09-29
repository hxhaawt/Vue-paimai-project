import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'


//其他页面在使用axios的时候直接  this.$http就可以了
//Vue.prototype.$http = axios;


//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
    store.dispatch('getDataWait');
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
    store.dispatch('getDataOk');
    return response;
}, function (error) {

    return Promise.reject(error);
});


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
