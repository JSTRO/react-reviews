import useAPI from './useAPI.js'

export default function useReviewText(reviewid) {
	return useAPI('/reviews/:reviewid', { reviewid: reviewid })
}