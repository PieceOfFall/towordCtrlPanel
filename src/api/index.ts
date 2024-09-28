import mqtt from '@/mqtt'
import type { Target, Operation } from './types'

function ctrlVideo(target: Target, operation: Operation) {
  mqtt.publish(target, operation)
}

export { ctrlVideo }
