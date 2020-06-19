import useAPI from './useAPI.js'

export default function useAllReviews(genres, pageNumber) {
	return useAPI('/api/all-reviews', { genres: genres, page: pageNumber })
}
