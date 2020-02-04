import React, {useState} from 'react'
import { Switch, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Home from './pages/Home'
import BestNewMusic from './pages/BestNewMusic'
import './App.css'

function App() {

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")

  return (
    <>
      <Menu 
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
      />  
      <Switch>
        <Route exact path="/reviews">
          <Home 
            search={search}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Route>
        <Route path="/reviews/best-new-music">
          <BestNewMusic 
            search={search}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />  
        </Route>
      </Switch>
    </>
  )
}

export default App