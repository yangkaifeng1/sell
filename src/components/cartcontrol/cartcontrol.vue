<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: {
			food: {
				type: Object
			}	
		},
		created() {
		},
		methods: {
			addCart(event) {
				if (!event._constructed) {
					return;
				}
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count ++;
				}
				this.$store.commit('getEle', event.target);
			},
			decreaseCart(event) {
				if (!event._constructed) {
					return;
				}
				if (this.food.count) {
					this.food.count--;
				}
			}	
		}
	}
</script>

<style lang="less" scoped>
	.cartcontrol{
		font-size: 0;
		.move-enter-active, .move-leave-active{
			opacity: 1;
			transform: translate3D(0, 0, 0) rotate(0);			
			transition: all .4s linear;

		}
		.move-enter, .move-leave-to{
			opacity: 0;
			transform: translate3D(24px, 0, 0) rotate(180deg);
		}
		.cart-decrease{
			display: inline-block;
			padding: 6px;
			.inner{
				display: inline-block;
				line-height: 24px;
				font-size: 24px;
				color: rgb(0, 160, 220);
			}
		}
		.cart-count{
			display: inline-block;
			vertical-align: top;
			width: 14px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			font-size: 12px;
			color: rgb(147, 153, 159);
		}
		.cart-add{
			display: inline-block;
			padding: 6px;
			line-height: 24px;
			font-size: 24px;
			color: rgb(0, 160, 220)
		}
	}
</style>