
import * as express from 'express';
import {Server} from 'ws';
import * as path from 'path';

const server = express();
server.listen(8002);

// 单个产品类
class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>    // 产品分类
    ) {

    }
}

// 评论类
class Comment {

    constructor (
        public id: number,
        public productId: number,
        // public timestamp: string,
        public timestamp: number,
        public user: string,
        public rating: number,
        public content: string
    ) {}
}

// 产品信息
const products: Product[] = [
        new Product(
            1,
            '华为机',
            1.93, 3.4,
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
            ['电子产品', '硬件产品']),

        new Product(
            2,
            '小米机',
            2.95, 4.3,
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
            ['电子产品', '软件产品']),

        new Product(
            3,
            '苹果机',
            3.93, 2.6,
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
            ['电子产品', '软件产品']),

        new Product(
            4,
            '锤子机',
            3.33, 1.5,
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
            ['软件产品', '硬件产品']),

        new Product(
            5,
            '华为机',
            3.90, 2.4,
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
            ['电子产品', '软件产品']),

        new Product(
            6,
            '小米机',
            1.93, 3.1,
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
            ['电子产品', '硬件产品']),
        new Product(
            7,
            '诺基亚',
            3.90, 2.4,
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
            ['电子产品', '软件产品']),

        new Product(
            8,
            '诺基亚',
            1.93, 3.1,
            '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
            ['软件产品', '硬件产品'])
];

const comments: Comment[] = [
    new Comment(1, 1, 1506311331197, '张三', 3, '东西不错'),
    new Comment(2, 1, 1506321331197, '李四', 4, '东西还行'),
    new Comment(3, 2, 1506361331197, '张三', 2, '东西不错'),
    new Comment(4, 1, 1506351331197, '王五', 5, '东西还可以'),
    new Comment(5, 2, 1506331331197, '赵六', 3, '东西不错'),
    new Comment(6, 3, 1506391211197, '赵六', 3, '东西非常好'),
    new Comment(6, 5, 1506391511197, '赵六', 3, '东西非常好'),
];

server.use('/', express.static(path.join(__dirname, '..', 'client')));

server.get('/api/products', (req, res) => {
    let result = products;
    let params = req.query;

    console.log('prarmas: ', params);
    if ( params.category ) {
        // 过滤数据
        if (params.title) {
            result = result.filter( (p) => p.title.indexOf(params.title) !== -1);
        }

        if (params.price && result.length > 0) {
            // 返回商品价格小于或等于搜索价格的 商品
            result = result.filter( (p) => p.price <= parseInt(params.price));
        }
        // '-1' 表示全部产品
        if (params.category !== '-1' && result.length > 0) {
            // 返回商品价格小于或等于搜索价格的 商品
            result = result.filter( (p) => p.categories.indexOf(params.category) !== -1);
        }
    }

    res.json(result);
});

server.get('/api/products/:id', (req, res) => {
    // 不能用 === 因为这里一个是number一个是string
    res.json(products.find( (product) => product.id == req.params.id));
});

// 处理comment的get请求
server.get('/api/products/:id/comments', (req, res) => {
    res.json(comments.filter((comment: Comment) => comment.productId == req.params.id));
});


// websock 相关配置

const subScription = new Map<any, number[]>();

// 在8085端口创建一个服务器，当有客户端通过ws连接这个端口时，给客户端发送消息
const wsServer = new Server({
    port: 8085
});

wsServer.on('connection', (websocket) => {
    // websocket.send('这个消息是服务器主动发送的');
    websocket.on('message', (value: any) => {

        let messageObj: any;
        messageObj = JSON.parse( value );
        let productIds = subScription.get(websocket) || [];
        subScription.set(websocket, [...productIds, messageObj.productId])

        //console.log('subScription: ', subScription);
    });
});


const currentBids = new Map<number, number>();

// 拍卖的商品 在后台设置要拍卖的商品，一运行这个文件就开始加价，用户定阅有对应拍卖的商品就发送
const sellProductIds = [1, 2, 3];

setInterval( () => {

    // console.log( '----->');
    // products.forEach( p => {
    //
    //     let currentBid = currentBids.get(p.id) || p.price;
    //     // 价格每次加5左右
    //     let newBid = currentBid + Math.random() * 5;
    //     // console.log("--->" + newBid);
    //     currentBids.set(p.id, newBid);
    //
    //     console.log('binds: ', currentBids);
    // });

    // subScription.forEach( (productIds: number[], ws: any) => {
    //     if (ws.readyState === 1) {
    //
    //         let newBids = productIds.map( pid => ({
    //             productId: pid,
    //             bid: currentBids.get(pid)
    //         }));
    //
    //         console.log('newBids: ', newBids);
    //
    //         ws.send(JSON.stringify(newBids));
    //     } else {
    //         subScription.delete(ws);
    //     }
    // });

    // subScription.forEach( (productIds: number[]) => {
    //     const len = productIds.length;
    //     for (let i=0; i<len; i++) {
    //
    //         const currentBid = currentBids.get(productIds[i]) || products[productIds[i]].price;
    //         // 价格每次加5左右
    //         const newBid = currentBid + Math.random() * 5;
    //
    //         currentBids.set(productIds[i], newBid);
    //
    //         console.log('current bid: ', currentBids);
    //     }
    // });

    sellProductIds.forEach( id => {

        const currentBid = currentBids.get(id) || products[id].price;
        // 价格每次加5左右
        const newBid = currentBid + Math.random() * 5;
        // console.log("--->" + newBid);
        currentBids.set(id, newBid);

        //console.log('binds: ', currentBids);
    });

    subScription.forEach( (productIds: number[], ws: any) => {
        if (ws.readyState === 1) {

            const len = productIds.length;
            for (let i=0; i<len; i++) {
                if ( sellProductIds.indexOf( productIds[i] ) !== -1) {

                    const newBids = {
                            productId: productIds[i],
                            bid: currentBids.get( productIds[i] )
                    };

                    //console.log('newBids: ', newBids);

                    ws.send(JSON.stringify(newBids));
                }
            }

        } else {
            subScription.delete(ws);
        }
    });

}, 2000);


