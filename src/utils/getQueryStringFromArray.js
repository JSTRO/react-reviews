export default function getQueryStringFromArray(array) {
  let queryArr = []
	array.map(el => queryArr.push(`genre=${encodeURIComponent(el)}`))     
  return queryArr.join('&')
}