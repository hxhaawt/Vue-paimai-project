<template>
	<div id="starBg" class="star_bg" >
		
		<div v-for="(item, index) in starArr" :key="index" @click="addRating(index)">
			<input type="radio" :id="item.id"
			       :class="['score', item.inputClass]"
			       :value="index"
			       :checked="isChecked ? false : false"
			       name="score">
			<a :href="item.aHref" :class="['star', item.aClass]" :title="item.aTitle">
				<label :for="item.id"> {{item.aTitle }}</label>
			</a>
		</div>
	</div>

</template>


<script>
	
	class Stars {
	    constructor (id, inputClass, aHref, aClass, aTitle) {
	        this.id = id;
	        this.inputClass = inputClass;
	        this.aHref = aHref;
	        this.aClass = aClass;
	        this.aTitle = aTitle;
	    }
	}
    export default {
		props: {
		  isChecked: {
              type: Boolean,
              default: false
		  }
		},
        // 基础组件展示星星
        data () {
            return {
                starArr: [
                    new Stars('starScore1', 'score_1', '#starScore1', 'star_1', '差'),
                    new Stars('starScore2', 'score_2', '#starScore2', 'star_2', '较差'),
                    new Stars('starScore3', 'score_3', '#starScore3', 'star_3', '普通'),
                    new Stars('starScore4', 'score_4', '#starScore4', 'star_4', '较好'),
                    new Stars('starScore5', 'score_5', '#starScore5', 'star_5', '好')
                ]
            }
        },
	    watch: {
		  isChecked: function (val, oldVal) {
		      
		      //console.log('--->');
			}
	    },
        methods: {
            addRating(index) {
                // 返回点击的星星数给父元素
                this.$emit('click-rating', index+1);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
	$bg_url: '../../assets/star.png';
	.star_bg {
		/* 星星宽是24px */
		width: 120px; height: 20px;
		background: url($bg_url) repeat-x;
		position: relative;
		overflow: hidden;
	}
	.star {
		height: 100%; width: 24px;
		line-height: 6em;
		position: absolute;
		z-index: 3;
	}
	.star:hover {
		background: url($bg_url) repeat-x 0 -20px!important;
		left: 0; z-index: 2;
	}
	
	
	/*.star_1 { left: 0; }*/
	/*.star_2 { left: 24px; }*/
	/*.star_3 { left: 48px; }*/
	/*.star_4 { left: 72px; }*/
	/*.star_5 { left: 96px; }*/
	/*.star_1:hover { width: 24px; }*/
	/*.star_2:hover { width: 48px; }*/
	/*.star_3:hover { width: 72px; }*/
	/*.star_4:hover { width: 96px; }*/
	/*.star_5:hover { width: 120px; }*/
	
	$number: 5;
	@for $i from 1 through $number {
		.star_#{$i} {
			left: 24px * ($i - 1);
			&:hover {
				width: 24px * $i ;
			}
		}
	}
	
	
	
	label {
		display: block;
		_display:inline;
		height: 100%; width: 100%;
		cursor: pointer;
	}
	
	/* 幕后的英雄，单选按钮 */
	.score { position: absolute; clip: rect(0 0 0 0); }
	.score:checked + .star {
		background: url($bg_url) repeat-x 0 -20px;
		left: 0; z-index: 1;
	}
	.score_1:checked ~ .star_1 { width: 24px; }
	.score_2:checked ~ .star_2 { width: 48px; }
	.score_3:checked ~ .star_3 { width: 72px; }
	.score_4:checked ~ .star_4 { width: 96px; }
	.score_5:checked ~ .star_5 { width: 120px; }
	
	 .star_bg:hover .star {  background-image: none; }
	
	/* for IE6-IE8 JS 交互 */
	.star_checked {
		background: url($bg_url) repeat-x 0 -20px;
		left: 0; z-index: 1;
	}


</style>














