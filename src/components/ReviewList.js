import React from "react"
import Review from "./Review"
import '../App.css'

function ReviewList({filtered}) {

	const reviews = filtered.map(review => {
    return (
      <Review key={review.reviewid} data={review} />
    )
	})

	return (
		<div className="grid-container">
			{reviews}
		</div>	
	)
}

export default ReviewList