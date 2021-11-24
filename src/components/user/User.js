import React from 'react';
import {Redirect} from 'react-router-dom';

function User({user, logout}) {
  //Display user info
  //TODO

  if (user.userID === '-1') {
    return <Redirect to='/' />
  }
  return (
    <div>
      {user.userID}
      <br/>
      {user.name}
      <br/>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default User;
