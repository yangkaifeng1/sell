<template>
	<div class="seller" ref="sellerWrapper">
		<div class="seller-wrapper">
			<div class="seller-header">
				<div class="top border-1px">
					<div class="left">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star class="star" :size="36" :score="seller.score"></star>
							<div class="ratenum">({{seller.ratingCount}})</div>
							<div class="sellnum">月售{{seller.sellCount}}单</div>
						</div>
					</div>
					<div class="right">
						<i class="icon-favorite" :class="{'active':collected}" @click="toggle"></i>
						<div class="collect">{{collectStatus}}</div>
					</div>
				</div>
				<div class="footer">
					<div class="foot-item borderR-1px">
						<div class="desc">起送价</div>
						<div class="count">{{seller.minPrice}}<span class="item">元</span></div>
					</div>
					<div class="foot-item borderR-1px">
						<div class="desc">商家配送</div>
						<div class="count">{{seller.deliveryPrice}}<span class="item">元</span></div>
					</div>
					<div class="foot-item borderR-1px">
						<div class="desc">平均配送时间</div>
						<div class="count">{{seller.deliveryTime}}<span class="item">分钟</span></div>
					</div>
				</div>
			</div>
			<split></split>
			<div class="active">
				<div class="top border-1px">
					<h1 class="title">公告与活动</h1>
					<p class="desc">{{seller.bulletin}}</p>
				</div>
				<ul class="supports-wrapper">
					<li v-for="(item, index) in seller.supports" class="item border-1px">
						<span class="type" :class="classmaps[seller.supports[index].type]"></span>
						<span class="desc">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pics-wrapper" ref="picWrapper">
					<div class="pic-list">
						<div v-for="item in seller.pics" class="item">
							<img :src="item" width="120" height="90" class="pic-item">
						</div>
					</div>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title border-1px">商家信息</h1>
				<ul class="infos-wrapper">
					<li class="item border-1px" v-for="item in seller.infos">
						{{item}}
					</li>
				</ul>
			</div>
		</div>
		<shopcart :select-foods="foods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
	</div>
</template>

<script>
	import split from '../split/split';
	import shopcart from '../shopcart/shopcart';
	import star from '../star/star';
	import BScroll from 'better-scroll';
	// import vueScrollbar from 'vue-scrollbar';
	import PerfectScrollbar from 'perfect-scrollbar';
	import { mapGetters } from 'vuex';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				collected: false
			}
		},
		computed: {
			collectStatus () {
				if (this.collected) {
					return "已收藏"
				} else {
					return "收藏"
				}
			},
			...mapGetters([
		      	'foods'
		    ])
		},
		methods: {
			toggle () {
				return this.collected = !this.collected;
			}
		},
		created () {
			// $on('shops', (val) => {
				
			// })
			this.classmaps = ["decrease", "discount", "special", "invoice", "guarantee"];
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.sellerWrapper, {
					click: true
				});
				this.Pscroll = new BScroll(this.$refs.picWrapper, {
					scrollX: true
				});
			});
		},
		components: {
			split,
			shopcart,
			star
			// vueScrollbar
		}
	};
</script>

