import React, {useState, useEffect} from 'react'
import TextTruncate from 'react-text-truncate'
import {useParams} from 'react-router-dom'
import useReviewText from '../hooks/useReviewText.js'
import formatDate from '../utils/formatDate.js'
import { startCase, toLower, toUpper } from 'lodash'
import '../App.css'

function ReviewText() {

	const { reviewid } = useParams()
	const { reviews, loading } = useReviewText(reviewid)

	const [review, setReview] = useState({})

	useEffect(() => {
		setReview(reviews[0])
	}, [reviews])

	if (review) {
		const {
			artist, 
			title, 
			content, 
			review_img, 
			score, 
			label,
			pub_date, 
			pub_year, 
			author, 
			author_type, 
			genre
		} = review

		return (
			<div className="review-text-container">
				<div className="review-text-panel">
					<div className="review-text-artist">
						<h2>{startCase(toLower(artist))}</h2>
						<h1 className="review-text-title">{startCase(toLower(title))}</h1>
					</div>
					<div className="review-text-image">	
						<img src={review_img} className="review-text-image-cover"></img>
						<h6>{toUpper(label)}</h6>
						<h6>{pub_year}</h6>
					</div>	
					<div className="review-text-score">	
						<h1>{score}</h1>
					</div>
				</div>		
				<div className="review-text-body">
					<div>
						<h5>{startCase(toLower(author))}</h5>
						<h5>{startCase(toLower(author_type))}</h5>
						<h5>{toUpper(genre)}</h5>
						<h5>{formatDate(pub_date)}</h5>
					</div>
					<TextTruncate
				    line={6}
				    truncateText="…"
				    text={content}
					/>
				</div>	
			</div>
		)
	} else {
		return <></>
	}
}

export default ReviewText