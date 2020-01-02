import React from "react"

function Stats({filtered}) {

  const scores = filtered.map(review => review.score)

  const numReviews = filtered.length

  const meanScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10

	return (
		<div>	
			<p># of Reviews: {numReviews}</p>
    	<p>Mean Score: {meanScore}</p>
		</div>
	)
}	

export default Stats