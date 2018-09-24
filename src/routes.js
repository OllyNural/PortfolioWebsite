import React from 'react'
import { Router, Route } from 'react-router'

// Projects
import TicTacToePage from 'projects/TicTacToe'
import TodoPage from 'projects/Todo'

// Version 1
import HomeV1 from 'components/v1/Home'
import AboutV1 from 'components/v1/About'
import WorkV1 from 'components/v1/Work'
import BlogV1 from 'components/v1/Blog'
import ContactV1 from 'components/v1/Contact'
import NotFoundPageV1 from 'components/v1/NotFound'
import ProjectPageV1 from 'components/v1/ProjectTemplate'
import BlogPageV1 from 'components/v1/Blog'
import BlogHomePageV1 from 'components/v1/BlogHome'

// Version 2
import HomeV2 from 'components/v2/Home'

const routes = (
  <Router>
    {/* projects */}
    <Route path="tictactoe/demo" component={TicTacToePage}/>
    <Route path="todo/demo" component={TodoPage}/>
    {/* V1 Website */}
    <Route path="/v1" component={HomeV1}/>
    <Route path="/v1/about" component={AboutV1}/>
    <Route path="/v1/work" component={WorkV1}/>
    <Route path="/v1/blog" component={BlogV1}/>
    <Route path="/v1/contact" component={ContactV1}/>
    <Route path="/v1/project/:project" component={ProjectPageV1}/>
    <Route path="/v1/bloghome" component={BlogHomePageV1}/>
    <Route path="/v1/blog/:blogid" component={BlogPageV1}/>
    <Route path="/v1/*" component={NotFoundPageV1}/>
    {/* V2 Website */}
    <Route path="/" component={HomeV2}/>    
  </Router>
)

export default routes;
