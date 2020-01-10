import React from "react"
import Search from "./Search"
import Sort from "./Sort"
import Filter from "./Filter"
import '../App.css'

function Form(props) {

	const {
		search, 
		handleChange, 
		handleSort, 
		handleYearFilter, 
		handleAuthorFilter, 
		toggleBNMFilter,
		years, 
		data,
		filteredData
	} = props

	return (
		<form>
      <Search search={search} handleChange={handleChange}/>
    	<Sort data={data} handleSort={handleSort} />
    	<Filter
    		filteredData={filteredData}
    		years={years}
    		handleYearFilter={handleYearFilter} 
    		handleAuthorFilter={handleAuthorFilter}
    		toggleBNMFilter={toggleBNMFilter}
    	/>
	  </form>
	)
}

export default Form