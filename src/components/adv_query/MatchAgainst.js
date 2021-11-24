import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './match.css';


function MatchAgainst()
{
  const [data, setData] = useState([])
  const [position, setPosition] = useState("");
  const [enteredid, setId] = useState("");

  const handleSearch = () =>
  {
    let a = 'http://127.0.0.1:5000'
    console.log(data)
    axios
      .get(a + `/matchup/against?Second_Champion_ID=${enteredid}&Position_Name=${position}`)
      .then((res) =>
      {
        setData(res.data['Query Result']);

      })
      .catch((error) =>
      {
        console.log(error)
      })
  };

  const PositionHandler = (event) =>
  {
    setPosition(event.target.value);
  };

  const IdChangeHandler = (event) =>
  {
    setId(event.target.value);
  };

  //  Set Display Info from Get
  const getDetails = data === null ? null : Object.keys(data).length === 0 ?
    <div className='result'>Champion Match Up Not Found</div>
    :
    (
      <div className='result'>
        {data.map((tmp) => (
          <div key={tmp.Champion_ID}>
            <div> Name: {tmp.Name}</div>
            <div>Win Rate: {tmp.Win_Rate}</div>
          </div>
        ))
        }
        <div>
          <button onClick={handleSearch} />
        </div>
      </div >
    )

  return (
    <div className='champs'>
      <div className='championSearch'>
        <table className='table-match-against'>
          <tr className='tr-match-against'>
            <td className='td-match-against'>Champion Position</td>
            <td className='td-match-against'>
              <input className='championInput'
                type="text"
                value={position}
                onChange={PositionHandler}
            /></td>
          </tr>

          <tr className='tr-match-against'>
            <td className='td-match-against'>Champion Id</td>
            <td className='td-match-against'>
              <input className='championInput'
                type="text"
                value={enteredid}
                onChange={IdChangeHandler}
              />
            </td>
          </tr>
        </table>
        <button onClick={handleSearch} className='searchButton'>Get WinRate</button>
      </div>
      {getDetails}
    </div>
  )
}

export default MatchAgainst;
