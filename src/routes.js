import React from 'react'
import { Router, Route } from 'react-router'
import Home from './components/Home'
import About from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'
import NotFoundPage from './components/NotFound'
import TicTacToePage from './components/TicTacToe'
import TodoPage from './components/Todo'
import ProjectPage from './components/ProjectTemplate'
import BlogPage from './components/Blog'

const routes = (
  <Router>
    <Route path="/" component={Home}/>
    <Route path="about" component={About}/>
    <Route path="work" component={Work}/>
    <Route path="contact" component={Contact}/>
    <Route path="project/:project" component={ProjectPage}/>
    <Route path="tictactoe/demo" component={TicTacToePage}/>
    <Route path="Todo/demo" component={TodoPage}/>
    <Route path="blog/:blogid" component={BlogPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Router>
)

export default routes;