import { createMqtt } from '@/plugins/mqtt-plugin'

const mqtt = createMqtt({
  address: import.meta.env.VITE_MQTT_ADDRESS,
  subscribe: {
    ctrl: (_topic, payload) => console.log('ctrl收到' + payload)
  }
})

export default mqtt
