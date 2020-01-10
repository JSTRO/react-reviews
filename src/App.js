import React, {useState, useEffect} from 'react'
import Search from "./components/Search"
import Sort from "./components/Sort"
import Filter from "./components/Filter"
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

  const handleSearch = event => {
    const {value} = event.target
    setSearch(value)
  }

  const handleSort = event => {
    const {value} = event.target
    setSortValue(value)
  }

  const handleYearFilter = event => {
    const {name} = event.target // NOT USING checked property
    setYearFilter(prev => prev.map(el => el.year === parseInt(name) ? 
      {year: el.year, isChecked: !el.isChecked} : 
      {year: el.year, isChecked: el.isChecked}))
  }

  const toggleBNMFilter = () => {
    setBNMFilter(prev => !prev)
  }

  const handleAuthorFilter = event => {
    const {value} = event.target
    setAuthorFilter(value)
  }

  // fetch data
  useEffect(() => {
    fetch("http://localhost:3000/api/reviews")
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(e => console.log(e))
  }, [])

  const dataDependency = data.join(",")

  // set initial year filter
  useEffect(() => {
      const years = data.map(review => review.pub_year)
      const uniqueYears = [...new Set(years)].sort()
      setYearFilter(uniqueYears.map(el => ({year: el, isChecked: true}))) 
  }, [dataDependency])

  const filtered = data.filter(review =>  {
    const years = yearFilter.map(year => year.year)
    const checked = yearFilter.map(year => year.isChecked)
    return (
      (checked.length ? checked[years.indexOf(review.pub_year)] : review) &&
      (search !== "" ? review.title.includes(search) || review.artist.includes(search) : review) &&
      (BNMFilter ? review.best_new_music === 1 : review) &&
      (authorFilter && authorFilter !== "Select author..." ? authorFilter === review.author : review)
    )
  })

  const sortedAndFiltered = filtered.sort((a, b) => a[sortValue] > b[sortValue] ? 1 : -1)
  
  const sortedAndFilteredDependency = sortedAndFiltered.join(",")
  const sortedAndFilteredFirstIndex = sortedAndFiltered[0] // NOT a permanent fix
  useEffect(() => setFilteredData(sortedAndFiltered), [sortedAndFilteredDependency, sortedAndFilteredFirstIndex])

  return (
    <div>
      <h3>Pitchfork Reviews</h3>
      <form>
        <Search search={search} handleSearch={handleSearch}/>
        <Sort data={data} handleSort={handleSort} />
        <Filter
          filteredData={filteredData}
          setYearFilter={setYearFilter}
          yearFilter={yearFilter}
          handleYearFilter={handleYearFilter} 
          handleAuthorFilter={handleAuthorFilter}
          toggleBNMFilter={toggleBNMFilter}
        />
      </form>
      <Stats filtered={filteredData} setFilteredData={setFilteredData}/>
      <ReviewList filtered={filteredData} setFilteredData={setFilteredData}/>
    </div>
  )
}

export default App
