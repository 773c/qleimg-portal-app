<template>
	<view>
		<cu-custom bgColor="bg-purple" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"><text>图像做差</text></block>
		</cu-custom>
		<view class="flex">
			<view class="flex-sub">
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles text-red"></text>
						<text class="text-lg text-purple text-bold">处理前</text>
					</view>
				</view>
			</view>
		</view>
		<view class="beforeHandle-wrapper">
			<image src="../../static/img/0773.jpg"></image>
			<image src="../../static/img/0773-1.jpg" style="margin-top: -3px;"></image>
		</view>
		<view class="flex">
			<view class="flex-sub">
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles text-red"></text>
						<text class="text-lg text-purple text-bold">处理后</text>
					</view>
				</view>
			</view>
		</view>
		<view class="afterHandle-wrapper">
			<image src="../../static/img/result.png"></image>
		</view>
		<view class="flex">
			<view class="flex-sub padding-tb" style="padding-top: 0px;padding-bottom: 0px;">
				<form>
					<view class="cu-bar bg-white">
						<view class="action">
							请选择图片
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
		<view class="flex" style="margin-top: 0;">
			<view class="flex-sub padding-xl">
				<button class="cu-btn block bg-purple lg" @tap="generateHandler" data-target="Image"><text class="cuIcon-upload"></text>
					一键生成</button>
			</view>
		</view>
		<!-- <view class="generate-image-wrapper" @tap="ViewGenerateImage" :data-url="generateImage[0]">
			<image :src="generateImage[0]" mode="aspectFill"></image>
		</view> -->

		<!-- model模态框 -->
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="img-top">
				<image src="../../static/img/cry.png" style="width: 72px;height: 72px;box-shadow:1px 2px 1px #FFE4E1;border-radius: 50%;" />
			</view>
			<view class="cu-dialog" style="width: 70%;">
				<view style="padding-bottom: 8%;">
					<view class="cu-bar justify-end text-white" style="">
						<view class="action" @tap="hideModal" style="z-index: 1000;">
							<text class="cuIcon-close" style="background-color: #E54D42;"></text>
						</view>
					</view>
					<view>
						<text class="text-bold text-xl">警告</text><br><br>
						<text class="text-gray text-lg">您上传的图片数量未满足要求</text><br>
						<text class="text-gray text-lg">请完成要求再操作</text>
					</view>
				</view>
				<view class="bg-white">
					<button class="cu-btn bg-red margin-tb-sm lg round" @tap="hideModal" style="padding: 0 50px;">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'imgDifference',
		data() {
			return {
				dataObj: {
					accessKeyId: '',
					policy: '',
					signature: '',
					dir: '',
					host: '',
					callback: ''
				},
				ossUploadPath: 'https://qleimg.oss-cn-beijing.aliyuncs.com/',
				imgList: [],
				src: '',
				modalName: null
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
					confirmColor: '#FE0000',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ViewGenerateImage(e) {
				uni.previewImage({
					urls: this.generateImage,
					current: e.currentTarget.dataset.url,
					longPressActions: true
				});
			},
			generateHandler(e) {
				console.log(this.imgList)
				let imgs = this.imgList.map((value, index) => {
					return {
						name: "image" + index,
						uri: value
					}
				})
				if (this.imgList.length === 2) {
					// 获取上传策略的请求
					uni.request({
						url: 'http://192.168.100.10:8002/aliyun/oss/policy',
						method: 'GET',
						success: (res) => {
							//请求成功，开始上传图片
							uni.uploadFile({
								url: 'http://192.168.100.10:8002/portal/difference',
								files: imgs,
								formData: {},
								method: 'POST',
								success: (res) => {
									console.log(res)
									let data = JSON.parse(res.data)
									uni.navigateTo({
										url: './generate/generate?image=' + data.data
									})
								}
							})
						}
					})
				} else {
					// 图像不满足两张时
					this.modalName = e.currentTarget.dataset.target
				}
			},
			hideModal(e) {
				this.modalName = null
			}
		}

	}
</script>

<style>
	.beforeHandle-wrapper {
		/* height: 181px; */
		/* border: 1px solid red; */
	}

	.beforeHandle-wrapper>image {
		height: 168px;
	}

	.afterHandle-wrapper>image {
		height: 168px;
	}

	.img-top { 
		position: relative;
		top: 6%;
		margin-top: -150%;
		z-index: 999;
	}

	/* .generate-image-wrapper{
		height: 300px;
		border: 1px solid red;
	} */
</style>
