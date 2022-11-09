import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Mainrouter from './components/MainRouter'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'

import NotFound from './components/NotFound'

import './App.css'
import Bookdetails from './components/Bookdetails'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Mainrouter exact path="/" component={Home} />
      <Mainrouter exact path="/shelf" component={Bookshelves} />
      <Mainrouter exact path="/books/:id" component={Bookdetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
