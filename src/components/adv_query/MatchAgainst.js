import React from 'react'
import axios from 'axios';
import { useState, useRef } from 'react';
import './match.css';
import url from '../url_config';
import { Link } from 'react-router-dom';

function MatchAgainst({ champs })
{
    const [data, setData] = useState([])
    const enteredName = useRef();
    const fieldSelected = useRef();

    const handleSearch = () =>
    {
        const field = fieldSelected.current.value;
        let id = enteredName.current.value;
        let inputName = enteredName.current.value;
        for (let i = 0; i < champs.length; i += 1) {
            if (champs[i]['Name'] === inputName) {
                id = champs[i]['Champion_ID']
                break
            }
        }

        axios
            .get(url + `/matchup/against?Second_Champion_ID=${id}&Position_Name=${field}`)
            .then((res) =>
            {
                setData(res.data['Query Result']);

            })
            .catch((error) =>
            {
                console.log(error)
            })
    };

    //  Set Display Info from Get
    const getDetails = data === null ? null : Object.keys(data).length === 0 ?
        <div className='result'>Champion Match Up Not Found</div>
        :
        (
            <div className='result'>
                <table className='output-table'>
                    {data.map((tmp) => (
                        <tr className='output-rec0' key={tmp.Champion_ID}>
                            <td><img src={tmp.Image_Url} /> </ td>
                            <td> <Link to={`/champion/${tmp.Champion_ID}`}> {tmp.Name}</ Link></td>
                            <td>Win Rate: {tmp.Win_Rate} </td>
                        </tr>
                    ))
                    }
                </ table>
            </div >
        )

    return (
        <div className='champs'>
            <div className='championSearch'>
                <table className='table-match-against'>
                    <tr className='tr-match-against'>
                        <td className='td-match-against'>Champion Position</td>
                        <td> <select name='select-field' id='select-field' ref={fieldSelected}>
                            <option value='Top'>Top</option>
                            <option value='Jungle'>Jungle</option>
                            <option value='Middle'>Middle</option>
                            <option value='Bottom'>Bottom</option>
                            <option value='Support'>Support</option>
                        </select></ td>
                    </tr>

                    <tr className='tr-match-against'>
                        <td className='td-match-against'>Champion Name / ID</td>
                        <td className='td-match-against'>
                            <input className='championInput'
                                type="text"
                                ref={enteredName}
                            />
                        </td>
                    </tr>
                </table>
                <button onClick={handleSearch} className='searchButton'>Get Recommendation</button>
            </div>
            {getDetails}
        </div>
    )
}

export default MatchAgainst;