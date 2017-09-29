import Vue from 'vue'
import axios from 'axios'

// 商品评价
// 商品 模拟数据 从服务器获取
class Comment {
    constructor(id, productId,
                timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
}

let commentCount = 10;


const GET_DATA_WAIT = 'GET_DATA_WAIT';
const GET_DATA_OK = 'GET_DATA_OK';


// 存放数据
const state = {
    // 所有产品
    productList: [],
    // 根据产品ID存储的单个产品
    product: {},
    // 根据ID获取某个产品的评价
    comments: [],
    // 是否要从服务器取数据标志
    isGetProduct: true,
    // axios 与后台通信状态
    isGetDataOk: false
};

// 返回数据或者状态
const getters = {
    // 返回所有的产品
    productList: (state) => {
        return state.productList;
    },
    // 返回单个产品
    product: (state) => {
        return state.product;
    },
    // 返回产品的评价
    comments: (state) => {
        return state.comments;
    },
    // 返回是否要取数据标志
    isGetProduct: (state) => {
        return state.isGetProduct;
    },
    // 返回 axios 与后台通信状态
    isGetDataOk: (state) => {
        return state.isGetDataOk;
    },
};

// 可以异步操作
const actions = {
    fetchProductList ({commit}) {

        axios.get('/api/products').then(
            (res) => {
                commit('updateProductList', res.data);
                // console.log('res data: ', res.data);
            }
        ).catch(
            (err) => { console.log(err) }
        );
    },
    // 获取对应ID的产品，ID为外部传递过来
    getProductOfId ({commit}, id) {

        axios.get('/api/products/' + id).then(
            (res) => {
                commit('updateProductOfId', res.data);
            }
        ).catch(
            (err) => { console.log(err) }
        );
    },

    // 根据产品ID获取某个产品的评价 ID为外部传递过来
    getProductCommentsOfId ({commit}, id) {

        axios.get('/api/products/' + id + '/comments').then(
            (res) => {
                commit('updateProductCommentsOfId', res.data);
            }
        ).catch(
            (err) => { console.log(err) }
        );
    },

    // 增加产品的评价
    fetchProductCommentsOfId ({commit}, obj) {
        commit('addProductCommentsOfId', obj);
    },

    // 根据搜索关键字，赛选出产品
    fetchSearchProductList ({commit}, obj) {
        // console.log('obj: ', obj);
        axios.get('/api/products/', {
            params: obj
        }).then(
            (res) => {
                commit('updateProductList', res.data)
            }
        ).catch(
            (err) => { console.log(err) }
        );
    },
    // 设置是否要取数据标志
    fetchIsGetProduct ({commit}, flag) {
        commit('updateIsGetProduct', flag);
    },

    // 等待服务器通信
    getDataWait ({commit}) {
        commit(GET_DATA_WAIT);
    },
    getDataOk ({commit}) {
        commit(GET_DATA_OK);
    }

};

// 必须同步操作
const mutations = {
    updateProductList (state, products) {
        state.productList = products;

        return true;
        // console.log('products: ', products);
    },
    // 根据ID获取某个产品
    updateProductOfId (state, data) {
        //console.log('data: ', data);
        state.product = data;

        return true;
    },

    // 根据产品ID获取某个产品的评价
    updateProductCommentsOfId (state, data) {

        state.comments = data;

        return true;
    },

    // 增加用户评价，这个只是临时的
    addProductCommentsOfId (state, obj) {
        state.comments.unshift(new Comment(
            commentCount++,
            obj.productId,
            obj.timestamp,
            obj.user,
            obj.rating,
            obj.content
        ));

        //console.log('comment: ', obj);
    },

    // 根据搜索关键字，赛选出产品
    searchProductList (state, obj) {
        // 已经放到服务器
        // obj.title/obj.price/obj.category

        // state.productList = state.productList.filter(
        //     (product) => product.title.indexOf( obj.title ) !== -1
        // );
        // // 返回价格小于搜索价格的产品
        // state.productList = state.productList.filter(
        //     (product) => (obj.price  - product.price) >= 0
        // );
        //
        // if ( obj.category !== '全部分类')
        // {
        //     state.productList = state.productList.filter(
        //         (product) => product.categories.indexOf( obj.category ) !== -1
        //     );
        // }

    },
    // 设置是否要取数据
    updateIsGetProduct (state, flag) {
        state.isGetProduct = flag;
    },

    // 设置服务器通信状态
    [GET_DATA_WAIT] (state) {
        state.isGetDataOk = false;
    },
    [GET_DATA_OK] (state) {
        state.isGetDataOk = true;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
}

