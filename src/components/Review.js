import React from "react"

function Review({data}) {
	const {artist, title, pub_year, url, score} = data
	return (
		<>
			<li>
				<strong>{artist}</strong> - <a href={url}>{title}</a> ({score}), {pub_year}
			</li>
		</>
	)
}

export default Review