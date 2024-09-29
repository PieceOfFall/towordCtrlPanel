import useVideo from './video'
import useSeries from './series'

export default function useStore() {
  return {
    video: useVideo(),
    series: useSeries()
  }
}
