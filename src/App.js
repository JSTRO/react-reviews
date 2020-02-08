import React, {useState} from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Menu from './components/Menu'
import Home from './pages/Home'
import BestNewMusic from './pages/BestNewMusic'
import Search from './pages/Search'
import AuthorPage from './pages/AuthorPage'
import './App.css'

function App() {

  const [currentPage, setCurrentPage] = useState(1)

  return (
    <>
      <Router>
        <Menu 
          setCurrentPage={setCurrentPage}
        />  
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/best-new-music">
            <BestNewMusic />
          </Route>
          <Route 
            exact path="/search"
            render={(props) => {
              return (
                <Search {...props} 
                  currentPage={currentPage} 
                  setCurrentPage={setCurrentPage} />
              )
            }}
          >  
          </Route>
          <Route 
            path="/authors/:author"
            render={(props) => {
              return (
                <AuthorPage {...props} 
                  currentPage={currentPage} 
                  setCurrentPage={setCurrentPage} />
              )
            }}
          >
          </Route>
        </Switch>
      </Router>  
    </>
  )
}

export default App