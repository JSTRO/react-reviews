import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import getQueryStringFromArray from '../utils/getQueryStringFromArray'

export default function useGenreFilter() {
  const location = useLocation()
  const history = useHistory()

  const params = new URLSearchParams(location.search.slice(1))
  const paramGenre = params.getAll('genre')

  const [genres, setGenres] = useState(paramGenre)
  const [currentPage, setCurrentPage] = useState(1)

  const queryString = getQueryStringFromArray(genres)

  useEffect(() => {
    history.replace({
      search: queryString,
    })
  }, [queryString])

  useEffect(() => {
    setGenres(paramGenre)
  }, [paramGenre.join(',')])

  return { genres, setGenres, currentPage, setCurrentPage }
}
