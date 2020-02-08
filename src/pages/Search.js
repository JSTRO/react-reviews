import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import ReviewList from '../components/ReviewList'
import useSearch from '../hooks/useSearch.js'

function Search() {

  const [currentPage, setCurrentPage] = useState(1)

  const history = useHistory()
  const search = history.location.search.slice(1)

	const { reviews, hasMore, loading, error } = useSearch(search, currentPage)

	return (
		<ReviewList
      reviews={reviews}
      hasMore={hasMore}
      loading={loading}
      error={error}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage} 
    /> 
	)
}

export default Search