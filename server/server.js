const express = require('express')
const cors = require('cors')
const app = express()
const sqlite3 = require('sqlite3').verbose()

const path = require('path')
const dbPath = path.resolve(__dirname, 'database.sqlite')

const port = 3000

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
	if (err) {
		console.error(err.message);
	} else {
		console.log('Connected to the sqlite database.');
	}
});

app.get('/', cors(), (req, res, next) => {
	const sql = 'select * from reviews limit 100'

	db.all(sql, (err, rows) => {
	    if (err) {
	      res.status(400).json({
	      	'error': err.message
	      });
	    } else {
	    	res.json({
		        'message': 'success',
		        'data': rows
		    })	
	    }
	    
	});
});

app.listen(port, () => console.log(`App listening on port ${port}!`))