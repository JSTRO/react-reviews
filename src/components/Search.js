import React from "react"

function Search({search, handleSearch}) {
	return (
		<input
	  type="text"
	  name="search"
	  value={search}
	  onChange={handleSearch}
	  placeholder="Search..."
		/>
	)
}	

export default Search