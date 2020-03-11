export default function formatDate(date) {
	const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'}
	const newDate = new Date(date)
	return newDate.toLocaleDateString("en-US", dateOptions)
}