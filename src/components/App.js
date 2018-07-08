import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import HomePage from './HomePage'

const Loading = () => 'loading...'

const LoadableHomePage = Loadable({
  loader: () => import(/* webpackChunkName: "PostPage" */ './PostPage'),
  loading: Loading
})
const LoadableMessagePage = Loadable({
  loader: () => import(/* webpackChunkName: "MessagePage" */ './MessagePage'),
  loading: Loading
})

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/post">Post</Link>
            <Link to="/message">Message</Link>
          </nav>
          <Route exact path="/" component={HomePage} />
          <Route path="/post" component={LoadableHomePage} />
          <Route path="/message" component={LoadableMessagePage} />
        </div>
      </Router>
    )
  }  
}

export default App