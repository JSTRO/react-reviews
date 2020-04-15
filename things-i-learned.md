# react-reviews: Things I Learned & Resources That Helped Me

### Intro
react-reviews is a clone of Pitchfork's reviews pages built with React, Express, and SQLite. After being drawn to the elegance of Pitchfork's UI, the idea to recreate this page in React was crystallized when I discovered a [SQLite database](https://www.kaggle.com/nolanbconaway/pitchfork-data) with 18k Pitchfork reviews. The database had everything I needed to build out the site except the most important visual component: the image source for each album cover. After crawling Pitchfork with [cheerio](https://cheerio.js.org/) and updating the `reviews` table with each review image, I had a complete dataset to form the basis of my app. 

### API
I first built a REST API using Express to host the data. This [tutorial](https://www.sqlitetutorial.net/sqlite-nodejs/) was great for the basics of interacting with a SQLite databases from a Node.js application, and this [tutorial](https://expressjs.com/en/guide/database-integration.html#sqlite) was helpful for the specifics of Express. Since my Express server and React development server were listening on different ports, I imported the `cors` module to allow AJAX requests to skip the Same-origin policy and access resources from a different host. I then created a route called `api/all-reviews` to host the data for my home page. All the routes I eventually created consisted of the same basic elements:

1. A GET method to the route in question (in this case the `/api/all-reviews` route):
			
		app.get(`/api/all-reviews`, (req, res, next) => {

2. Query parameters defined for the route which allow for pagination (and the infinite scroll feature mentioned below):
		
		let { limit = 48, page = 1 } = req.query

		limit = parseInt(limit)
		page = (parseInt(page) - 1) * limit

3. The SQL query for the GET method to execute:

		const sql = `SELECT * FROM reviews 
			  JOIN genres ON reviews.reviewid = genres.reviewid
			  LIMIT ? 
			  OFFSET ?`

4. The specfic parameters to plug into the `?` placeholder in the query above:

		const params = [limit, page]

5. The `all()` method to execute a SQL query with specified parameters and call a function to access all the rows in the result set:

		db.all(sql, params, (err, rows) => {
			if (err) {
				res.status(400).json({
					'error': err.message
				})
				return
			}
			res.json({
				message: 'success',
				data: rows
			})
		})

One interesting challenge I encountered during the API development was with SQL placeholders in the `/api/genres` route. The goal with the SQL query was to retreive all reviews that matched any genres selected from a list of checkboxes in the UI. To accomplish this I planned to use the SQL `WHERE-IN` clause e.g. `WHERE genres.genre IN (rock, rap, pop)`. The challenge, however, was how to insert the subset of genres selected into the parentheses.

The answer was to map over the array of genres and create a `?` placeholder for each genre. I did this without referencing the actual genre element to prevent any risk of SQL injection (even though I already used a placeholder to prevent this and in the case of this app, no security risks exist.) I then joined the array of placeholders with `, ` to match the `WHERE IN` syntax. Finally I spreaded out the array elements so that each genre became its own param and thus matched its corresponding placeholder:

	let { 
		genres = ['electronic', 'metal', 'rock', 'rap', 'experimental', 'pop/r&b', 'folk/country', 'jazz'], 
    	limit = 48, 
        	page = 1
        } = req.query

	const genresPlaceholder = genres.map(() => '?').join(', ')
	limit = parseInt(limit)
	page = (parseInt(page) - 1) * limit

	const sql = `SELECT * FROM reviews 
			JOIN genres ON reviews.reviewid = genres.reviewid
			WHERE genres.genre IN (${genresPlaceholder})
			LIMIT ? 
			OFFSET ?`

	const params = [...genres, limit, page]

### `useAPI()` hook
One of the most useful tools I employed while creating this app was to write a custom `useAPI()` hook to load data for each page. `useAPI()` takes a url and a list of params that are passed to [axios](https://github.com/axios/axios) to make the request for the specific set of reviews needed. Each individual request for data is then in turn a hook which calls `useAPI()`. For example, to retrieve the list of all reviews, the `useAllReviews()` hook calls `useAPI()` with the `/api/all-reviews` route and `pageNumber` parameter:

	import useAPI from './useAPI.js'

	export default function useAllReviews(pageNumber) {
		return useAPI('/api/all-reviews', { page: pageNumber })
	}

This will load all reviews from the provided page.

### Infinite Scroll
In addition to retrieving the necessary data, `useAllReviews()` also passes down props to the `ReviewList` component, which makes use of them in its infinite scroll logic. The implementation for this feature and the structure for the previous `useAPI()` hook came from this excellent [video](https://reactjs.org/docs/hooks-reference.html#usecallback).

	function ReviewList({reviews, hasMore, loading, error, setCurrentPage, currentPage}) {

		/* Infinite scroll logic */
		const observer = useRef()
		const lastReviewRef = useCallback(node => {
			if (loading) {
				return
			}
			if (observer.current) {
				observer.current.disconnect()
			}
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) {
					setCurrentPage(prevPage => prevPage + 1)
				}
			})
			if (node) {
				observer.current.observe(node)
			}
		}, [loading, hasMore, setCurrentPage])
		return (
	   	<>
	   		<div className="review-list-container">
			   	{reviews.map((review, index) => {
			   		return (
		   				<div 
		   					// ref set to last review on the page
		   					ref={reviews.length === index + 1 ? lastReviewRef : null} 
		   					key={review.reviewid}
		   					className="review-list-item" 
		   				>
		   					<Review review={review} />
		   				</div>
		   			)
			   	})}
			  </div> 	
			</>
		)
	}

Here a `ref` attribute is added to the last review on the current page. Whenever the element containing the last review is created, a function inside of the `useCallback()` hook is called with the reference to this element (the `node` parameter of the function). Each time the last review on the page becomes visible (identified by checking the IntersectionObserver API's `isIntersecting()` method) AND if there are more reviews to load (if  `hasMore` prop is true), the next page of reviews is loaded and the ref is assigned to the new page's last review. 

### Deployment
My first instinct was to deploy my app on Heroku, but its [ephemeral filesystem](https://devcenter.heroku.com/articles/sqlite3) does not work well with SQLite3, which runs in memory. As an alternative, I found [Microsoft Azure](https://azure.microsoft.com/en-us/) and used [this tutorial](https://docs.microsoft.com/en-us/azure/app-service/deploy-local-git) to deploy from my local Git repo.The build process was relatively smooth, however one issue I encountered was Azure's server taking over a minute to load data the first time I opened the app after a  while. The solution to this is stated [here](https://social.msdn.microsoft.com/Forums/azure/en-US/62599c60-0382-4c01-8904-d702543a8814/does-app-service-web-app-go-to-sleep?forum=windowsazurewebsitespreview):

*By default, web apps are unloaded if they are idle for some period of time. This lets the system conserve resources. In Basic or Standard mode, you can enable Always On to keep the app loaded all the time.*

*This setting can be turned on in the 'application settings' blade of your web app. It sends a ping to the root of your site every 5 minutes to keep it warm.*

### Conclusion
Recreating Pitchfork's review pages turned out to be a great learning experience in building a fullstack JS app. I learned a lot about the interplay between SQlite, Express, and React, as well as React Hooks and React Router (which I didn't touch on here but maybe will add more about later). The component-based nature of Pitchfork's site lends itself nicely to React and its visual elegance made the end product a satisfying reward.

### Acknowledgements
*Special thanks to [Matt Brandly](https://github.com/brandly) for all his hours of free consultation on this project and many others!*
