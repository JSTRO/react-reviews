import useAPI from './useAPI.js'

export default function useBNM(pageNumber) {
	return useAPI('/best-new-music', { page: pageNumber, limit: 48 })
}