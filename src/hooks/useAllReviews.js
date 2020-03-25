import useAPI from './useAPI.js'

export default function useAllReviews(pageNumber) {
	return useAPI('/api/all-reviews', { page: pageNumber })
}