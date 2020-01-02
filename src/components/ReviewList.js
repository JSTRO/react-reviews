import React from "react"
import Review from "./Review"

function ReviewList({filtered}) {

	const reviews = filtered.map(review => {
    return (
      <Review key={review.reviewid} data={review} />
    )
	})

	return (
		<ol>{reviews}</ol>
	)
}

export default ReviewList