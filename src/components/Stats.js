import React from "react"

function Stats({filtered}) {

	const numReviews = filtered.length
  const scores = filtered.map(review => review.score)
  const meanScore = filtered.length === 0 ? "N/A" : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10

	return (
		<div>	
			<p># of Reviews: {numReviews}</p>
    	<p>Mean Score: {meanScore}</p>
		</div>
	)
}	

export default Stats