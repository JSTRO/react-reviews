import React from "react"

function Filter({data, handleYearFilter, handleAuthorFilter, toggleBNMFilter}) {

  const getYears = () => {
    const years = data.map(review => review.pub_year) 
    return [...new Set(years)].sort()
  }

  const yearOptions = getYears().map(year => (
    <label>
      <input
        key={year.reviewid}
        type="checkbox"
        name={year}
        onChange={handleYearFilter}
      /> {year}
    </label>
  ))

  const getAuthors = () => {
    const authors = data.map(review => review.author.trim()) 
    return [...new Set(authors)].sort()
  }

  const authorOptions = getAuthors().map(author => (
    <option value={author}>{author}</option>
  ))

	return (
    <>
  		<p>{yearOptions}</p>
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