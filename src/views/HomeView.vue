<script setup lang="ts"></script>

<template>
  <div id="main-container">
    <div class="wrapper">
      <div class="summary">特华得概况</div>
      <div class="tech">匠心独运工艺</div>

      <div class="food">全球食品精选</div>
      <div class="base">全国基地</div>

      <div v-for="i in 6" :key="i" :class="`product${i}`">产品系列{{ i }}</div>
    </div>
  </div>
</template>

<style lang="scss">
#main-container {
  height: 100%;
  background-color: #ffffff;

  .wrapper {
    padding: 50px 400px;
    height: calc(100% - 100px);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 2fr 2fr 1fr;
    text-align: center;
    grid-template-areas:
      'summary   summary   summary   tech      tech      tech'
      'food      food      food      base      base      base'
      'product1  product2  product3  product4  product5  product6';
    gap: 10px;

    .summary {
      grid-area: summary;
      background-color: #a0a0a0;
    }

    .tech {
      grid-area: tech;
      background-color: #a0a0a0;
    }

    .food {
      grid-area: food;
      background-color: #c0c0c0;
    }

    .base {
      grid-area: base;
      background-color: #b0b0b0;
    }

    // 使用循环来生成 product1 到 product6 的样式
    @for $i from 1 through 6 {
      .product#{$i} {
        grid-area: product#{$i};
        background-color: #d0d0d0;
      }
    }
  }
}
</style>
