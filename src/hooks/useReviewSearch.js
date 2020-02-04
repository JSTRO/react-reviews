import {useEffect} from 'react'
import useAPI from './useAPI.js'

export default function useReviewSearch(query, pageNumber) {
	const {loading, error, hasMore, reviews, setReviews}
		= useAPI('', { query: query, page: pageNumber, limit: 48 })

	useEffect(() => {
		setReviews([])
	}, [query])

	return {loading, error, hasMore, reviews, setReviews}
}