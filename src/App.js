import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Menu from './components/Menu'
import Home from './pages/Home'
import BestNewMusic from './pages/BestNewMusic'
import Search from './pages/Search'
import AuthorPage from './pages/AuthorPage'
import ReviewPage from './pages/ReviewPage'
import GenrePage from './pages/GenrePage'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Menu />  
        <Switch>
          <Route exact path="/all-reviews">
            <Home />
          </Route>
          <Route exact path="/best-new-music">
            <BestNewMusic />
          </Route>
          <Route exact path="/genres" component={GenrePage}>
          </Route>
          <Route exact path="/reviews/:reviewid">
            <ReviewPage />
          </Route>
          <Route exact path="/authors/:author">
            <AuthorPage />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
        </Switch>
      </Router>  
    </>
  )
}

export default App