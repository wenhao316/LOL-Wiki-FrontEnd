import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import '../../App.css';

const a = 'http://127.0.0.1:5000';

// Sign In Page
export default function SignIn({login})
{
    const [details, setDetails] = useState({userId:'', password: ''});
    //flag indicating the login state, -1: not login; 0: password correct, need to get user info; 1: login complete
    const [loginFlag, setLoginFlag] = useState(-1);

    const submitHandler = e => {
        e.preventDefault();
        //call axios to submit details
        axios
          .get(a + `/user/password?id=${details.userId}`)
          .then((res) =>
          {
            if (res.data.hasOwnProperty('Query Result')) {
              const correctPassword = res.data['Query Result'];
              if (details.password !== correctPassword) {
                  alert('Password is incorrect');
              } else {
                setLoginFlag(0);
              }
            } else {
                alert('User ID is incorrect');
            }
          })
          .catch((error) =>
          {
            console.log(error)
          })
    }

    useEffect(() => {
        if (loginFlag === 0) {
          async function getUserInfo() {
            axios
                .get(a + `/user/info?id=${details.userId}`)
                .then((res) =>
                {
                    if (res.data.hasOwnProperty('Query Result')) {
                        const userInfo = {
                            userID: res.data['Query Result']['User_ID'],
                            name: res.data['Query Result']['Name'],
                            favourite: res.data['Query Result']['Favourite'],
                            favouriteDetail: res.data['Query Result']['Favourite_Detail']
                        }
                        login(userInfo);
                    }
                    if (res.data.hasOwnProperty('Error_message')) {
                        alert(res.data['Error_message']);
                    }
                })
                .catch((error) =>
                {
                    console.log(error)
                })
          }
          getUserInfo();
          setLoginFlag(1)
        }
      }, [loginFlag, details, login]);

    if (loginFlag === 1) {
        return <Redirect to='/championList' />
    }

    return (
        <div className='form-container'>
          <form onSubmit={submitHandler}>
            <table className='table-register'>
              <tbody>
                <tr className='tr-register'>
                  <td className='td-register' colSpan='2'><h3>Log In to Your Account</h3></td>
                </tr>
      
                <tr className='tr-register'>
                  <td className='td-register'><label htmlFor="userId">User Id: </label></td>
                  <td className='td-register'>
                    <input type="text" name="userId" id="userId" 
                      onChange={e => setDetails({...details, userId: e.target.value})} value={details.userId}/>
                  </td>
                </tr>
      
                <tr className='tr-register'>
                  <td className='td-register'><label htmlFor="password">Password: </label></td>
                  <td className='td-register'>
                    <input type="text" name="password" id="password" 
                      onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                  </td>
                </tr>
      
                <tr className='tr-register'>
                  <td className='td-register' colSpan='2'><input className='input-submit' type="submit" value="Log in" /></td>
                </tr>
              </tbody>
            </table>

            <div className='link-sign-up'>
              <span>Need an account? </span>
              <span>
                <Link className='link-sign-up' to={'/sign-up'}>
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      )
}