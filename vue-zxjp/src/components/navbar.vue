<template>
    <nav class="navbar">
		<div class="container">
			<div class="navbar-header">
				<a href="#" class="navbar-brand">在线竞拍</a>
			</div>
			<div class="navbar-collapse">
				<ul class="navbar-nav">
					<li><a href="#">关于我们</a></li>
					<li><a href="#">联系我们</a></li>
					<li><a href="#">网站地图</a></li>
				</ul>
			</div>
		</div>
    </nav>
</template>

<script>
    export default {
    
		// 页面顶部导航 固定在浏览器顶部
        data () {
            return {
            
            }
        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

	.navbar{
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1024;
		
		margin-bottom: 20px;
		
		border-color: #080808;
		border-width: 0 0 1px;
		
		width: 100%;
		min-height: 50px;
		background-color: #222;
		
		margin-left: -15px;
		padding-top: 15px;
		
		a {
			color: #9d9d9d;
		}
		a:hover {
			color: #fff;
		}
		
		.navbar-header {
			display: inline-block;
			font-size: 18px;
		}
		
		.navbar-collapse {

			display: inline-block;
			
			.navbar-nav {
				list-style-type: none;
				margin-left: 20px;
				
				li {
					display: inline-block;
					margin-right: 15px;
				}
			}
		}
	}
	
	
</style>
