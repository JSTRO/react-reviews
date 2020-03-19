import React, { useState } from 'react'
import ReviewList from '../components/ReviewList'
import Header from '../components/Header'
import Divider from '@material-ui/core/Divider'
import useAllReviews from '../hooks/useAllReviews.js'

function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const { reviews, hasMore, loading, error } = useAllReviews(currentPage)

	return (
    <>
      <Header title="ALL REVIEWS" />  
  		<ReviewList 
        reviews={reviews}
        hasMore={hasMore}
        loading={loading}
        error={error}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} 
      /> 
    </>
	)
}

export default Home