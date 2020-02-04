import React from 'react'
import ReviewList from '../components/ReviewList'
import useReviewSearch from '../hooks/useReviewSearch.js'

function Home({search, currentPage, setCurrentPage}) {

	const { reviews, hasMore, loading, error } = useReviewSearch(search, currentPage)

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

export default Home