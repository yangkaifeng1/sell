<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span class="block positive" :class="{'active':inSelectType===2}" @click="select(2, $event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active':inSelectType===0}" @click="select(0, $event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span class="block negative" :class="{'active':inSelectType===1}" @click="select(1, $event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div class="switch">
			<span @click="toggleContent" class="icon-check_circle" :class="{'on': inOnlyContent}"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
  	const POSITIVE = 0;
  	const NEGATIVE = 1;
  	const ALL = 2;

	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					[];
				}
			},
			desc: {
				type: Object
			},
			// selectType,
			// onlyContent
			selectType: {
				type: Number
			},
			onlyContent: {
				type: Boolean
			}
		},
		data() {
			return {
				inSelectType: this.selectType,
				inOnlyContent: this.onlyContent
			}
		},
		watch: {
			selectType(val1) {
				this.inSelectType = val1;
			},
			onlyContent(val2) {
				this.inOnlyContent = val2;
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				}) 
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				}) 
			}
		},
		methods: {
			select(type, event) {
				if (!event._constructed) {
					return;
				}
				this.inSelectType = type;
				this.$emit('out-selecttype', type);
			},
			toggleContent() {
				if (!event._constructed) {
					return;
				}
				this.inOnlyContent = !this.inOnlyContent;
				this.$emit('out-onlycontent', this.inOnlyContent);
			}
		}

	}	
</script>

<style lang="less" scoped>
   	@import "../../common/css/mixin.less";

	.ratingselect{
		.rating-type{
			padding: 18px 0;
			margin: 0 18px;
			font-size: 0;
			.border-1px(rgba(7, 17, 27, 0.1));
			.block{
				display: inline-block;
				padding: 8px 12px;
				margin-right: 8px;
				border-radius: 1px;
				color: rgb(77, 85, 93);
				font-size: 12px;
				&.active{
					color: #fff;
				}
				&.positive{
					background: rgba(0, 160, 220, 0.2);
					&.active{
						background: rgb(0, 160, 220);
					}
				}
				&.negative{
					background: rgba(77, 85, 93, 0.2);
					&.active{
						background: rgb(77, 85, 93);
					}
				}
				.count{
					font-size: 8px;
					margin-left: 2px;
				}
			}
		}
		.switch{
			padding: 12px 18px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
			color: rgb(147, 153, 159);
			font-size: 0;
			.icon-check_circle{
				display: inline-block;
				margin-right: 4px;
				font-size: 24px;
				vertical-align: top;
				&.on{
					color: #00c850;
				}
			}		
			.text{
				display: inline-block;
				vertical-align: top;
				font-size: 12px;
			}	
		}
	}
</style>