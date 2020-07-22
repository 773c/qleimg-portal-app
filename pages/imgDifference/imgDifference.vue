<template>
	<view>
		<cu-custom bgColor="bg-purple" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"><text>图像做差</text></block>
		</cu-custom>
		<view class="flex">
			<view class="flex-sub padding-tb">
				<form>
					<view class="cu-bar bg-white">
						<view class="action">
							图像选择
						</view>
						<view class="action">
							{{imgList.length}}/2
						</view>
					</view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
								<image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="imgList.length<2">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
				</form>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-xl">
				<button class="cu-btn block line-green lg"><text class="cuIcon-upload" @click="generateHandler()"></text> 一键生成</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'imgDifference',
		data() {
			return {
				imgList: [],
				src:""
			}
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 2, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '老铁',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			generateHandler(){
				uni.request({
					
				})
			}
		}

	}
</script>

<style>
</style>
