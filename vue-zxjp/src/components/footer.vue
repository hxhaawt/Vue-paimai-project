<template>
	<footer class="page-footer">
		<div class="container">
			<hr>
			<p>这是页脚</p>
		</div>
	</footer>
</template>

<script>
    export default {

        // 页面底部
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
	
	.page-footer {
		
		margin-top: 20px;
		/*width: 100%;*/
		/*height: 70px;*/
		text-align: center;
		font-size: 14px;
		
		hr {
			box-sizing: content-box;
			margin: 0 10px;
			height: 0;
			border: 0;
			border-top: 1px solid #eee;
		}
	}

</style>
