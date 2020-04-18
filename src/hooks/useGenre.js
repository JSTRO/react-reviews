import useAPI from './useAPI.js'

export default function useGenre(genres, pageNumber) {
  return useAPI('/api/genres', { genres: genres, pageNumber: pageNumber })
}
