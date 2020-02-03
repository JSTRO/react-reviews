import React from "react"

function Sort({reviews, handleSort}) {

	const {artist, title, pub_year, score} = reviews

	return (
		<select
  		name="sortValue"
  		onChange={handleSort}
  	>
  		<option>Sort by...</option>
  		<option value={artist}>artist</option>
  		<option value={title}>title</option>
  		<option value={pub_year}>pub_year</option>
  		<option value={score}>score</option>
  	</select>
	)
}

export default Sort