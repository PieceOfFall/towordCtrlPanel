<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ctrlVideo, ctrlSeries, ctrlMonitor } from '@/api'
import type { Target, State, SeriesState } from '@/api/types'
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import mqtt from '@/mqtt'

interface ProductSeries {
  name: string
  bgUrl: string
}

interface Video {
  playSrc: string
  pauseSrc: string
  audioSrc: string
  loopSrc: string
}
type Menu = Record<Target, Video>

const productSeries = ref<ProductSeries[]>([
  {
    name: '产品系列1',
    bgUrl: 'homepage/product1.png'
  },
  {
    name: '产品系列2',
    bgUrl: 'homepage/product2.png'
  },
  {
    name: '产品系列3',
    bgUrl: 'homepage/product3.png'
  },
  {
    name: '产品系列4',
    bgUrl: 'homepage/product4.png'
  },
  {
    name: '产品系列5',
    bgUrl: 'homepage/product5.png'
  },
  {
    name: '产品系列6',
    bgUrl: 'homepage/product6.png'
  }
])

// Pinia
const videoStore = useStore().video
const seriesStore = useStore().series
const storeVideo = storeToRefs(videoStore)
const storeSeries = storeToRefs(seriesStore)

/** 三个视频UI */
const playUrl = '/homepage/play.png'
const pauseUrl = '/homepage/pause.png'
const muteUrl = '/homepage/mute.png'
const unmuteUrl = '/homepage/unmute.png'
const unloopUrl = '/homepage/replayUnclick.png'
const loopUrl = '/homepage/replayClick.png'

const menu = reactive<Menu>({
  summary: {
    playSrc: playUrl,
    pauseSrc: pauseUrl,
    audioSrc: unmuteUrl,
    loopSrc: unloopUrl
  },
  tech: {
    playSrc: playUrl,
    pauseSrc: pauseUrl,
    audioSrc: unmuteUrl,
    loopSrc: unloopUrl
  },
  food: {
    playSrc: playUrl,
    pauseSrc: pauseUrl,
    audioSrc: unmuteUrl,
    loopSrc: unloopUrl
  }
})

function reRenderVideo() {
  for (const item in menu) {
    if (Object.prototype.hasOwnProperty.call(menu, item)) {
      const targetItem = item as Target
      menu[targetItem].audioSrc = storeVideo[targetItem].value.isMute ? muteUrl : unmuteUrl
      menu[targetItem].loopSrc = storeVideo[targetItem].value.isLoop ? loopUrl : unloopUrl
    }
  }
}

// 启动时获取一次所有视频的播放状态
onMounted(() => mqtt.publish('getVideoState', ''))

mqtt.subscribe('state', 0, (_topic, payload) => {
  const state = JSON.parse(payload) as State

  // 更新pinia
  Object.assign(storeVideo[state.target].value, state)

  // 调整渲染
  reRenderVideo()
})

/** 监控UI */

/** 产品系列UI */
// 启动时获取一次所有系列产品播放器的播放状态
onMounted(() => mqtt.publish('getSeriesState', ''))

interface ViewSeriesState {
  play: string
  mute: string
  loop: string
}

const seriesSrcs = reactive<Record<string, ViewSeriesState>>({
  product1: {
    play: pauseUrl,
    mute: muteUrl,
    loop: loopUrl
  },
  product2: {
    play: pauseUrl,
    mute: muteUrl,
    loop: loopUrl
  },
  product3: {
    play: pauseUrl,
    mute: muteUrl,
    loop: loopUrl
  },
  product4: {
    play: pauseUrl,
    mute: muteUrl,
    loop: loopUrl
  },
  product5: {
    play: pauseUrl,
    mute: muteUrl,
    loop: loopUrl
  },
  product6: {
    play: pauseUrl,
    mute: muteUrl,
    loop: loopUrl
  }
})

mqtt.subscribe('seriesState', 0, (_topic, payload) => {
  const seriesStates = JSON.parse(payload) as SeriesState[]

  // 更新pinia
  seriesStates.forEach((item, index) => {
    Object.assign(storeSeries[`product${index + 1}`].value, item)
  })

  // 更新渲染
  reRenderSeries()
})

function reRenderSeries() {
  for (const item in seriesSrcs) {
    if (Object.prototype.hasOwnProperty.call(seriesSrcs, item)) {
      seriesSrcs[item].play = storeSeries[item].value.isPlay ? playUrl : pauseUrl
      seriesSrcs[item].mute = storeSeries[item].value.isMute ? muteUrl : unmuteUrl
      seriesSrcs[item].loop = storeSeries[item].value.isLoop ? loopUrl : unloopUrl
    }
  }
}
</script>

