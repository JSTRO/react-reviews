import React from "react"

function Search({search, handleChange, handleSort, data}) {
	const {artist, title, pub_year, score} = data 

	return (
		<form>
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="Search..."
    	/>
    	<select
    		name="sort"
    		onChange={handleSort}
    	>
    		<option value="">Please choose an option...</option>
    		<option value={artist}>Artist</option>
    		<option value={title}>Title</option>
    		<option value={pub_year}>Year</option>
    		<option value={score}>Score</option>
    	</select>
	  </form>
	)
}

export default Search