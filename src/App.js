import React, {useState, useEffect} from 'react'
import Search from './components/Search'
import Review from './components/Review'
import './App.css'

function App() {

  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  //const [sort, setSort] = useState(false)

  const handleChange = event => {
    const {value} = event.target
    return setSearch(value)
  }

  const handleSort = event => {
    const {value} = event.target
    const sortedData = data.map(review => review.value).sort()
    //setSort(true)
    //setData(sortedData)
  }

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(e => console.log(e))
  }, [])

  const filteredTitles = data.filter(review => review.title.includes(search) || review.artist.includes(search))

  const titles = filteredTitles.map(review => {
    return (
      <Review key={review.id} data={review} />
    )
  })

  return (
    <div>
      <Search 
        search={search} 
        handleChange={handleChange} 
        handleSort={handleSort}
        data={data}
      />
      <ol>{titles}</ol>
    </div>
  )
}

export default App;
