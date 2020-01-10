import React from "react"

function Filter(props) {
  
  const { 
    filteredData,
    yearFilter,
    handleYearFilter, 
    handleAuthorFilter, 
    toggleBNMFilter
  } = props

  const yearCheckboxes = yearFilter.map(year => (
    <label key={year.year}>
      <input
        type="checkbox"
        name={year.year}
        checked={year.isChecked}
        onChange={handleYearFilter}
      /> {year.year}
    </label>
  ))

  const getAuthors = () => {
    const authors = filteredData.map(review => review.author.trim()) 
    return [...new Set(authors)].sort()
  }

  const authorOptions = getAuthors().map(author => (
    <option key={author} value={author}>{author}</option>
  ))

	return (
    <>
  		<div>{yearCheckboxes}</div>
      <label>
        <input
          type="checkbox"
          name="BNM"
          onChange={toggleBNMFilter}
        /> BNM?
      </label>

      <select
        onChange={handleAuthorFilter}
      >
        <option>Select author...</option>
        {authorOptions}
      </select>
    </>
	)
}

export default Filter