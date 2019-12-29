import React from "react"
import '../App.css'

function Review({data}) {
	const {artist, title, pub_year, url, score, review_img} = data
	return (
		<div className="review-item">
			<li>
				<img src={review_img} alt={review_img}></img>
				<strong>{artist}</strong> - <a href={url} target="blank">{title}</a> ({pub_year}), <strong>{score}</strong>
			</li>
		</div>
	)
}

export default Review