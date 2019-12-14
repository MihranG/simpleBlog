import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter , Switch, Route } from 'react-router-dom'

import './App.css';
import {store} from './store'
import {Home} from './Home';
import {NewPage} from './NewPage';
import {ItemPage} from './ItemPage'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
        <Switch>
          <Route exact path="/"
            render={({history})=>(<Home history={history}/>)}
          />
          <Route path="/posts/new"
            render={({history, match})=>(<NewPage history={history} match={match}/>)}
          />
          <Route path="/posts/:id"  
            render={({match, history})=>(<ItemPage match={match} history={history} />)}
          />
        </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
