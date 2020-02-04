import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useAPI(url, params) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [reviews, setReviews] = useState([])
	const [hasMore, setHasMore] = useState(false)

	const baseURL = 'http://localhost:3000/api/reviews'

	useEffect(() => {
		setLoading(true)
		setError(false)
		let cancel
		axios({
			method: 'GET',
			url: `${baseURL}${url}`,
			params: params,
			cancelToken: new axios.CancelToken(c => cancel = c)
		})
		.then(res => {
			setReviews(prevReviews => {
				return [...new Set([...prevReviews, ...res.data.data])]
			})
			setHasMore(res.data.data.length > 0)	
			setLoading(false)
		})
		.catch(e => {
			if (axios.isCancel(e)) {
				return
			}
			setError(true)
		})
		return () => cancel()
	}, Object.values(params).concat(url))

	return {loading, error, hasMore, reviews, setReviews}
}