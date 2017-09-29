<template>
	<div class="row">
		<div v-for="product in productList"
		     class="product-item clearfix">
			<div class="thumbnail">
				<img :src="srcUrl">
				<div class="caption">
					<h4 class="pull-right">{{ product.price }} 元</h4>
					<h4>
						<router-link
								:to="{path: '/product/' + product.id}">
							{{ product.title }}
						</router-link>
					</h4>
					<p class="product-desc">{{ product.desc }}</p>
				</div>
				<!-- 展示星星组件 -->
				<div class="stars">
					<show-start :number='product.rating'></show-start>
				</div>
			</div>
		</div>
		
		<div class="hint" v-show="isGetDataOk && productList.length === 0">
			<p>没有匹配的商品</p>
		</div>
	</div>
</template>

<script>
	
	import ShowStart from './base/show-stars.vue';
    import {mapGetters, mapActions} from 'vuex'
	
    export default {
    
		components: {
            ShowStart
		},
        // 产品内容组件
        data () {
            return {
                srcUrl: "http://placehold.it/320x150",  // 测试产品图片
                products: [
	                {
	                    id: 1,
		                title: '第一个商品',
		                price: 2.9,
		                rating: 3.5,
		                desc: '这是一个商品描述，测试。这是一个商品描述，测试。这是一个商品描述，测试。',
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
                        categories: ['电子产品', '硬件产品']
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
	                
                ]
            }
        },

        computed: {
	        ...mapGetters([
		        'productList',
		        'isGetProduct',
		        'isGetDataOk'
	        ])
        },
	    
        methods: {
		    
	        ...mapActions([
		        'fetchProductList'

	        ])
        },
	    
	    mounted () {
		    // 需要从后台取数据状态为真，则从后台取数据，不然数据会在搜索时自动更新
		    if (this.isGetProduct) {
		        // 从后台取数据，更新 productList 的值
                this.fetchProductList();
		    } else {
		        // 设置取数据状态为真，为下次从后台取数据
                this.$store.dispatch('fetchIsGetProduct', true);
		    }
		   
	    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

	.row {
		
		width: 100%;
		overflow: hidden;
		
		h4 {
			padding: 0;
			margin: 0;
		}
		
		img {
			display: block;
			max-width: 100%;
			height: auto;
		}
		
		.product-item {
			
			/* 高度自适应 */
			float: left;
			width: 33.33%;
			
			padding-left: 15px;
			padding-right: 15px;
			margin-bottom: 20px;
			
			.thumbnail {
				padding: 4px;
				border: 1px solid #ddd;
				
				.caption {
					margin: 14px 8px 8px;
					
					.pull-right {
						
						float: right;
					}
					
					a:hover {
						text-decoration: underline;
						cursor: pointer;
					}
					
					.product-desc {
						width: 100%;
						font-size: 16px;
						
						word-break: break-all;
						
						/*overflow: scroll;*/
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 4; /* 控制显示的行数 */
						
						line-height:  24px; /* 对不支持浏览器的 */
						height: 96px;       /* 对不支持浏览器的弥补 */
						
					}
				}
				
				.stars {
					margin-left: 8px;
				}
			}
		}
		
		/* 查找不到商品时的提示信息样式*/
		.hint {
			margin-top: 30px;
			padding-left: 15px;
			width: 100%;
			color: red;
			text-align: center;
		}
	}

</style>














