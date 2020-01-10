import React from "react"
import '../App.css'

function Review({data}) {
	const {artist, title, pub_year, url, score, review_img} = data
	return (
		<div>
			<img src={review_img} alt={review_img}></img>
			<p>
				<strong>{artist}</strong> - <a href={url} target="blank">{title}</a> ({pub_year}), <strong>{score}</strong>
			</p>
		</div>
	)
}

export default Review