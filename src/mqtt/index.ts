import { createMqtt } from '@/plugins/mqtt-plugin'

export default createMqtt({
  address: import.meta.env.VITE_MQTT_ADDRESS,
  subscribe: {
    ctrl: (_topic, payload) => {
      console.log('ctrl收到' + payload)
    },
    '123': () => {
      console.log('123收到')
    }
  }
})
