import type { MqttOptions } from './types'
import MQTT from './mqttInit'

export const createMqtt = (options: MqttOptions) => new MQTT(options)
