import useAPI from './useAPI.js'

export default function useReviewText(reviewid) {
  return useAPI('/api/reviews/:reviewid', { reviewid: reviewid })
}
