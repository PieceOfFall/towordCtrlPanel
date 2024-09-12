import type { MqttClient } from 'mqtt'
import type { ObjectPlugin } from 'vue'

export interface MqttInterface extends ObjectPlugin {
  publish(topic: string, payload: object | string): MqttClient
  subscribe(topic: string | string[], qos?: 0 | 1 | 2, cb?: OnMessageStringCb): MqttClient
}

export interface MqttOptions {
  address: string
  subscribe?: Record<string, OnMessageStringCb>
}

export type OnMessageStringCb = (topic: string, payload: string) => void
