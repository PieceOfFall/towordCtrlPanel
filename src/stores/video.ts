import { defineStore } from 'pinia'

export default defineStore('video', {
  state: () => {
    return {
      summary: {
        isMute: false,
        isLoop: true
      },
      tech: {
        isMute: false,
        isLoop: true
      },
      food: {
        isMute: false,
        isLoop: true
      }
    }
  }
})
