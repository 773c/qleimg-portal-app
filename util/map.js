import Vue from 'vue'

import 'ol/ol.css'
import Map from 'ol/Map'
// import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'
import XYZ from 'ol/source/XYZ'
import Draw from 'ol/interaction/Draw'
import Overlay from 'ol/Overlay'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style'
import {LineString, Polygon} from 'ol/geom'
import {OSM, Vector as VectorSource} from 'ol/source'
import {Tile as TileLayer,Vector as VectorLayer} from 'ol/layer'
import {getArea, getLength} from 'ol/sphere'
import {unByKey} from 'ol/Observable'

Vue.prototype.$map = Map
Vue.prototype.$view = View
Vue.prototype.$xyz = XYZ
Vue.prototype.$draw = Draw
Vue.prototype.$overlay = Overlay
Vue.prototype.$circlestyle = CircleStyle
Vue.prototype.$fill = Fill
Vue.prototype.$stroke = Stroke
Vue.prototype.$style = Style
Vue.prototype.$linestring = LineString
Vue.prototype.$polygon = Polygon
Vue.prototype.$osm = OSM
Vue.prototype.$tilelayer = TileLayer
Vue.prototype.$vectorsource = VectorSource
Vue.prototype.$vectorlayer = VectorLayer
Vue.prototype.$getarea = getArea
Vue.prototype.$getlength = getLength
Vue.prototype.$unbykey = unByKey