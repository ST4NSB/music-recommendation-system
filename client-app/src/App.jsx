import Home from './Home'
import Search from './Search'
import Recommendations from './Recommendations'
import Error from './Error'
import { Switch, Route,  } from 'react-router-dom'

const App = () => { 
  return (
    <>
      <Switch>  
        <Route exact path = "/"><Home /></Route>
        <Route exact path = "/search"><Search /></Route>
        <Route exact path = "/recommendations"><Recommendations /></Route>
        <Route path = "*"><Error /></Route>
      </Switch>
    </>
  );
}

export default App;
