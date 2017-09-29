<template>
	<div class="stars">
		<div id="starBg" class="star_bg_empty">
			<div :class="['star_bg', needClass]"></div>
		</div>
		<span class="star-title">{{ number }} 星</span>
	</div>
</template>

<script>
    export default {
		props: {
		    // 默认展示5个星星都有颜色
            number: {
                type: Number,
                default: 0,
                required: true,
            },
		},
	    
        // 基础组件展示星星
        data () {
            return {
                //needClass: '',
                widthArr: ['','star_1', 'star_2', 'star_3', 'star_4', 'star_5']
            }
        },
	    computed: {
            needClass () {
                return this.widthArr[Math.floor(this.number)];
            }
	    },
        mounted(){

        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
	$bg_url: '../../assets/star.png';
	
	.stars {
		/*overflow: hidden;*/
	}
	/* 外层显示空星星 */
	.star_bg_empty {
		/* 星星宽是24px */
		display: inline-block;
		width: 120px;
		height: 20px;
		background: url($bg_url) repeat-x;
		overflow: hidden;
	}
	/* 内层显示有颜色的星星  */
	.star_bg {
		height: 100%;
		width: 0;
		background: url($bg_url) repeat-x 0 -20px;
	}
	
	$number: 5;
	@for $i from 1 through $number {
		.star_#{$i} {
			width: 24px * $i;
		}
	}
	
	.star-title{
		/*float: right;*/
		/*margin-right: 4px;*/
	}


</style>














