import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Author from '../components/Author'

function AuthorPage() {
  const { author } = useParams()
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Author
      author={author}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  )
}

export default AuthorPage
