import React from "react"

function Search({search, handleChange}) {
	return (
		<input
	  type="text"
	  name="search"
	  value={search}
	  onChange={handleChange}
	  placeholder="Search..."
		/>
	)
}	

export default Search