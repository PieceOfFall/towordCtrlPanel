import { createMqtt } from '@/plugins/mqtt-plugin'

const mqtt = createMqtt({
  address: import.meta.env.VITE_MQTT_ADDRESS
})

export default mqtt
