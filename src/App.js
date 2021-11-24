import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MatchUp from './components/pages/MatchUp';
import Champs from './components/pages/Champs';
import SignUp from './components/pages/SignUp';
import RegisterForm from './components/register/RegisterForm';
import User from './components/user/User';
import ChampionList from './components/championList.js/ChampionList';
import ChampionDetail from './components/championDetail/ChampionDetail';

function App()
{
  // Store the current user information
  const [user, setUser] = useState({userID: '-1', name: '', favourite: null, favouriteDetail: null});

  const login = (details) => {
    setUser({userID: details.userID, name: details.name, favourite: details.favourite, favouriteDetail: details.favouriteDetail});
  }

  const logout = () => {
    setUser({userID: '-1', name: '', favourite: null, favouriteDetail: null});
  }

  return (
    <>
      <Router>
        <Navbar user={user}/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/matchup' component={MatchUp} />
          <Route path='/championUpdate' exact component={Champs} />
          <Route path='/championList' exact component={ChampionList} />
          <Route path='/champion/:id' component={ChampionDetail} />
          <Route path='/sign-up' component={() => (<SignUp login={login}/>)} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/user' component={() => (<User user={user} logout={logout}/>)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;