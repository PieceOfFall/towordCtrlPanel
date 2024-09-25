<script setup lang="ts">
import { ref } from 'vue'

interface ProductSeries {
  name: string
  bgUrl: string
}

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
</script>

<template>
  <div id="main-container">
    <div class="grid">
      <div class="summary">
        <div class="big-title">特华得概况</div>
        <img class="big-replay" src="/homepage/replayUnclick.png" />
      </div>
      <div class="tech">
        <div class="big-title">匠心独运工艺</div>
        <img class="big-replay" src="/homepage/replayUnclick.png" />
      </div>

      <div class="food">
        <div class="big-title">全球食品精选</div>
        <img class="big-replay" src="/homepage/replayUnclick.png" />
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

<style lang="scss">
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

    .big-replay {
      position: absolute;
      right: 35px;
      bottom: 35px;
      height: 70px;
    }

    .summary {
      position: relative;
      grid-area: summary;
      background-image: url('homepage/summary.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    .tech {
      position: relative;
      grid-area: tech;
      background-image: url('homepage/tech.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    .food {
      position: relative;
      grid-area: food;
      background-image: url('homepage/food.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    .base {
      grid-area: base;
      background-image: url('homepage/base.png');
      background-size: contain;
      background-repeat: no-repeat;
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
