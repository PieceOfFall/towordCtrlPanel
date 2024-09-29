import { defineStore } from 'pinia'

export default defineStore<
  string,
  Record<
    string,
    {
      isPlay: boolean
      isMute: boolean
      isLoop: boolean
    }
  >
>('series', {
  state: () => {
    return {
      product1: {
        isPlay: false,
        isMute: true,
        isLoop: true
      },
      product2: {
        isPlay: false,
        isMute: true,
        isLoop: true
      },
      product3: {
        isPlay: false,
        isMute: true,
        isLoop: true
      },
      product4: {
        isPlay: false,
        isMute: true,
        isLoop: true
      },
      product5: {
        isPlay: false,
        isMute: true,
        isLoop: true
      },
      product6: {
        isPlay: false,
        isMute: true,
        isLoop: true
      }
    }
  }
})
