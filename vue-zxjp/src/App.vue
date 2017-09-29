<template>
	<div id="app">
		<nav-bar></nav-bar>
		
		<div class="container home">
			<div class="left clearfix">
				<search></search>
			</div>
			<div class="right clearfix">
				<router-view></router-view>
			</div>
		</div>
		
		<footer-bar></footer-bar>
	</div>
</template>

<script >

    import NavBar from './components/navbar.vue';
    import Search from './components/search.vue';
	import FooterBar from './components/footer.vue';
    export default {
        name: 'app',
        components: {
            NavBar,
            Search,
            FooterBar
        }

    }
</script>

<style lang="scss">
	
	body{
		padding-top: 70px;
	}
	.container {
		/*padding-right: 15px;*/
		/*padding-left: 15px;*/
		margin-right: auto;
		margin-left: auto;
	}
	@media (min-width: 768px) {
		.container {
			width: 750px;
		}
	}
	@media (min-width: 992px) {
		.container {
			width: 970px;
		}
	}
	@media (min-width: 1200px) {
		.container {
			width: 1170px;
		}
	}
	
	/* 全局基本样式 */
	ul {
		margin: 0;
		padding: 0;
	}
	
	li {
		list-style: none;
	}
	
	a {
		color: #337ab7;
		background-color: transparent;
		text-decoration: none;
	}

	* {
		box-sizing: border-box;
	}
	
	.clearfix:before,
	.clearfix:after {
		content: " ";
		display: table;
	}
	
	.clearfix:after {
		clear: both;
	}
	.pull-right {
		float: right;
	}
	.pull-left {
		float: left;
	}
	
	.btn {
		display: inline-block;
		padding: 6px 12px;
		margin-bottom: 0;
		font-size: 14px;
		font-weight: normal;
		line-height: 1.42857143;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;

		cursor: pointer;
		outline: none;
		background-image: none;
		border: 1px solid transparent;
		border-radius: 4px;
	}
	
	
	
	/* app 内部样式  */
	.home {
		overflow: hidden;
	}
	.left {
		float: left;
		width: 25%;
		
		padding-right: 15px;
		padding-left: 15px;
		
		/*height: 800px;*/
		/*background-color: red;*/
	}
	
	.right {
		float: left;
		width: 75%;
		
		/*height: 800px;*/
		/*background-color: blue;*/
	}

</style>
































