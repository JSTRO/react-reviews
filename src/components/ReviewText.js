import React from 'react'
import {useParams} from 'react-router-dom'
import useReviewText from '../hooks/useReviewText.js'

const regex = /(^.*?[a-z]{2,}[.!?])\s+\W*[A-Z]/

function ReviewText() {

	const { reviewid } = useParams()
	const { reviews, loading } = useReviewText(reviewid)
	const currentReview = reviews[0]

	return (
		<div>
			<h1 className="page">{currentReview && currentReview.artist} - {currentReview && currentReview.title}</h1>
			<p className="review-text">{currentReview && currentReview.content}</p>
		</div>
	)
}

export default ReviewText