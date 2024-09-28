<script lang="ts"></script>

<template>
  <div id="main-container">
    <div id="title">产品系列</div>

    <div id="content">
      <div id="photo">
        <img src="/homepage/product1.png" alt="" />
      </div>
      <div id="menu">
        <div id="product-name">代用名</div>
        <div id="list">
          <div v-for="i in 20" :key="i">更新中</div>
        </div>
      </div>
    </div>

    <div id="go-back">
      <img src="/backUnclick.png" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#main-container {
  position: relative;
  height: 100%;
  overflow: hidden;

  #title {
    margin-top: 100px;
    margin-left: 100px;
    font-size: 40px;
    font-weight: bold;
    line-height: 52px;
  }

  #content {
    padding: 200px 100px;
    height: calc(100% - 852px);
    display: flex;
    justify-content: space-between;

    #photo {
      width: 900px;
      height: 900px;
      background-color: green;

      img {
        height: 100%;
      }
    }

    #menu {
      width: 900px;
      height: 900px;

      #product-name {
        font-size: 50px;
        font-weight: bold;
        line-height: 66px;
        padding-bottom: 100px;
      }

      #list {
        height: calc(100% - 166px);
        padding-right: 200px;

        display: flex;
        flex-wrap: wrap;

        div {
          width: calc(50% - 10px);
          font-size: 30px;
          font-weight: bold;
          height: calc(10% - 5px);
        }
      }
    }
  }

  #go-back {
    position: relative;
    height: 300px;

    img {
      position: absolute;
      height: 70px;
      right: 100px;
      bottom: 100px;
    }
  }
}
</style>
