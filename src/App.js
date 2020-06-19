import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Menu from './components/Menu'
import Home from './pages/Home'
import BestNewMusic from './pages/BestNewMusic'
import Search from './pages/Search'
import AuthorPage from './pages/AuthorPage'
import ArtistPage from './pages/ArtistPage'
import ReviewPage from './pages/ReviewPage'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/best-new-music">
            <BestNewMusic />
          </Route>
          <Route exact path="/reviews/:reviewid">
            <ReviewPage />
          </Route>
          <Route exact path="/authors/:author">
            <AuthorPage />
          </Route>
          <Route exact path="/artists/:artist">
            <ArtistPage />
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
