import mqtt from '@/mqtt'
import type { Target, Operation } from './types'

function ctrlVideo(target: Target, operation: Operation) {
  mqtt.publish(target, operation)
}

function ctrlSeries(targetIndex: number, operation: Operation) {
  mqtt.publish('series', `${targetIndex}:${operation}`)
}

function ctrlMonitor(targetName: 'JiangSu' | 'HeiLongJiang') {
  mqtt.publish('monitor', targetName)
}

export { ctrlVideo, ctrlSeries, ctrlMonitor }
