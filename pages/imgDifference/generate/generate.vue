<template>
	<view>
		<cu-custom bgColor="bg-black" style="padding-bottom: 30%;background-color: #000000;" isBack="true" cuIconColor="text-white">
			<block slot="backText"><text class="text-white">返回</text></block>
			<block slot="content"><text class="text-white">图片已保存</text></block>
		</cu-custom>
		<view class="" style="position: absolute;top: 50px;left: 40px;">
			<text class="text-gray text-sm ">继续操作</text>
		</view>
		<view class="flex" align="center" style="position: absolute;top: 70px;left: 20px;">
			<view class="flex-sub padding-tb margin-left-xl">
				<view class="img-difference-wrapper" @tap="goUrl('../imgDifference')">
					<image style="width: 60rpx;height: 60rpx;" src="@/static/img/img-difference.png"></image><br>
					<text class="text-white text-sm">图像做差</text>
				</view>
			</view>
			<view class="flex-sub padding-tb margin-left-xl">
				<view class="img-mark-wrapper">
					<image style="width: 60rpx;height: 60rpx;" src="@/static/img/img-mark.png"></image><br>
					<text class="text-white text-sm">图像标记</text>
				</view>
			</view>
			<view class="flex-sub padding-tb margin-left-xl">
				<view class="img-difference1-wrapper">
					<image style="width: 60rpx;height: 60rpx" src="@/static/img/img-difference.png"></image><br>
					<text class="text-white text-sm">图像做差</text>
				</view>
			</view>
			<view class="flex-sub padding-tb margin-left-xl">
				<view class="img-difference2-wrapper">
					<image style="width: 60rpx;height: 60rpx" src="@/static/img/img-difference.png"></image><br>
					<text class="text-white text-sm">图像做差</text>
				</view>
			</view>
		</view>
		<view class="flex" >
			<view class="flex-sub padding-tb">
				<view class="generate-image-wrapper" @tap="ViewImage" :data-url="generateImage[0]">
					
					<image :src="generateImage[0]"></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'generate',
		data() {
			return {
				generateImage: []
			}
		},
		methods: {
			goUrl(url){
				uni.navigateTo({
					url:url
				}) 
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.generateImage,
					current: e.currentTarget.dataset.url
				});
			},
		},
		onLoad(option) {
			this.generateImage[0] = option.image
			console.log(option)
		}
	}
</script>

<style>
	.generate-image-wrapper {
		padding: 0 10px;
	}

	.generate-image-wrapper>image {
		height: 300px;
	}
</style>
