import React from "react"

function Search(props) {

	const {search, handleChange} = props

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