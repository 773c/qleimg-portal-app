<<template>
	<view>
		<cu-custom bgColor="bg-purple" style="padding-bottom: 180px;background-color: #6739B6;border-bottom-left-radius: 20%;border-bottom-right-radius: 20%;">
			<block slot="content">
				<view class="box">
					<view class="cu-bar">
						<view class="action sub-title" style="margin: 0 auto;margin-top:5px;">
							<text class="text-xxl text-bold" style="color: #9999cc;font-size: 28px;">Qiaole Pic</text>
							<text class="bg-gradual-pink" style="width:2rem"></text>
						</view>
					</view>
				</view>
			</block>
		</cu-custom>
		<view class="flex" style="margin-top: -190px;">
			<view class="flex-sub padding-tb">
				<uni-me></uni-me>
			</view>
		</view>
		<view class="flex" align="center" style="margin-top: -5px;">
			<view class="flex-sub padding-tb">
				<view class="img-difference-wrapper" @tap="goUrl('../imgDifference/imgDifference')">
					<image style="width: 105rpx;height: 105rpx;" src="../../static/img/img-difference.png"></image><br>
					<text>图像做差</text>
				</view>
			</view>
			<view class="flex-sub padding-tb">
				<view class="img-mark-wrapper" @tap="goUrl('../imgMark/imgMark')">
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
		<view class="flex">
			<view class="flex-sub padding-tb">
				<view class="page-body">
					<view class="page-section page-section-gap">
						<map style="width: 100%; height: 300px;" 
						:latitude="latitude" 
						:longitude="longitude" 
						:markers="covers">
						</map>
					</view>
				</view>
			</view>
		</view>
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
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '@/static/img/tabbar-home.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '@/static/img/tabbar-home.png'
				}]
			}
		},
		methods: {
			goUrl(url) {
				uni.navigateTo({
					url: url
				})
			}
		},
		onLoad() {
			// alert(1)
			// uni.getLocation({
			//     type: 'wgs84',
			//     success: function (res) {
			//         console.log('当前位置的经度：' + res.longitude);
			//         console.log('当前位置的纬度：' + res.latitude);
			//     }
			// });
		}
	}
</script>

<style>
	.img-difference-wrapper {
		/* margin-left: 40rpx; */
	}
</style>
