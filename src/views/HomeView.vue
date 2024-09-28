<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ctrlVideo } from '@/api'
import type { Target, State } from '@/api/types'
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
const store = storeToRefs(videoStore)

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

function reRender() {
  for (const item in menu) {
    if (Object.prototype.hasOwnProperty.call(menu, item)) {
      const targetItem = item as Target
      menu[targetItem].audioSrc = store[targetItem].value.isMute ? muteUrl : unmuteUrl
      menu[targetItem].loopSrc = store[targetItem].value.isLoop ? loopUrl : unloopUrl
    }
  }
}

mqtt.subscribe('state', 0, (_topic, payload) => {
  const state = JSON.parse(payload) as State

  // 更新pinia
  Object.assign(store[state.target].value, state)

  // 调整渲染
  reRender()
})

// 启动时获取一次所有视频的播放状态
onMounted(() => {
  mqtt.publish('getState', '')
})

const changeSrc = (target: keyof Menu, srcTarget: keyof Video, newSrc: string) =>
  (menu[target][srcTarget] = newSrc)
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
          <img
            class="big-play"
            @touchstart="changeSrc('tech', 'playSrc', '/public/homepage/pause.png')"
            @touchend="changeSrc('tech', 'playSrc', '/public/homepage/play.png')"
            :src="menu.tech.playSrc"
          />
          <img
            class="big-mute"
            @touchstart="changeSrc('tech', 'audioSrc', '/public/homepage/mute.png')"
            @touchend="changeSrc('tech', 'audioSrc', '/public/homepage/unmute.png')"
            :src="menu.tech.audioSrc"
          />
          <img
            class="big-replay"
            @touchstart="changeSrc('tech', 'loopSrc', '/public/homepage/replayClick.png')"
            @touchend="changeSrc('tech', 'loopSrc', '/public/homepage/replayUnclick.png')"
            :src="menu.tech.loopSrc"
          />
        </div>
      </div>

      <div class="food">
        <div class="big-title">全球食品精选</div>
        <div class="operation-box">
          <img
            class="big-play"
            @touchstart="changeSrc('food', 'playSrc', '/homepage/pause.png')"
            @touchend="changeSrc('food', 'playSrc', '/homepage/play.png')"
            :src="menu.food.playSrc"
          />
          <img
            class="big-mute"
            @touchstart="changeSrc('food', 'audioSrc', '/homepage/mute.png')"
            @touchend="changeSrc('food', 'audioSrc', '/homepage/unmute.png')"
            :src="menu.food.audioSrc"
          />
          <img
            class="big-replay"
            @touchstart="changeSrc('food', 'loopSrc', '/homepage/replayClick.png')"
            @touchend="changeSrc('food', 'loopSrc', '/homepage/replayUnclick.png')"
            :src="menu.food.loopSrc"
          />
        </div>
      </div>

      <div class="base">
        <div class="big-title">全国基地</div>
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

        <img class="replay" src="/homepage/replayUnclick.png" />

        <img class="click" src="/homepage/hintUnclick.png" />
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
        transform: scale(1.2);
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
      grid-area: base;
      background-image: url('homepage/base.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #d0d0d0;
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

        .replay {
          height: 70px;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .click {
          height: 70px;
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
