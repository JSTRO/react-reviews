import React, {useRef, useCallback} from "react"
import Review from "./Review"
import '../App.css'

function ReviewList({reviews, hasMore, loading, error, setCurrentPage, currentPage}) {

	const observer = useRef()
	const lastReviewRef = useCallback(node => {
		if (loading) {
			return
		}
		if (observer.current) {
			observer.current.disconnect()
		}
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				setCurrentPage(prevPage => prevPage + 1)
			}
		})
		if (node) {
			observer.current.observe(node)
		}
	}, [loading, hasMore, setCurrentPage])

	return (
   	<div className="review-list">
   		<div>{loading && 'Loading...'}</div>
   		<div>{error && 'Error'}</div>
	   	{reviews.map((review, index) => {
	   		return (
   				<div 
   					ref={reviews.length === index + 1 ? lastReviewRef : null}
   					key={review.reviewid} 
   					className="grid-container"
   				>
   					<Review review={review} />
   				</div>
   			)
	   	})}
		</div>
	)
}

export default ReviewList