<style lang="less" scoped>
	@import '../../common/css/mixin.less';

	.seller{
		position: absolute;
	    top: 184px;
	    bottom: 46px;
	    width: 100%;
	    overflow: hidden;
		.seller-wrapper{
			width: 100%;
			.seller-header{
				margin: 0 18px;
				padding: 18px 0;
				.top{
					display: flex;
					padding-bottom: 18px;
					.border-1px(rgba(7, 17, 27, 0.1));
					.left{
						flex: 1;
						font-size: 0;
						.name{
							font-size: 14px;
							color: rgb(7, 17, 27);
							line-height: 14px;
							margin-bottom: 8px;
						}
						.star{
							display: inline-block;
							vertical-align: top;
							margin-right: 8px;
						}
						.ratenum, .sellnum{
							display: inline-block;
							vertical-align: top;
							line-height: 18px;
							font-size: 10px;
							color: rgb(77, 85, 93);
						}
						.ratenum{
							margin-right: 12px;
						}
					}
					.right{
						flex: 0 0 60px;
						width: 30px;
						text-align: center;
						.icon-favorite{
							font-size: 24px;
							color: rgb(77, 85, 93);
							line-height: 24px;
							margin-bottom: 4px;
							&.active{
								color: rgb(240, 20, 20);
							}
						}
						.collect{
							font-size: 10px;
							color: rgb(77, 85, 93);
						}
					}
				}
				.footer{
					display: flex;
					margin-top: 18px;
					.foot-item{
						flex: 1;
						text-align: center;
						.borderR-1px(rgba(7, 17, 27, 0.1));
						&:first-child{
							.border-none();
						}
						.desc{
							font-size: 10px;
							color: rgb(147, 153, 159);
							margin-bottom: 4px;
						}
						.count{
							font-size: 24px;
							color: rgb(7, 17, 27);
							.item{
								font-size: 10px;
							}
						}
					}
				}
			}
			.active{
				margin: 18px;
				margin-bottom: 0;
				.top{
					padding-bottom: 16px;
					.border-1px(rgba(7, 17, 27, 0.1));
					.title{
						font-size: 14px;
						color: rgb(7, 17, 27);
						line-height: 14px;
						margin-bottom: 8px;
					}
					.desc{
						padding: 0 12px;
						font-size: 12px;
						color: rgb(240, 20, 20);
						font-weight: 200;
						line-height: 24px; 
					}
				}
				.supports-wrapper{
					.item{
						padding: 16px 0;
						margin: 0 12px;
						font-size: 0;
						.border-1px(rgba(7, 17, 27, 0.1));
						&:last-child{
							.border-none();
						}
						.type{
							display: inline-block;
							width: 16px;
							height: 16px;
							margin-right: 6px;
							background-size: 16px 16px;
							background-repeat: no-repeat;
							vertical-align: top;
							&.decrease{
								.bg-img("../../components/seller/img/decrease_4");
							}
							&.discount{
								.bg-img("../../components/seller/img/discount_4");
							}
							&.special{
								.bg-img("../../components/seller/img/special_4");
							}
							&.invoice{
								.bg-img("../../components/seller/img/invoice_4");
							}
							&.guarantee{
								.bg-img("../../components/seller/img/guarantee_4");
							} 
						}
						.desc{
							vertical-align: top;
							font-size: 12px;
							font-weight: 200;
							color: rgb(7, 17, 27);
							line-height: 16px;
						}
					}
				}
			}
			.pics{
				padding: 18px;
				padding-right: 0;
				.title{
					font-size: 14px;
					color: rgb(7, 17, 27);
					line-height: 14px;
					margin-bottom: 12px;
				}
				.pics-wrapper{
					position: relative;
					height: 90px;
					.pic-list{
						position: absolute;
						top: 0;
						left: 0;
						display: flex;
						flex-decoration: column;
						overflow: hidden;
						.item{
							display: inline-block;
							width: 120px;
							height: 90px;
							margin-right: 6px;
							&:last-child{
								margin-right: 18px;
							}
						}
					}
				}
			}
			.info{
				padding: 18px;
				padding-bottom: 0;
				.title{
					font-size: 14px;
					color: rgb(7, 17, 27);
					line-height: 14px;
					padding-bottom: 12px;
					.border-1px(rgba(7, 17, 27, 0.1));
				}
				.infos-wrapper{
					.item{
						padding: 16px 12px;
						.border-1px(rgba(7, 17, 27, 0.1));
						font-size: 12px;
						font-weight: 12px;
						color: rgb(7, 17, 27);
						line-height: 16px;
						&:last-child{
							.border-none();
						}
					}
				}
			}
		}
	}
</style>