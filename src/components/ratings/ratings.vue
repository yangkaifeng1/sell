<template>
	<div class="rating"  ref="ratingWrapper">
		<div class="rating-content">
			<div class="rating-header" >
				<div class="header-left">
					<div class="score">{{seller.score}}</div>
					<div class="overall-score">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="header-right">
					<div class="score-wrapper">
						<div class="title">服务态度</div>
						<star class="star" :size="36" :score="seller.serviceScore"></star>
						<div class="number">{{seller.serviceScore}}</div>
					</div>
					<div class="score-wrapper">
						<div class="title">商品评分</div>
						<star class="star" :size="36" :score="seller.foodScore"></star>
						<div class="number">{{seller.foodScore}}</div>
					</div>
					<div class="score-wrapper">
						<div class="title">送达时间</div>
						<div class="time">{{seller.deliveryTime}}分钟</div>
					</div>
				</div>
			</div>
			<split></split>
			<ratingSelect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" @out-selecttype="onSelectType" @out-onlycontent="onOnlyContent"></ratingSelect>
			<div class="content-wrapper">
				<ul>
					<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item border-1px">
						<div class="avatar-wrapper">
							<img :src="rating.avatar" class="avatar" width="28" height="28">
						</div>
						<div class="item-right">
							<div class="user-rate">
								<span class="username">{{rating.username}}</span>
								<span class="ratetime">{{dates(rating.rateTime)}}</span>
							</div>
							<div class="star-time">
								<star class="star" :size="36" :score="rating.score"></star>
								<span v-show="rating.deliveryTime" class="time">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="tag-wrapper">
								<i class="active" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
								<span class="recommend" v-for="item in rating.recommend">{{item}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>	
		</div>
		<shopcart :select-foods="foods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
	</div>
	
</template>	

<script>
	import star from '../star/star';
	import split from '../split/split';
	import ratingSelect from '../ratingselect/ratingselect';
	import shopcart from '../shopcart/shopcart';

	import BScroll from 'better-scroll';
	import moment from 'moment';
	import Axios from 'axios';
	import { mapGetters } from 'vuex';

	const errOk = 0;
	const ALL = 2;
	const POSITIVE = 0;
  	const NEGATIVE = 1;

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				selectType: ALL,
				onlyContent: false,
				ratings: [],
				desc: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			}
		},
		methods: {
			dates (date) {
				return moment(date).format('YYYY-MM-DD hh:mm');
			},
			onSelectType (type) {
				if (type === undefined) {
					this.selectType = this.selectType;
				}
				this.selectType =type;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
			onOnlyContent (bol) {
				if (bol === undefined) {
					this.onlyContent = this.onlyContent;
				}
				this.onlyContent = bol;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
			needShow (type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			}
		},
		computed: {
			...mapGetters([
		      	'foods'
		    ])
		},
		created () {
			this.$http.get('http://10.10.10.6:8888/api/ratings').then((res) => {
				let data = res.data;
				if (data.error === errOk) {
					this.ratings = data.data;
					console.log(this.ratings);
					this.$nextTick(() => {
						if(!this.scroll) {
							this.scroll = new BScroll(this.$refs.ratingWrapper, {
								click: true
							})
						} else {
							this.scroll.refresh();
						}
					})
				}
			})
		},
		components: {
			split,
			star,
			ratingSelect,
			shopcart
		}
	};
</script>

<style lang="less" scoped>
	@import "../../common/css/mixin.less";

	.rating{
		position: absolute;
		top: 184px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.rating-header{
			display: flex;
			width: 100%;
			padding: 18px 0;
			.header-left{
				flex: 0 0 137px;
				width: 137px;
				text-align: center;
				.score{
					font-size: 24px;
					line-height: 28px;
					color: rgb(255, 150, 0);
					margin-bottom: 6px;
				}
				.overall-score{
					font-size: 12px;
					color: rgb(7, 17, 27);
					line-height: 12px;
					margin: 8px 0;
				}
				.rank{
					font-size: 10px;
					line-height: 10px;
					color: rgba(7, 17, 27, 0.5);
				}
			}
			.header-right{
				flex: 1;
				border-left: 1px solid rgba(7, 17, 27, 0.3);
				font-size: 0;
				padding-left: 24px;
				.score-wrapper{
					margin-bottom: 8px;
					&:last-child{
						margin-bottom: 0;
					}
					.title{
						display: inline-block;
						font-size: 12px;
						color: rgb(7, 17, 27);
						line-height: 18px;
						margin-right: 12px;
						vertical-align: top;
					}
					.star{
						display: inline-block;
						margin-right: 12px;
					}
					.number, .time{
						display: inline-block;
						vertical-align: top;
						font-size: 12px;
						line-height: 18px;
					}
					.number{
						color: rgb(255, 153, 0);
					}
					.time{
						color: rgb(147, 153, 159);
					}
				}
				
			}
		}
		.content-wrapper{
			.rating-item{
				position: relative;
				display: flex;
				margin: 0 18px;
				padding: 18px 0;
				box-sizing: border-box;
				.border-1px(rgba(7, 17, 27, 0.1));
				&:last-child{
					.border-none();
				}
				.avatar-wrapper{
					flex: 0 0 28px;
					width: 28px;
					.avatar{
						width: 28px;
						height: 28px;
						border-radius: 50%;
					}
				}
				
				.item-right{
					flex: 1;
					margin-left: 12px;
					.user-rate{
						margin-bottom: 4px;
						.username{
							font-size: 10px;
							line-height: 12px;
							color: rgb(7, 17, 27);
						}
						.ratetime{
							font-size: 10px;
							font-weight: 200;
							color: rgb(147, 153, 159);
							line-height: 12px;
							float: right;
						}
					}
					.star-time{
						margin-bottom: 6px;
						font-size: 0;
						.star{
							display: inline-block;
							margin-right: 6px;
							// vertical-align: top;
						}
						.time{
							display: inline-block;
							vertical-align: top;
							font-size: 12px;
							font-weight: 200;
							color: rgb(147, 153, 159);
							line-height: 17px;
						}
					}
					.text{
						font-size: 12px;
						color: rgb(7, 17, 27);
						line-height: 18px;
						margin-bottom: 8px;
					}
					.tag-wrapper{
						.icon-thumb_up{
							&.active{
								color: rgb(0, 160, 220)
							}
						}
						.icon-thumb_down{
							&.active{
								color: rgb(183, 187, 191)
							}
						}
						.recommend{
							vertical-align: top;
							margin-left:8px;
							padding: 0 12px;
							font-size: 9px;
							color: rgb(147, 153, 159);
							line-height: 16px;
							border:1px solid rgba(7, 17, 27, 0.1);
							border-radius: 2px;
							
						}
					}
				}
				
			}
		}
	}
</style>