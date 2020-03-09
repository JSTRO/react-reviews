import {useState, useEffect} from 'react'
import axios from 'axios'
import { uniqBy } from 'lodash'

export default function useAPI(url, params) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [reviews, setReviews] = useState([])
	const [hasMore, setHasMore] = useState(false)
	
	const baseURL = 'http://localhost:3000/api'

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
				return uniqBy([...prevReviews, ...res.data.data], 'reviewid')
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
	}, [...Object.values(params), url])

	return {loading, error, hasMore, reviews, setReviews}
}