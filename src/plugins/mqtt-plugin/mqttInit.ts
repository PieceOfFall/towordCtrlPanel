import type { MqttInterface, MqttOptions } from './types'
import type { MqttClient, ClientSubscribeCallback } from 'mqtt'
import mqtt from 'mqtt'
import type { App } from 'vue'

/**
 * MQTT实例
 */
export default class MQTT implements MqttInterface {
  readonly client: MqttClient
  readonly subscribeSet: Set<string> = new Set()

  constructor(options: MqttOptions) {
    this.client = mqtt.connect(options.address)
    if (options.subscribe) {
      for (const [topic, cb] of Object.entries(options.subscribe)) {
        this.subscribe(topic, cb)
      }
    }
  }

  /**
   * 发布消息
   * @param topic 主题
   * @param payload 内容
   * @returns MQTT客户端实例
   */
  public publish(topic: string, payload: string | object): MqttClient {
    payload = typeof payload === 'string' ? payload : JSON.stringify(payload)
    return this.client.publish(topic, payload)
  }

  /**
   * 订阅消息
   * @param topics 主题
   * @param cb 消息处理回调函数
   * @returns MQTT客户端实例
   */
  public subscribe(topics: string | string[], cb: ClientSubscribeCallback): MqttClient {
    if (typeof topics === 'string') this.subscribeSet.add(topics)
    else topics.forEach((topic) => this.subscribeSet.add(topic))
    return this.client.subscribe(topics, cb)
  }

  /**
   * vue插件入口函数
   * @param _app vue实例
   */
  public install(_app: App) {
    console.log('MQTT Loaded')
  }
}
