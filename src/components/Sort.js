import React from "react"

function Sort({data, handleSort}) {

	const {artist, title, pub_year, score} = data

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