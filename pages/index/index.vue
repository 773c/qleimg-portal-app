<template>
	<view>
		<cu-custom bgColor="bg-purple">
			<block slot="content">
				<view class="box">
					<view class="cu-bar">
						<view class="action sub-title" style="margin: 0 auto;">
							<text class="text-xl text-bold text-white">诶巧了图像</text>
							<text class="text-ABC text-white">image</text>
						</view>
					</view>
				</view>
			</block> 
		</cu-custom>
		<view class="flex">
			<view class="flex-sub padding-tb">
				<uni-me></uni-me>
			</view>
		</view>
		<view class="flex" align="center">
			<view class="flex-sub padding-tb">
				<view class="img-difference-wrapper" @tap="goUrl('../imgDifference/imgDifference')">
					<image style="width: 105rpx;height: 105rpx;" src="../../static/img/img-difference.png"></image><br>
					<text>图像做差</text>
				</view>
			</view>
			<view class="flex-sub padding-tb">
				<view class="img-mark-wrapper">
					<image style="width: 105rpx;height: 105rpx;" src="../../static/img/img-mark.png"></image><br>
					<text>图像标记</text>
				</view>
			</view>
			<view class="flex-sub padding-tb">
				<view class="img-difference1-wrapper">
					<image style="width: 105rpx;height: 105rpx;" src="../../static/img/img-difference.png"></image><br>
					<text>图像做差</text>
				</view>
			</view>
			<view class="flex-sub padding-tb">
				<view class="img-difference2-wrapper">
					<image style="width: 105rpx;height: 105rpx;" src="../../static/img/img-difference.png"></image><br>
					<text>图像做差</text>
				</view>
			</view>
		</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
		<view>11</view>
	</view>
</template>

<script>
	import uniMe from '../swiper/swiper.vue'
	export default {
		components: {
			uniMe
		},
		data() {
			return {

			}
		},
		methods: {
			goUrl(url){
				uni.navigateTo({
					url:url
				}) 
			}
		},
		created() {

		}
	}
</script>

<style>
.img-difference-wrapper{
	/* margin-left: 40rpx; */
}
</style>
