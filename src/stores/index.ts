import useVideo from './video'

export default function useStore() {
  return {
    video: useVideo()
  }
}
