<template>
	<div class="search">
		<form @submit.prevent="onSearch">
			<div class="form-group">
				<label for="productTitle">商品名称：</label>
				<input type="text"
				       id="productTitle"
				       placeholder="商品名称"
				       :class="['form-control', {'has-error': !titleOk}]"
				       v-model="product.title"
				       @blur="checkTitle"
				>
				
				<!-- 商品名称 输入错误提示信息 -->
				<span class="help-block" v-show="!titleOk">
                    请至少输入2个字
                </span>
			</div>
			<div class='form-group'>
				<label for="productPrice">商品价格：</label>
				<input type="number"
				       id="productPrice"
				       placeholder="商品价格"
				       :class="['form-control', {'has-error': !priceOk}]"
				       v-model="product.price"
				       @blur="checkPrice"
				>
				<span class="help-block"  v-show="!priceOk">
                    请输入正数
                </span>
			</div>
			<div class="form-group">
				<label for="productCategory">商品类别：</label>
				<select id="productCategory"
				        class="form-control"
				        v-model="product.category"
				>
					<option value="全部分类" :key="0">全部分类</option>
					<option v-for='(category, index) in categories'
					        :value="category"
					        :key="index+1"
					>
						{{ category }}
					</option>
				</select>
			</div>
			
			<div class="form-group">
				<button type="submit" class="btn">
					搜索
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	
	
    export default {

        // 页面左边搜索部分，固定在页面左边
        data () {
            return {
                // 保存用户搜索信息
                product: {
                    title: '',
	                price: null,
                    category: '全部分类'
                },
				categories: ['电子产品', '硬件产品', '软件产品'],
                titleOk: true,
	            priceOk: true,
	            searchObjOk: false,
            }
        },
	    watch: {
            
            // 这样写输入样品名称时，商品价格也会有提示
//            product: {
//
//                //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
//                handler (curObj, oldObj) {
//                            this.titleOk = (curObj.title
//                                    && (curObj.title.length > 1 ));
//
//                            this.priceOk = curObj.price > 0;
//                        },
//	            deep: true
//            }
		    
		    // 动态监控用户输入或者等用户失去焦点时再检测
//		    'product.title': function (curVal) {
//		        const str = curVal.trim();
//                this.titleOk = (str && (str.length > 1 ));
//
//                this.searchObjOk = this.titleOk && this.priceOk
//            },
//
//            'product.price': function (curVal) {
//
//                this.priceOk = curVal > 0;
//
//                this.searchObjOk = this.titleOk && this.priceOk
//            }
		    
	    },
	    
	    computed: {

	    },
        methods: {
            
            // 校验title
            checkTitle() {
                
                
                const sqlStr = /^(delete|update|insert|select)$/ig;
                // 过滤输入的 html标签
                this.product.title = this.product.title.replace(/<\/*\w*>/g, '');
                // 过滤sql语句
                this.product.title = this.product.title.replace(sqlStr, '');

                this.product.title.trim();
                this.titleOk = (this.product.title
                                && (this.product.title.length > 1 ));
                //this.searchObjOk = this.titleOk && this.priceOk
            },
	        // 校验price
	        checkPrice() {
                this.priceOk = this.product.price > 0;
	        },
	        
            onSearch() {
                
                this.checkTitle();
                this.checkPrice();
                this.searchObjOk = this.titleOk && this.priceOk;
	            
                if (this.searchObjOk) {
	                // console.log('search...>');
	                // 服务器那里 -1 表示全部产品
                    this.product.category = '-1';
	                
                    // 进行深拷贝，不然下面清除数据会清除搜索内的数据
	                const tmpObj = JSON.parse( JSON.stringify(this.product) );
                    this.$store.dispatch('fetchSearchProductList', tmpObj);

                    this.product.title = '';
                    this.product.price = null;
                    this.product.category = '全部分类';

                    if (this.$route.params.id) {
                        //console.log('router to /');
                        // 先设置需要从后台取产品 标志为假
                        this.$store.dispatch('fetchIsGetProduct', false);
                        // 跳转到产品首页
                        this.$router.push({path: '/'});
                    }
                    
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
	.form-group{
		
		margin-bottom: 15px;
		
		label {
			display: inline-block;
			max-width: 100%;
			margin-bottom: 5px;
			font-weight: bold;
		}
		
		.form-control {
			display: block;
			width: 100%;
			height: 36px;
			
			border: 1px solid #ccc;
			border-radius: 4px;
			
			font-size: 14px;
			
			outline: none;
			
			padding: 6px 10px;
			
			background-color: #fff;
			color: #555;
			box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
			
			transion: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
			&:focus {
				border-color: blue;
				/*border-radius: 4px;*/
				box-shadow: 0 0 10px rgba(0, 0, 255, .3);
			}
		}
		
		.btn {
			display: block;
			width: 100%;
			height: 34px;
			
			border: 1px solid #2e6da4;
			border-radius: 4px;
			
			text-align: center;
			white-space: nowrap;
			vertical-align: middle;
			
			color: #fff;
			background-color: #337ab7;
			transition: all .5s ;
			&:hover {
				background-color: #106da4;
			}
		}
		
		.help-block {
			display: block;
			padding-top: 10px;
			color: #a94442;
			
			font-size: 14px;
		}
	}
	
	.has-error {
		
		border: 1px solid #a94442 !important;
		border-radius: 4px;
		
		&:focus {
			border-color: #a94442 !important;
			/*border-radius: 4px;*/
			box-shadow: 0 0 4px #a94442 !important;
		}
	}

	
</style>














