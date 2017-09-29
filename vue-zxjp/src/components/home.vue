<template>
	<div class="home">
		<div class="carousel">
			<slideshow :slides="slides" :inv="inv"></slideshow>
		</div>
		<div class="product">
			<product></product>
		</div>
	</div>
</template>

<script>

    import Slideshow from './base/slideshow.vue';
	import Product from './product.vue';
	
    export default {
	    components: {
            Slideshow,
            Product
	    },
        // 页面主要显示 内容区域 在页面左边
        data () {
            return {
                inv: 4000,      // 幻灯片动画时间
                slides: [
                    {
                        src: 'http://placehold.it/800x300',
//                        src: require('../assets/slideShow/pic1.jpg'),
                        title: 'xxx1',
                        href: '###'
                    },
                    {
                        src: 'http://placehold.it/800x300',
                        title: 'xxx2',
                        href: '###'
                    },
                ]
            }
        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

	.product {
		margin-left: -15px;
		margin-right: -15px;
	}

</style>
