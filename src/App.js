import React, {useState, useEffect} from 'react'
import Form from './components/Form'
import ReviewList from './components/ReviewList'
import Stats from './components/Stats'
import './App.css'

function App() {

  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState(data)
  const [search, setSearch] = useState("")
  const [sortValue, setSortValue] = useState("")
  const [yearFilter, setYearFilter] = useState([])
  const [BNMFilter, setBNMFilter] = useState(false)
  const [authorFilter, setAuthorFilter] = useState("")

  const handleChange = event => {
    const {value} = event.target
    setSearch(value)
  }

  const handleSort = event => {
    const {value} = event.target
    setSortValue(value)
  }

  const handleYearFilter = event => {
    const name = parseInt(event.target.name) // SEEMS WRONG TO USE NAME INSTEAD OF VALUE?
    setYearFilter(prev => prev.includes(name) ? prev.filter(el => el !== name) : [...prev, parseInt(name)])   
  }

  const toggleBNMFilter = () => {
    setBNMFilter(prev => !prev)
  }

  const handleAuthorFilter = event => {
    const {value} = event.target
    setAuthorFilter(value)
  }

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(e => console.log(e))
  }, [])

  const filtered = data
    .sort((a, b) => a[sortValue] > b[sortValue] ? 1 : -1)
    .filter(review => search !== "" ? review.title.includes(search) || review.artist.includes(search) : review)
    .filter(review => yearFilter.includes(review.pub_year)) 
    .filter(review => BNMFilter ? review.best_new_music === 1 : review)
    .filter(review => authorFilter ? authorFilter === review.author : review)

  useEffect(() => setFilteredData(filtered), [filtered.join(",")])

  return (
    <div>
      <h3>Pitchfork Reviews</h3>
      <Form 
        search={search} 
        handleChange={handleChange}
        handleYearFilter={handleYearFilter}
        handleAuthorFilter={handleAuthorFilter}  
        toggleBNMFilter={toggleBNMFilter} 
        handleSort={handleSort}
        data={data}
      />
      <Stats filtered={filteredData}/>
      <ReviewList filtered={filteredData}/>
    </div>
  )
}

export default App
