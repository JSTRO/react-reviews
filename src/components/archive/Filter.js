import React from "react"
import useReviewSearch from '../hooks/useReviewSearch.js'

function Filter(props) {
  
  const { 
    search,
    currentPage,
    yearFilter,
    handleYearFilter, 
    handleAuthorFilter, 
    toggleBNMFilter
  } = props

  const { reviews } = useReviewSearch(search, currentPage)

  const years = yearFilter.map(year => (
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
    const authors = reviews.map(review => review.author) 
    return [...new Set(authors)].sort()
  }

  const authorOptions = getAuthors().map(author => (
    <option key={author} value={author}>{author}</option>
  ))

	return (
    <>
  		<div>{years}</div>
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