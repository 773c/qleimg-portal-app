<template>
	<view>
		<cu-custom bgColor="bg-purple" style="padding-bottom: 90px;background-color: #6739B6;">
			<block slot="content">
				<text>我的介绍</text>
			</block>
		</cu-custom>
		<!-- 我的专属 -->
		<view class="flex" style="margin-top: -10px;">
			<view class="flex-sub">
				<view class="cu-bar bg-white solid-bottom" style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
					<view class="action">
						<text class="cuIcon-titles text-red"></text> 
						<text class="text-gray">我的专属</text> 
					</view>
					<!-- <view class="action">
						<button class="cu-btn bg-green shadow" @tap="showModal" data-target="gridModal">设置</button>
					</view> -->
				</view>
				<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<radio-group class="block" @change="Gridchange">
							<view class="cu-list menu text-left">
								<view class="cu-item" v-for="(item,index) in 3" :key="index">
									<label class="flex justify-between align-center flex-sub">
										<view class="flex-sub">{{index +3}} 列</view>
										<radio class="round" :value="(index + 3) + ''" :class="gridCol==index+3?'checked':''" :checked="gridCol==index+3"></radio>
									</label>
								</view>
							</view>
						</radio-group>
						<view class="cu-list menu text-left solid-top">
							<view class="cu-item">
								<view class="content">
									<text class="text-grey">边框</text>
								</view>
								<view class="action">
									<switch @change="Gridswitch" :class="gridBorder?'checked':''" :checked="gridBorder?true:false"></switch>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
					<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
						<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
							<view class="cu-tag badge" v-if="item.badge!=0">
								<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
							</view>
						</view>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 菜单列表 --> 
		<view class="flex" style="margin-top: 8px;"> 
			<view class="flex-sub">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-red"></text> 
						<text class="text-gray">其他设置</text>
					</view>
				</view>
				<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<view class="content">
							<text class="text-black">帮助与反馈</text>
						</view>
					</view>
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<view class="content">	
							<text class="text-black">隐私政策</text>
						</view>
					</view>
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<view class="content">
							<text class="text-black">关于我们</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				cuIconList: [{
					cuIcon: 'timefill',
					color: 'red',
					badge: 120,
					name: '历史记录'
				}, {
					cuIcon: 'likefill',
					color: 'orange',
					badge: 0,
					name: '收藏'
				}, {
					cuIcon: 'rechargefill',
					color: 'yellow',
					badge: 1,
					name: '我的钱包'
				}],
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: true,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}

	.user-image-wrapper {
		margin-top: -240px;
	}
</style>
