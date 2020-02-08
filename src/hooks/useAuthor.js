import useAPI from './useAPI.js'

export default function useAuthor(author, pageNumber) {
	return useAPI('/authors/:author', { author: author,  page: pageNumber, limit: 48 })
}