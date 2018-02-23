<template>
	<div>
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'highlight':totalCount>0}">
							<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price border-1px" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费￥{{deliveryPrice}}</div>
				</div>
				<div class="content-right" @click.stop.prevent="pay">
					<div class="pay" :class="payClass">{{payDesc}}</div>
				</div>
			</div>
			<transition name="folds">
				<div class="shopcart-list" v-show="listshow">
					<div class="list-header">
						<h1 class="title"></h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listWrapper">
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>￥{{food.price*food.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartControl :food="food"></cartControl>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
			<div class="ball-container">
				<div v-for="(ball, index) in balls" @gete="drop">
					<transition name="drop">
						<div v-show="ball.show" class="ball" >
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</div>
			</div>
		</div>
		<transition name="mask">
			<div class="list-mask" v-show="listshow" @click="hideList"></div>
		</transition>
	</div>
</template>

<script>
	import cartControl from '../cartcontrol/cartcontrol';
	import BScroll from 'better-scroll';
	import { mapMutations, mapGetters } from 'vuex';

	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [
						{
							price: 0,
							count: 0
						}
					];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				fold: true,
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				]
			}
		},
		computed: {
			...mapGetters([
				'foods'
			]),
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total +=food.price * food.count;
				})
				return total; 
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				})
				return count;
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;
				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`;
				} else {
					return '去结算';
				}
			},
			payClass() {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough';
				} else {
					return 'enough';
				}
			},
			listshow() {
				if (!this.totalCount) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if (show) {
					this.$nextTick(() => {
						if (!this.listScroll) {
							this.listScroll = new BScroll(this.$refs.listWrapper, {
								click: true
							});
						} else{
							this.listScroll.refresh();
						}
					})
				}
				return show; 
			}
		},
		methods: {
			drop () {
				debugger
				// if (this.$store.state.foods > 0) {
					console.log('11');
				// }
			},
			toggleList () {
				if (!this.totalCount) {
					return
				};
				this.fold = !this.fold;
			},
			empty () {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				});
			},
			hideList () {
				console.log(this.$store.state.foods);
				this.fold = true;
			},
			pay () {
				if (this.totalPrice < this.minPrice) {
					return;
				}
				alert(`确定支付￥${this.totalPrice}`);
			}
		},
		components: {
			cartControl
		}
	}
</script>

<style lang="less" scoped>
	@import "../../common/css/mixin.less";

	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
		background: rgba(0, 0, 0, 0.5);
		.content{
			display: flex;
			background: #141d27;
			color: rgba(255, 255, 255, 0.4);
			.content-left{
				flex: 1;
				font-size: 0;
				.logo-wrapper{
					display: inline-block;
					vertical-align: top;
					position: relative;
					top: -10px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					border-radius: 50%;
					background: #141d27;
					.logo{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: #2b343c;
						text-align: center;
						&.highlight{
							background: rgb(0, 160, 220);
						}
						.icon-shopping_cart{
							line-height: 44px;
							font-size: 24px;
							color: #80858a;
							&.highlight{
								color: #fff;
							}
						}
					}
					.num{
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 10px;
						font-weight: 700;
						color: #fff;
						background: rgb(240, 20, 20);
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
					}
				}
				.price{
					display: inline-block;
					vertical-align: top;
					margin-top: 12px;
					line-height: 24px;
					padding-right: 12px;
					box-sizing: border-box;
					font-size: 16px;
					font-weight: 700;
					border-right: 1px solid rgba(255, 255, 255, 0.2);
					&.highlight{
						color: #fff;
					}
				}
				.desc{
					display: inline-block;
					vertical-align: top;
					margin: 12px 0 0 12px;
					line-height: 24px;
					font-size: 12px;
				}
			}
			.content-right{
				flex: 0 0 105px;
				width: 105px;
				.pay{
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					font-weight: 700;
					background: #2b333b;
					&.not-enough{
						background: #2b333b
					}
					&.enough{
						background: #00b43c;
						color: #fff;
					}
				}
			}
		}
		.drop-enter-active{
			transition: all 0.4s;                    
		}
		.folds-enter{
			opacity: 0;
		}
		.ball-container{
			.ball{
				position: fixed;
				left: 32px;
				bottom: 22px;
				z-index: 200;
				width: 16px;
				height: 16px;
				color: rgb(0, 160, 220);
				border-radius: 50%;
			}
		}
		.folds-enter-active, .folds-leave-active{
			transition: all .5s;
			opacity: 1;
			// transform: translate3d(0, 100px, 0);
		}		
		.folds-enter, .folds-leave-to{
			opacity: 0;
			// transform: translate3d(0, 0, 0);
		}
		// @keyframe
		.shopcart-list{
			position: absolute;
			// top: -100%;
			bottom: 48px;
			left: 0;
			z-index: -1;
			width: 100%;
			background: red;
			
			.list-header{
				height: 40px;
				line-height: 40px;
				padding: 0 18px;
				background: #f3f4f7;
				border-bottom: 1px solid rgba(7, 17, 27, 0.1);
				.title{
					float: left;
					font-size: 14px;
					color: rgb(7, 17, 27);
				}
				.empty{
					float: right;
					font-size: 12px;
					color: rgb(0, 160, 220);
				}
			}
			.list-content{
				padding: 0 18px;
				max-height: 217px;
				overflow: hidden;
				background: #fff;
				.food{
					position: relative;
					padding: 12px 0;
					box-sizing: border-box;
					.border-1px(rgba(7, 17, 27, 0.1));
					.name{
						line-height: 24px;
						font-size: 14px;
						color: rgb(7, 17, 27)
					}
					.price{
						position: absolute;
						right: 90px;
						bottom: 12px;
						line-height: 24px;
						font-size: 14px;
						font-weight: 700;
						color: rgb(240, 20, 20);
					}
					.cartcontrol-wrapper{
						position: absolute;
						right: 0;
						bottom: 6px;
					}
				}
			}
		}
	}
	.mask-enter-active, .mask-leave-active{
		transition: all .5s;
		opacity: 1;
	}
	.mask-enter, .mask-leave-to{
		opacity: 0;
	}
	.list-mask{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 40;
		background: rgba(7, 17, 27, 0.6);
		backdrop-filter: blur(10px);
	}
</style>