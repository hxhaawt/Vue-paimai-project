<template>
	<!-- 这是 幻灯片 显示组件 -->
	<div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
		<div class="slide-img">
			<a :href="slides[nowIndex].href">
				<transition name="slide-trans">
					<img v-if="isShow" :src="slides[nowIndex].src">
				</transition>
				<transition name="slide-trans-old">
					<img v-if="!isShow" :src="slides[nowIndex].src">
				</transition>
			</a>
		</div>
		<h2>{{ slides[nowIndex].title }}</h2>
		<ul class="slide-pages">
			<li @click="goto(prevIndex)">&lt;</li>
			<li v-for="(item, index) in slides"
			    @click="goto(index)"
			    :key="index"
			>
				<a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
			</li>
			<li @click="goto(nextIndex)">&gt;</li>
		</ul>
	</div>
</template>

<script>

    // 这是幻灯片 模块
    export default {
        props: {
            slides: {
                type: Array,
                default: []
            },
            inv: {
                type: Number,
                default: 1000
            }
        },
        data () {
            return {
                nowIndex: 0,
                isShow: true
            }
        },
        computed: {
            prevIndex () {
                if (this.nowIndex === 0) {
                    return this.slides.length - 1;
                }
                else {
                    return this.nowIndex - 1;
                }
            },
            nextIndex () {
                if (this.nowIndex === this.slides.length - 1) {
                    return 0;
                }
                else {
                    return this.nowIndex + 1;
                }
            }
        },
        methods: {
            goto (index) {
                this.isShow = false;
                setTimeout(() => {
                    this.isShow = true;
                    this.nowIndex = index;
                }, 10)
            },
            runInv () {
                this.invId = setInterval(() => {
                    this.goto(this.nextIndex)
                }, this.inv)
            },
            clearInv () {
                clearInterval(this.invId)
            }
        },
        mounted () {
            // 组件加载完成，运行函数，自动切换图片
            this.runInv();
        }
    }
</script>

<style scoped>
	.slide-trans-enter-active {
		transition: all .5s;
	}
	.slide-trans-enter {
		transform: translateX(900px);
	}
	.slide-trans-old-leave-active {
		transition: all .5s;
		transform: translateX(-900px);
	}
	.slide-show {
		position: relative;
		margin: 15px 15px 15px 0;
		/*width: 900px;*/
		/*height: 500px;*/
		width: 100%;
		height: 300px;
		
		overflow: hidden;
	}
	.slide-show h2 {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding-left: 15px;
		opacity: .2;
		
		height: 30px;
		text-align: left;
		
		color: #fff;
		background: #000;
	}
	.slide-img {
		width: 100%;
	}
	.slide-img img {
		width: 100%;
		position: absolute;
		top: 0;
	}
	.slide-pages {
		position: absolute;
		bottom: 10px;
		right: 15px;
	}
	.slide-pages li {
		display: inline-block;
		padding: 0 10px;
		cursor: pointer;
		color: #fff;
	}
	.slide-pages li .on {
		text-decoration: underline;
	}
</style>