<template>
  <div id="main-container">
    <div class="grid">
      <div class="summary">
        <div class="big-title">特华得概况</div>
        <div class="operation-box">
          <img
            class="big-play"
            @touchstart="ctrlVideo('summary', 'play')"
            :src="menu.summary.playSrc"
          />
          <img
            class="big-pause"
            @touchstart="ctrlVideo('summary', 'pause')"
            :src="menu.summary.pauseSrc"
          />
          <img
            class="big-mute"
            @touchstart="ctrlVideo('summary', 'mute')"
            :src="menu.summary.audioSrc"
          />
          <img
            class="big-replay"
            :src="menu.summary.loopSrc"
            @touchstart="ctrlVideo('summary', 'loop')"
          />
        </div>
      </div>

      <div class="tech">
        <div class="big-title">匠心独运工艺</div>
        <div class="operation-box">
          <img class="big-play" @touchstart="ctrlVideo('tech', 'play')" :src="menu.tech.playSrc" />
          <img
            class="big-pause"
            @touchstart="ctrlVideo('tech', 'pause')"
            :src="menu.tech.pauseSrc"
          />
          <img class="big-mute" @touchstart="ctrlVideo('tech', 'mute')" :src="menu.tech.audioSrc" />
          <img
            class="big-replay"
            :src="menu.tech.loopSrc"
            @touchstart="ctrlVideo('tech', 'loop')"
          />
        </div>
      </div>

      <div class="food">
        <div class="big-title">全球食品精选</div>
        <div class="operation-box">
          <img class="big-play" @touchstart="ctrlVideo('food', 'play')" :src="menu.food.playSrc" />
          <img
            class="big-pause"
            @touchstart="ctrlVideo('food', 'pause')"
            :src="menu.food.pauseSrc"
          />
          <img class="big-mute" @touchstart="ctrlVideo('food', 'mute')" :src="menu.food.audioSrc" />
          <img
            class="big-replay"
            :src="menu.food.loopSrc"
            @touchstart="ctrlVideo('food', 'loop')"
          />
        </div>
      </div>

      <div class="base">
        <div class="big-title">全国基地</div>
        <div id="monitor-ctrl">
          <el-button type="primary" @touchstart="ctrlMonitor('JiangSu')"> 江苏总部基地 </el-button>
          <el-button type="primary" @touchstart="ctrlMonitor('HeiLongJiang')">
            黑龙江生产基地</el-button
          >
        </div>
      </div>

      <div
        v-for="(item, index) in productSeries"
        :key="index"
        :class="`product${index + 1}`"
        :style="`background-image:url('${item.bgUrl}');`"
      >
        <div class="small-title">
          {{ item.name }}
        </div>

        <div class="series-box">
          <img
            class="series-operation"
            :src="seriesSrcs[`product${index + 1}`].play"
            @touchstart="
              ctrlSeries(index, storeSeries[`product${index + 1}`].value.isPlay ? 'pause' : 'play')
            "
          />
          <img
            class="series-operation"
            :src="seriesSrcs[`product${index + 1}`].mute"
            @touchstart="ctrlSeries(index, 'mute')"
          />
          <img
            class="series-operation"
            :src="seriesSrcs[`product${index + 1}`].loop"
            @touchstart="ctrlSeries(index, 'loop')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#main-container {
  height: 100%;
  background-color: #ffffff;
  overflow: hidden;

  .grid {
    margin-top: 100px;
    padding: 50px 200px;
    height: calc(100% - 300px);
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 480px 480px 280px;
    text-align: center;
    color: #fcfeff;
    letter-spacing: 3px;
    font-weight: bold;
    grid-template-areas:
      'summary   summary   summary   tech      tech      tech'
      'food      food      food      base      base      base'
      'product1  product2  product3  product4  product5  product6';
    gap: 20px;

    .big-title {
      text-align: initial;
      position: relative;
      top: 50px;
      left: 50px;
      line-height: 21px;
    }

    .operation-box {
      position: absolute;
      bottom: 0;
      right: 10px;
      height: 80px;
      width: 360px;
      text-align: initial;
      padding: 20px 0;
      display: flex;
      justify-content: space-around;

      .big-play {
        height: 70px;
        transform: scale(1.2);
      }

      .big-pause {
        height: 70px;
        transform: scale(1.01);
      }

      .big-mute {
        height: 70px;
      }

      .big-replay {
        height: 70px;
      }
    }

    .summary {
      position: relative;
      grid-area: summary;
      background-image: url('homepage/summary.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #d0d0d0;
    }

    .tech {
      position: relative;
      grid-area: tech;
      background-image: url('homepage/tech.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #d0d0d0;
    }

    .food {
      position: relative;
      grid-area: food;
      background-image: url('homepage/food.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #d0d0d0;
    }

    .base {
      position: relative;
      grid-area: base;
      background-image: url('homepage/base.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #d0d0d0;

      #monitor-ctrl {
        height: calc(100% - 21px);
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .el-button {
          width: 500px;
          height: 100px;
          margin: auto;

          font-size: 20px;
          letter-spacing: 2px;
        }
      }
    }

    // 使用循环来生成 product1 到 product6 的样式
    @for $i from 1 through 6 {
      .product#{$i} {
        position: relative;
        background-size: contain;
        background-repeat: no-repeat;
        grid-area: product#{$i};
        background-color: #d0d0d0;

        .small-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 30px;
        }

        .series-box {
          position: absolute;
          bottom: 15px;
          width: 100%;
          display: flex;
          justify-content: space-around;

          .series-operation {
            height: 60px;
          }
        }
      }
    }
  }
}
</style>
