import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import History from './components/History'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import './App.css'

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/" component={Home} />
        <Route exact path="/history" component={History} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App
