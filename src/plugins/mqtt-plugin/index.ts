import type { MqttOptions } from './types'
import MQTT from './mqttInit'

const createMqtt = (options: MqttOptions) => new MQTT(options)

export { createMqtt }
