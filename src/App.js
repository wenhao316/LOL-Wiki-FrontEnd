import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MatchUp from './components/pages/MatchUp';
import Champs from './components/pages/Champs';
import SignIn from './components/pages/SignIn';
import RegisterForm from './components/register/RegisterForm';
import User from './components/user/User';
import ChampionList from './components/championList/ChampionList';
import ChampionDetail from './components/championDetail/ChampionDetail';
import axios from 'axios';
import url from './components/url_config';

function App()
{
  const [champs, setChamps] = useState([]);

  useEffect(() =>
  {
    if (champs.length === 0) {
      axios
        .get(url + `/champion/image`)
        .then((res) =>
        {
          setChamps(res.data['Query Result']);
        }).catch((error) =>
        {
          console.log(error)
        })
    }
  })

  // Store the current user information
  const [user, setUser] = useState({ userID: '-1', name: '', favourite: [], favouriteDetail: [] });

  const login = (details) =>
  {
    setUser({ userID: details.userID, name: details.name, favourite: details.favourite, favouriteDetail: details.favouriteDetail });
  }

  const logout = () =>
  {
    setUser({ userID: '-1', name: '', favourite: [], favouriteDetail: [] });
  }

  return (
    <>
      <Router>
        <Navbar user={user} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/matchup' exact component={() => (<MatchUp champs={champs} />)} />
          <Route path='/championUpdate' exact component={Champs} />
          <Route path='/championList' exact component={ChampionList} />
          <Route path='/champion/:id' exact component={() => (<ChampionDetail user={user} login={login} />)} />
          <Route path='/sign-in' component={() => (<SignIn login={login} />)} />
          <Route path='/sign-up' component={RegisterForm} />
          <Route path='/user' component={() => (<User user={user} logout={logout} />)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;