import React, {useState} from 'react'
import ReviewList from '../components/ReviewList'
import Divider from '@material-ui/core/Divider'
import useAllReviews from '../hooks/useAllReviews.js'

function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const { reviews, hasMore, loading, error } = useAllReviews(currentPage)

	return (
    <>
      <h3 className="review-list-title">ALL REVIEWS</h3>
      <div className="review-list-divider">
        <Divider variant="middle"/>
      </div>  
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