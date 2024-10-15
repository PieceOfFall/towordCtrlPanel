type Target = 'summary' | 'tech' | 'food'
type Operation = 'play' | 'pause' | 'loop' | 'mute' | 'last' | 'next' | 'head'

interface State {
  target: Target
  isMute: boolean
  isLoop: boolean
}

interface SeriesState {
  id: number
  isPlay: boolean
  isLoop: boolean
  isMute: boolean
}

export type { Target, Operation, State, SeriesState }
