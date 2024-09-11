import type { ClientSubscribeCallback, MqttClient } from 'mqtt'
import type { App } from 'vue'

export interface MqttInterface {
  publish(topic: string, payload: object | string): MqttClient
  subscribe(topic: string | string[], cb: ClientSubscribeCallback): MqttClient
  install(app: App): void
}

export interface MqttOptions {
  address: string
  subscribe?: Record<string, ClientSubscribeCallback>
}
