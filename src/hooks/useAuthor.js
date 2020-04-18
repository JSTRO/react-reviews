import useAPI from './useAPI.js'

export default function useAuthor(author, pageNumber) {
  return useAPI('/api/authors/:author', { author: author, page: pageNumber })
}
