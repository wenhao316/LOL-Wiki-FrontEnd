import React from 'react'
import axios from 'axios';
import { useState, useRef } from 'react';
import './match.css';
import url from '../url_config';
import { Link } from 'react-router-dom';

function MatchRecom({ champs })
{
    const [data, setData] = useState([]);
    const [needs, setNeeds] = useState("");
    const enteredName = useRef("");
    const enteredName1 = useRef("");
    const enteredName2 = useRef("");
    const enteredName3 = useRef("");
    const fieldSelected = useRef();

    const handleSearch = () =>
    {

        const field = fieldSelected.current.value;
        let id = enteredName.current.value;
        let id1 = enteredName1.current.value;
        let id2 = enteredName2.current.value;
        let id3 = enteredName3.current.value;
        let inputName = enteredName.current.value;
        let inputName1 = enteredName1.current.value;
        let inputName2 = enteredName2.current.value;
        let inputName3 = enteredName3.current.value;
        for (let i = 0; i < champs.length; i += 1) {
            if (champs[i]['Name'] === inputName) {
                id = champs[i]['Champion_ID']
            }
            if (champs[i]['Name'] === inputName1) {
                id1 = champs[i]['Champion_ID']
            }
            if (champs[i]['Name'] === inputName2) {
                id2 = champs[i]['Champion_ID']
            }
            if (champs[i]['Name'] === inputName3) {
                id3 = champs[i]['Champion_ID']
            }
        }

        axios
            .get(url + `/matchup/recommendation?Position_Name=${field}&c1_ID=${id}&c2_ID=${id1}&c3_ID=${id2}&c4_ID=${id3}`)
            .then((res) =>
            {
                setData(res.data['Query Result']['recommendation']);
                setNeeds(res.data['Query Result']['need'])
            })
            .catch((error) =>
            {
                console.log(error)
            })
    };

    //  Set Display Info from Get
    const getDetails = data === null ? null : Object.keys(data).length === 0 ?
        <div className='result'> Champion Match Up Not Found</div>
        :
        (
            < div className='result' >
                <table className='output-table-rec'>
                    {data.map((tmp) => (
                        <tr className='output' key={tmp.Champion_ID}>
                            <td><img src={tmp.Image_Url} /> </ td>
                            <td> <Link to={`/champion/${tmp.Champion_ID}`}> {tmp.Name}</ Link></td>
                            <td>Control : {tmp.Control} </td>
                            <td>Damage : {tmp.Damage} </td>
                            <td>Mobility : {tmp.Mobility} </td>
                            <td>Toughness : {tmp.Toughness} </td>
                            <td>Utility : {tmp.Utility} </td>
                        </tr>
                    ))
                    }
                </table>
            </div>
        )

    return (
        <div className='champs'>
            <div className='championSearch'>
                <table className='table-match-recom'>
                    <tr className='tr-match-recom'>
                        <td className='td-match-recom'>Enter Position</td>
                        <td className='td-match-recom'>
                            <td> <select name='select-field' id='select-field' ref={fieldSelected}>
                                <option value='Top'>Top</option>
                                <option value='Jungle'>Jungle</option>
                                <option value='Middle'>Middle</option>
                                <option value='Bottom'>Bottom</option>
                                <option value='Support'>Support</option>
                            </select></ td>
                        </td>
                    </tr>

                    <tr className='tr-match-recom'>
                        <td className='td-match-recom'>Teammate No.1</td>
                        <td className='td-match-recom'>
                            <input className='championInput'
                                type="text"
                                ref={enteredName}
                            />
                        </td>
                    </tr>

                    <tr className='tr-match-recom'>
                        <td className='td-match-recom'>Teammate NO.2</td>
                        <td className='td-match-recom'>
                            <input className='championInput'
                                type="text"
                                ref={enteredName1}
                            />
                        </td>
                    </tr>

                    <tr className='tr-match-recom'>
                        <td className='td-match-recom'>Teammate  NO.3</td>
                        <td className='td-match-recom'>
                            <input className='championInput'
                                type="text"
                                ref={enteredName2}
                            />
                        </td>
                    </tr>

                    <tr className='tr-match-recom'>
                        <td className='td-match-recom'>Teammate  NO.4</td>
                        <td className='td-match-recom'>
                            <input className='championInput'
                                type="text"
                                ref={enteredName3}
                            />
                        </td>
                    </tr>
                </table>
                <button onClick={handleSearch} className='searchButton'>Get Recommendation</button>
            </div>
            <div className='you-need'> You Need: {needs}</div>
            {getDetails}
        </div>
    )
}

export default MatchRecom