import {useEffect} from 'react'
import useAPI from './useAPI.js'

export default function useSearch(query, pageNumber) {

	const result = useAPI('/search', { query: query, page: pageNumber })

	useEffect(() => {
		result.setReviews([])
	}, [query])

	return result
}