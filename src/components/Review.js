import React, { useState } from "react"
import '../App.css'

function Review({review}) {

	const {artist, title, pub_year, url, review_img, genre} = review

	const [error, setError] = useState(false)

	const onImageError = () =>{
		setError(true)
	}

	let src = error ? 'https://via.placeholder.com/150' : review_img

	return (
		<div className="grid-item">
			<a href={url} target="blank">
				<img src={src} alt={review_img} onError={onImageError}></img>
				<p><strong>{artist}</strong></p>
				<p><i>{title}</i></p>
			</a>
			<p>{genre}</p>
			<p>{pub_year}</p>
		</div>
	)
}

export default Review