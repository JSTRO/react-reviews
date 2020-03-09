import React from "react"

function Stats({reviews}) {

  const numReviews = reviews.length
  const scores = reviews.map(review => review.score)
  const meanScore = reviews.length === 0 ? "N/A" : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10

	return (
		<div>	
			<p># of Reviews: {numReviews}</p>
    	<p>Mean Score: {meanScore}</p>
		</div>
	)
}	

export default Stats