export default function getQueryStringFromObject(obj) {
  let queryArr = []
  for (const prop in obj) {
    if (obj[prop]) {
      queryArr.push(`genre=${encodeURIComponent(prop)}`)
    }
  }
  return queryArr.join('&')
}
