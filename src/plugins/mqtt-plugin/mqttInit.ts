import type { MqttInterface, MqttOptions, OnMessageStringCb } from './types'
import type { MqttClient } from 'mqtt'
import mqtt from 'mqtt'
import type { App } from 'vue'

/**
 * MQTT实例
 */
export default class MQTT implements MqttInterface {
  public readonly client: MqttClient

  /**
   * 订阅的主题和对应的消息处理回调
   */
  private readonly subscribeCbRecord: Record<string, OnMessageStringCb>

  /**
   * 订阅的所有主题
   */
  public get subscribeList() {
    return Object.keys(this.subscribeCbRecord)
  }

  constructor(options: MqttOptions) {
    this.client = mqtt.connect(options.address)
    this.subscribeCbRecord = options.subscribe || {}

    if (options.subscribe) {
      Object.keys(options.subscribe).forEach((topic) => this.subscribe(topic))

      this.client.on('message', (topic, payloadBuffer) => {
        const cb = this.subscribeCbRecord![topic]
        cb(topic, payloadBuffer.toString('utf-8'))
      })
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
   * @param qos 消息质量
   * @param cb 消息处理回调函数
   * @returns MQTT客户端实例
   */
  public subscribe(
    topics: string | string[],
    qos: 0 | 1 | 2 = 2,
    cb?: OnMessageStringCb
  ): MqttClient {
    if (cb) {
      if (typeof topics === 'string') {
        this.subscribeCbRecord[topics] = cb
      } else {
        topics.forEach((topic) => (this.subscribeCbRecord[topic] = cb))
      }
    }
    return this.client.subscribe(topics, { qos })
  }

  /**
   * vue插件入口函数
   * @param _app vue实例
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public install(_app: App) {
    console.log('MQTT Loaded')
  }
}
