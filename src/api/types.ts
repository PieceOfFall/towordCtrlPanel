type Target = 'summary' | 'tech' | 'food'
type Operation = 'play' | 'pause' | 'loop' | 'mute'

interface State {
  target: Target
  isMute: boolean
  isLoop: boolean
}

export type { Target, Operation, State }
