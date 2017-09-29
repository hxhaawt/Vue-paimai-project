import Vue from 'vue'

class Comment {
    constructor(id, productId, timestamp, user, rating, content) {
        this.id         = id;
        this.productId  = productId;
        this.timestamp  = timestamp;
        this.user       = user;
        this.rating     = rating;
        this.content    = content;
    }
}

// 商品评价
const productComments = [
    new Comment(1, 1, '2017-09-22 10：15：50', '张三', 3, '东西不错'),
    new Comment(2, 1, '2017-03-12 80：15：20', '李四', 4, '东西还行'),
    new Comment(3, 2, '2017-07-10 70：15：10', '张三', 2, '东西不错'),
    new Comment(4, 1, '2017-09-12 20：19：21', '王五', 5, '东西还可以'),
    new Comment(5, 2, '2017-08-15 10：05：20', '赵六', 3, '东西不错'),
    new Comment(6, 3, '2017-08-15 18：15：26', '赵六', 3, '东西非常好')
];

// 商品 模拟数据
const products = [
    {
        id: 1,
        title: '第一个商品',
        price: 2.9,
        rating: 3.5,
        desc: '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。' +
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。' +
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。' +
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
        categories: ['电子产品', '硬件产品']
    },
    {
        id: 2,
        title: '第二个商品',
        price: 2.5,
        rating: 2.5,
        desc: '这是二个商品描述，测试。这是二个商品描述，测试。这是一个商品描述，测试。',
        categories: ['软件产品', '硬件产品']
    },
    {
        id: 3,
        title: '第三个商品',
        price: 3.9,
        rating: 4.5,
        desc: '这是三个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
        categories: ['电子产品', '软件产品']
    },
    {
        id: 4,
        title: '第一个商品',
        price: 2.9,
        rating: 3.5,
        desc: '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
        categories: ['软件产品', '硬件产品']
    },
    {
        id: 5,
        title: '第二个商品',
        price: 2.5,
        rating: 2.5,
        desc: '这是二个商品描述，测试。这是二个商品描述，测试。这是一个商品描述，测试。',
        categories: ['软件产品', '硬件产品']
    },
    {
        id: 6,
        title: '第三个商品',
        price: 3.9,
        rating: 4.5,
        desc: '这是三个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
        categories: ['电子产品', '软件产品']
    },
    {
        id: 7,
        title: '第四个商品',
        price: 2.5,
        rating: 2.7,
        desc: '第四个商品描述，测试。这是第四个商品描述，测试。这是一个商品描述，测试。',
        categories: ['软件产品', '硬件产品']
    },
    {
        id: 8,
        title: '第五个商品',
        price: 3.3,
        rating: 1.5,
        desc: '这是三个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
        categories: ['电子产品', '软件产品']
    }
];


// 存放数据
const state = {
    // 所有产品
    productList: [],
    // 根据产品ID存储的单个产品
    product: {},
    // 根据ID获取某个产品的评价
    comments: []
};

// 返回数据
const getters = {
    productList: (state) => {
        return state.productList;
    },
    product: (state) => {
        return state.product;
    },
    comments: (state) => {
        return state.comments;
    }
};

// 可以异步操作
const actions = {
    fetchProductList ({commit}) {
        commit('updateProductList', products);
    },
    // 获取对应ID的产品，ID为外部传递过来
    getProductOfId ({commit}, id) {
        commit('updateProductList', products);
        commit('updateProductOfId', id);
    },

    // 根据产品ID获取某个产品的评价 ID为外部传递过来
    getProductCommentsOfId ({commit}, id) {
        commit('updateProductCommentsOfId', id);
    },

    // 增加产品的评价
    fetchProductCommentsOfId ({commit}, obj) {
        commit('addProductCommentsOfId', obj);
    },
    // 根据搜索关键字，赛选出产品
    fetchSearchProductList ({commit}, obj) {
        commit('updateProductList', products);
        commit('searchProductList', obj);
    }

};

// 必须同步操作
const mutations = {
    updateProductList (state, products) {
        state.productList = products;
    },
    // 根据ID获取某个产品
    updateProductOfId (state, id) {
        state.product = state.productList.filter( product => product.id === id )[0];
    },

    // 根据产品ID获取某个产品的评价
    updateProductCommentsOfId (state, id) {
        state.comments = productComments.filter( product => product.productId === id );
        // console.log('store-2', state.comments );
    },
    // 增加用户评价，这个只是临时的
    addProductCommentsOfId (state, obj) {
        state.comments.unshift(new Comment(
            productComments.length+1,
            obj.productId,
            obj.timestamp,
            obj.user,
            obj.rating,
            obj.content
        ));

        // console.log('11', obj);
    },
    // 根据搜索关键字，赛选出产品
    searchProductList (state, obj) {
        // obj.title/obj.price/obj.category

        state.productList = state.productList.filter(
            (product) => product.title.indexOf( obj.title ) !== -1
        );
        // 返回价格小于搜索价格的产品
        state.productList = state.productList.filter(
            (product) => (obj.price  - product.price) >= 0
        );

        if ( obj.category !== '全部分类')
        {
            state.productList = state.productList.filter(
                (product) => product.categories.indexOf( obj.category ) !== -1
            );
        }
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}

