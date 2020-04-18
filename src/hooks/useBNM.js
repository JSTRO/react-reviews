import useAPI from './useAPI.js'

export default function useBNM(pageNumber) {
  return useAPI('/api/best-new-music', { page: pageNumber })
}
