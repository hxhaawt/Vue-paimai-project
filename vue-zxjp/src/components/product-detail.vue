<template>
	<div>
		<div class="box">
			<img src="http://placehold.it/820x230">
			<div class="content">
				<h4 class="pull-right clearfix"> {{ product.price }} 元 </h4>
				<h4> {{ product.title }} </h4>
				<p> {{ product.desc }} </p>
			</div>
			<div class="comment">
				<show-stars :number="product.rating"></show-stars>
			</div>
		</div>
		
		<div class="watch">
			<button class="btn watch-btn"
			        @click="watchProduct"
			>
				{{ isWatched ? '取消关注' : '关注'}}
			</button>
			<label>
				最新出价 {{ (currentBid || product.price) | number(2) }} 元
			</label>
		</div>
		
		<div class="box2">
			<!-- 商品评价列表 -->
			<div class="well">
				<!-- 是否显示评价框 -->
				<div>
					<button class="btn comm-btn"
					        @click='toggleShowComment'>
						发表评论
					</button>
				</div>
				
				<!-- 增加评价 -->
				<div v-show='isCommentHidden' class="com-box">
					<div>
						<stars @click-rating="addRating"
						       :isChecked="isChecked">
							
						</stars>
					</div>
					<div>
		            <textarea v-model='newComment' >
		
		            </textarea>
					</div>
					<div>
						<button class="btn submit-btn" @click='addComment'>
							提交
						</button>
					</div>
				</div>
				
				<!-- 评价列表展示 -->
				<div class="row"
				     v-for="(comment, index) in comments"
				     :key="index"
				>
					<hr>
					<div class="com-content">
						<show-stars :number="comment.rating"></show-stars>
						<span class="user"> {{ comment.user }} </span>
						<span class="pull-right"> {{ comment.timestamp | timeToDate}} </span>
						<p> {{ comment.content }} </p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import ShowStars from './base/show-stars.vue';
    import Stars from './base/stars.vue';
    
    let ws;
    
    export default {
        
        components: {
            ShowStars,
            Stars
        },
        // 展示所有产品详细内容组件
        data () {
            return {
                
                isWatched: false,   // 是否关注商品
                currentBid: 0,   // 商品当前价格，从服务器取得
                isChecked: false,
                isCommentHidden: false, // 是否显示评价
                newComment: '',         // 新的评论
	            rating: 1,              // 评论的星级
                timestamp: '',          // 评论的时间
	            user: '王五',            // 评论的作者，这里为默认值
            }
        },
        computed: {
	        
            ...mapGetters([
                'product',
	            'comments'
            ]),
	        
        },
        methods: {
            
            toggleShowComment() {
                this.isCommentHidden = !this.isCommentHidden;

                this.rating = 1;
                this.newComment = '';
                // 主要是让父级元素的值变化，引起子组件更新
                this.isChecked = !this.isChecked;
            },

            // 向服务器发送消息
            sendMessage (message) {
                
                // ws 发送的只能是字符串
                ws.send(JSON.stringify(message));
            },
    
	        // 关注商品
            watchProduct () {
                this.isWatched = !this.isWatched;
                
                if ( this.isWatched ) {
	                ws = new WebSocket('ws://localhost:8085');
	                ws.onopen = () => {
	                    this.sendMessage({productId: this.product.id});
	                };
	                ws.onmessage = (res) => {
	                    
	                    //console.log('typeof:', typeof res.data );
	                    //console.log('res-1:', res.data );
                        //console.log('res-2:', JSON.parse(res.data) );
		                
		                const productsBid = JSON.parse(res.data);
                        //console.log('res-2:', productsBid);

                        if (productsBid) {
                            
                            this.currentBid = productsBid.bid;
                        }
		                
                    };
	                ws.onclose = (e) => {
                        console.log('websocket close ', e);
	                };
	                ws.onerror = (err) => {
	                    console.log('websocket error ', err);
	                };
                } else {
                    ws.close();
                    ws = null;
                }
            },
	        
	        // 增加商品评论
            addComment () {
                const productId = parseInt(this.$route.params.id);
                
                // 简单的验证输入内容
                if ( !this.newComment ) {
                    
                    alert('内容不能为空');
                    
                    return false;
                }
                const filterComment = this.newComment.replace(/<\/*\w*>/g, '');
                //console.log('filter: ', filterComment);
                const obj = {
                    productId: productId,
                    timestamp: +new Date(),
                    user: this.user,
                    rating: this.rating,
                    content: filterComment
                };
                
                this.$store.dispatch('fetchProductCommentsOfId', obj);

                // 重新计算商品的评价星级
                const sum = this.comments.reduce( (sum, comment) => {
                    return sum + comment.rating;
                } , 0);
                // this.product.rating = Math.round( sum / this.comments.length );
                this.product.rating = sum / this.comments.length;
	            
                this.rating = 1;
                this.newComment = '';
                this.isCommentHidden = false;
                // 主要是让父级元素的值变化，引起子组件更新
                this.isChecked = !this.isChecked;
            },
	        
	        // 点击评价组件，更新星星 显示
            addRating(rating) {
                this.rating = rating;
            }
    

//            ...mapActions([
//                'getProductOfId',
//            ])
        },
	    filters: {
		    
            timeToDate (timestamp) {
                
                const toDou = (n) => {
                    return n<10 ? '0'+n : ''+ n;
                };
	            
                // 将后台的 毫秒 数转换为需要的时间格式
                const oDate =  new Date();
                // oDate.setTime(timestamp * 1000);  // 这具是秒数变为毫秒数
                oDate.setTime(timestamp);

                // 前端需要的格式
                return oDate.getFullYear()
                    +'-'+toDou(oDate.getMonth()+1)
                    +'-'+toDou(oDate.getDate())
                    +' '+toDou(oDate.getHours())
                    +": "+toDou(oDate.getMinutes())
                    +': '+toDou(oDate.getSeconds());
            },
		    // 返回 n 位小数点
		    number(value, n) {
       
			    if (typeof value === 'number' ) {
                    return value.toFixed(n);
			    } else {
			        return value;
			    }
       
		    }
		
	    },
        mounted () {
            
            const id = parseInt(this.$route.params.id);
            
            // vuex 中传递参数方法 这个id其实是产品的ID
	        this.$store.dispatch('getProductOfId', id);
            
            this.$store.dispatch('getProductCommentsOfId', id);
	        
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
	$box-padding: 6px 15px;
	$box-border: 1px solid #ddd;
	
	.box,
	.box2,
	.watch {
		border: $box-border;
		padding: $box-padding;
		
		font-size: 14px;
	}
	
	.box {
		
		img {
			width: 100%;
		}
		/* 商品内容样式*/
		.content{
			margin-top: 10px;
			
			h4 {
				padding: 0;
				margin: 0;
			}
			p {
				/*margin: 0;*/
				/*font-size: 14px;*/
				line-height: 1.43;
			}
		}
		
		/* 商品评价样式*/
		.comment {
			overflow: hidden;
			margin-top: 10px;
		}
	}
	
	.watch {
		margin-top: 20px;
		
		.watch-btn {
			margin: 8px 6px 8px 0;
			
			transition: color .3s;
			&:hover {
				color: #fff;
			}
		}
	}
	
	// 商品评价样式
	.box2 {
		
		margin-top: 20px;
		background-color: #f5f5f5;
		
		.well {
			margin: 20px 0 20px 0px;
			
			.comm-btn {
				
				color: #fff;
				background-color: #5cb85c;
				
				&:hover {
					background-color: #4cae4c;
				}
			}
			
			.com-box {
				margin-top: 10px;
				
				.submit-btn {
					margin-top: 6px;
					&:hover {
						color: #fff;
					}
				}
				
				textarea {
					resize: none;
					
					width: 300px;
					height: 100px;
					overflow: scroll;
					
					/*font-size: 14px;*/
					line-height: 1.4;
				}
			}
			
			.row {
				margin-top: 20px;
				
				/*font-size: 14px;*/
				
				hr {
					margin-top: 20px;
					margin-bottom: 20px;
					border: 0;
					border-top: 1px solid #eee;
				}
				
				.com-content {
					.user {
						display: inline-block;
						margin-top: 8px;
					}
					.pull-right {
						margin-top: 8px;
					}
				}
			}
		}
		

	}

</style>














