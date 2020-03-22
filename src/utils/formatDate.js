export default function formatDate(date) {
	const dateOptions = {year: 'numeric', month: 'long', day: 'numeric'}
	const newDate = new Date(date)
	return newDate.toLocaleDateString("en-US", dateOptions).replace(',', '')
}