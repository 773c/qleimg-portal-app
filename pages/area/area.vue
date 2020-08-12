<template>
	<view>
		<cu-custom bgColor="bg-purple" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"><text>面积计算</text></block>
		</cu-custom>
		<view class="flex margin-top">
			<view class="flex-sub">
				<button class="cu-btn round margin-left lines-purple" @tap="clickAreaMarkHandler">点击测量</button>
				<button class="cu-btn round margin-left lines-red" @tap="clearAllHandler">清除所有</button>
			</view>
		</view>
		<view class="flex margin-top">
			<view class="flex-sub">
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles text-red"></text>
						<text class="text-lg text-purple text-bold">卫星影像处理</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub">
				<div id="map" class="map"></div>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				map: null,
				measureOption: {
					//空间测量
					layer: null,
					sketch: null,
					helpTooltipElement: null,
					helpTooltip: null,
					measureTooltipElement: null,
					measureTooltip: null,
					helpMsg: "点击开始绘图",
					draw: null,
					listener: null,
					popupcloser: null
				},
				inputValue: ""
			}
		},
		computed: {},
		methods: {
			//初始化
			initMap() {
				this.map = new this.$map({
					target: 'map',
					layers: [
						new this.$tilelayer({
							source: new this.$xyz({
								url: './static/resource/wx/{z}/{x}/{y}.png'
							})
						})
						// raster
					],
					view: new this.$view({
						center: [113.36483, 22.98247],
						zoom: 17,
						maxZoom: 19,
						projection: 'EPSG:4326'
					}),
				})
			},
			// 添加测量面积标注
			createMeasureTooltip() {
				if (this.measureOption.measureTooltipElement) {
					this.measureOption.measureTooltipElement.parentNode.removeChild(
						this.measureOption.measureTooltipElement
					)
				}
				this.measureOption.measureTooltipElement = document.createElement(
					"div"
				);
				this.measureOption.measureTooltipElement.className =
					"ol-tooltip ol-tooltip-measure"
				this.measureOption.measureTooltip = new this.$overlay({
					id: "空间测量",
					element: this.measureOption.measureTooltipElement,
					offset: [0, 5],
					positioning: "bottom-center"
				})
				this.map.addOverlay(this.measureOption.measureTooltip)
			},
			//添加测量标注
			createHelpTooltip() {
				if (this.measureOption.helpTooltipElement) {
					this.measureOption.helpTooltipElement.parentNode.removeChild(
						this.measureOption.helpTooltipElement
					)
				}
				this.measureOption.helpTooltipElement = document.createElement(
					"div"
				)
				this.measureOption.helpTooltipElement.className = "ol-tooltip hidden"
				this.measureOption.helpTooltip = new this.$overlay({
					id: "空间测量",
					element: this.measureOption.helpTooltipElement,
					offset: [15, 0],
					positioning: "center-left"
				})
				this.map.addOverlay(this.measureOption.helpTooltip)
			},
			//设置hover提示信息
			pointerMoveHandler(evt) {
				if (evt.dragging) {
					return
				}
				this.measureOption.helpTooltipElement.innerHTML = this.measureOption.helpMsg
				this.measureOption.helpTooltip.setPosition(evt.coordinate)
				this.measureOption.helpTooltipElement.classList.remove("hidden")
			},
			//格式化面积
			formatArea(polygon) {
				let sourceProj = this.map.getView().getProjection(); // 获取投影坐标系
				let area = this.$getarea(polygon, {
					projection: sourceProj
				});
				let output;
				if (area > 10000) {
					output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
				} else {
					output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
				}
				return output;
			},
			//设置绘制时样式
			setDraw(source) {
				let type = 'Polygon';
				this.measureOption.draw = new this.$draw({
					source: source,
					type: type,
					style: new this.$style({
						fill: new this.$fill({
							color: 'rgba(255, 255, 255, 0.2)',
						}),
						stroke: new this.$stroke({
							color: 'rgb(255, 255, 255)',
							lineDash: [10, 10],
							width: 2,
						}),
						image: new this.$circlestyle({
							radius: 5,
							stroke: new this.$stroke({
								color: 'rgba(255, 255, 2, 0.7)',
							}),
							fill: new this.$fill({
								color: 'rgb(200, 10, 10)',
							})
						})
					})
				});
			},
			//删除测量标注
			delMark(measureLayer) {
				this.measureOption.popupcloser = document.createElement("a")
				this.measureOption.popupcloser.innerHTML =
					'<span style="color:red;font-size:13px;margin-left:6px">X</span>'
				this.measureOption.popupcloser.href = "javascript:void(0);"
				this.measureOption.popupcloser.classList.add("ol-popup-closer")
				this.measureOption.popupcloser.onclick = e => {
					let parentNode = e.target.parentNode.parentNode.parentNode
					parentNode.remove()
					measureLayer.getSource().clear()
				}
			},
			//画面积
			addInteractionHandler() {
				this.map.removeInteraction(this.measureOption.draw); // 防止多次点击添加多个图层
				//设置绘制样式
				let source = new this.$vectorsource()
				this.setDraw(source)
				this.map.addInteraction(this.measureOption.draw)
				//创建提示
				this.createMeasureTooltip()
				this.createHelpTooltip()
				// 将画好的 VectorLayer 图层添加到 map 中
				let vector = new this.$vectorlayer({
					source: source,
					style: new this.$style({
						fill: new this.$fill({
							color: 'rgba(255, 255, 255, 0.2)',
						}),
						stroke: new this.$stroke({
							color: '#ffcc33',
							width: 2,
						}),
						image: new this.$circlestyle({
							radius: 7,
							fill: new this.$fill({
								color: '#ffcc33',
							}),
						})
					}),
					name: "空间测量默认"
				});
				let measureLayer = new this.$vectorlayer({
					source: source,
					style: new this.$style({
						fill: new this.$fill({
							color: "rgba(255,255,255,0.2)"
						}),
						stroke: new this.$stroke({
							color: "red",
							lineDash: [10, 10],
							width: 2
						}),
						image: new this.$circlestyle({
							radius: 5,
							stroke: new this.$stroke({
								color: "yellow"
							}),
							fill: new this.$fill({
								color: "red"
							})
						})
					}),
					zIndex: 9,
					name: "空间测量"
				});
				this.map.addLayer(vector)
				this.map.addLayer(measureLayer)
				//删除测量标注
				this.delMark(measureLayer)
				//开始绘画
				this.measureOption.draw.on('drawstart', evt => {
					this.measureOption.sketch = evt.feature
					let tooltipCoord = evt.coordinate
					this.measureOption.listener = this.measureOption.sketch.getGeometry().on('change', evt => {
						let geom = evt.target
						let output
						if (geom instanceof this.$polygon) {
							output = this.formatArea(geom)
							tooltipCoord = geom.getInteriorPoint().getCoordinates()
						} else if (geom instanceof this.$linestring) {
							output = formatLength(geom)
							tooltipCoord = geom.getLastCoordinate()
						}
						this.measureOption.measureTooltipElement.innerHTML = output
						this.measureOption.measureTooltip.setPosition(tooltipCoord)
					})
				});
				//绘画结束
				this.measureOption.draw.on('drawend', () => {
					console.log("绘画结束")
					// this.measureOption.helpTooltipElement.classList.add("hidden")
					this.measureOption.measureTooltipElement.appendChild(
						this.measureOption.popupcloser
					)
					this.measureOption.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static'
					this.measureOption.measureTooltip.setOffset([0, 5])
					this.measureOption.sketch = null
					this.measureOption.measureTooltipElement = null
					this.measureOption.helpTooltipElement.innerHTML = null
					this.$unbykey(this.measureOption.listener)	
					this.map.un("pointermove", this.pointerMoveHandler)
					this.map.removeInteraction(this.measureOption.draw)
				});
			},
			//点击开始面积测量
			clickAreaMarkHandler() {
				this.map.on('pointermove', this.pointerMoveHandler)
				this.map.getViewport().addEventListener('mouseout', () => {
					this.measureOption.helpTooltipElement.classList.add("hidden")
				})
				this.addInteractionHandler()
			},
			// 获取所有图层
			getAllLayers() {
				return this.map.getLayers().getArray()
			},
			//根据图层名获取图层
			getLayerByName(name) {
				let layers = this.getAllLayers()
				let layer = layers.filter(item => {
					return item.get("name") === name
				})
				return layer
			},
			// 根据图层名移除图层
			removeLayerByName(name) {
				let layer = this.getLayerByName(name)
				layer.forEach(item => {
					this.map.removeLayer(item)
				})
			},
			// 获取所有覆盖图层
			getAllOverlay() {
				return this.map.getOverlays().getArray()
			},
			// 清除所有覆盖图层
			removeAllOverlay() {
				let layers = this.getAllOverlay()
				console.log(layers)
				layers.forEach(item => {
					this.map.removeOverlay(item)
				})
			},
			//清除所有
			clearAllHandler() {
				this.removeLayerByName("空间测量")
				this.removeLayerByName("空间测量默认")
				this.removeAllOverlay()
				this.measureOption.measureTooltipElement.innerHTML = null
			},
		},
		mounted() {
			// 初始化map
			this.initMap()
		}
	}
</script>

<style>
	.tooltip {
		position: relative;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 4px;
		color: white;
		padding: 4px 8px;
		opacity: 0.7;
		white-space: nowrap;
	}

	.tooltip-measure {
		opacity: 1;
		font-weight: bold;
	}

	.tooltip-static {
		background-color: #ffcc33;
		color: black;
		border: 1px solid white;
	}

	.tooltip-measure:before,
	.tooltip-static:before {
		border-top: 6px solid rgba(0, 0, 0, 0.5);
		border-right: 6px solid transparent;
		border-left: 6px solid transparent;
		content: "";
		position: absolute;
		bottom: -6px;
		margin-left: -7px;
		left: 50%;
	}

	.tooltip-static:before {
		border-top-color: #ffcc33;
	}
</style>
