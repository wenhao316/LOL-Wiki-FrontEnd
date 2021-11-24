import React, {useState} from 'react';
import axios from 'axios';
import './registerForm.css'

function RegisterForm() {
  const [details, setDetails] = useState({name:'', password: ''});

  const submitHandler = e => {
    e.preventDefault();
    //call axios to submit details
    let a = 'http://127.0.0.1:5000'
    axios
      .post(a + `/user/add?name=${details.name}&password=${details.password}`)
      .then((res) =>
      {
        if (res.data.hasOwnProperty('Response')) {
          alert(res.data['Response']);
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

  return (
    <div className='form-container'>
      <form onSubmit={submitHandler}>
        <table className='table-register'>
          <tr className='tr-register'>
            <td className='td-register' colSpan='2'><h3>Register</h3></td>
          </tr>

          <tr className='tr-register'>
            <td className='td-register'><label htmlFor="name">Name: </label></td>
            <td className='td-register'>
              <input type="text" name="name" id="name" 
                onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
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
            <td className='td-register' colSpan='2'><input type="submit" value="Submit" /></td>
          </tr>
        </table>
      </form>
    </div>
  )
}

export default RegisterForm;
