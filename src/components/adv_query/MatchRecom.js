import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './match.css';

function MatchRecom()
{
    const [data, setData] = useState([]);
    const [needs, setNeeds] = useState("");
    const [position, setPosition] = useState("");
    const [enteredId, setId] = useState("");
    const [enteredId1, setId1] = useState("");
    const [enteredId2, setId2] = useState("");
    const [enteredId3, setId3] = useState("");

    const handleSearch = () =>
    {
        let a = 'http://127.0.0.1:5000'
        console.log(data)
        axios
            .get(a + `/matchup/recommendation?Position_Name=${position}&c1_ID=${enteredId}&c2_ID=${enteredId1}&c3_ID=${enteredId2}&c4_ID=${enteredId3}`)
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


    const PositionHandler = (event) =>
    {
        setPosition(event.target.value);
    };

    const IdChangeHandler = (event) =>
    {
        setId(event.target.value);
    };
    const IdChangeHandler1 = (event) =>
    {
        setId1(event.target.value);
    };
    const IdChangeHandler2 = (event) =>
    {
        setId2(event.target.value);
    };
    const IdChangeHandler3 = (event) =>
    {
        setId3(event.target.value);
    };

    //  Set Display Info from Get
    const getDetails = data === null ? null : Object.keys(data).length === 0 ?
        <div className='result'> Champion Match Up Not Found</div>
        :
        (
            <div className='result'>
                {data.map((tmp) => (
                    <div key={tmp.Champion_ID}>
                        <div> Name: {tmp.Name}</div>
                        <div>Control : {tmp.Control}</div>
                        <div>Damage : {tmp.Damage}</div>
                        <div>Mobility : {tmp.Mobility}</div>
                        <div>Toughness : {tmp.Toughness}</div>
                        <div>Utility : {tmp.Utility}</div>
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
                <table className='table-match-recom'>
                    <tr className='tr-match-recom'>
                        <td className='td-match-recom'>Enter Position</td>
                        <td className='td-match-recom'>
                            <input className='championInput'
                                type="text"
                                value={position}
                                onChange={PositionHandler}
                            />
                        </td>
                    </tr>

                    <tr className='tr-match-recom'>
                        <td className='td-match-recom'>Teammate No.1</td>
                        <td className='td-match-recom'>
                            <input className='championInput'
                                type="text"
                                value={enteredId}
                                onChange={IdChangeHandler}
                            />
                        </td>
                    </tr>

                    <tr className='tr-match-recom'>
                        <td className='td-match-recom'>Teammate NO.2</td>
                        <td className='td-match-recom'>
                            <input className='championInput'
                                type="text"
                                value={enteredId1}
                                onChange={IdChangeHandler1}
                            />
                        </td>
                    </tr>

                    <tr className='tr-match-recom'>
                        <td className='td-match-recom'>Teammate  NO.3</td>
                        <td className='td-match-recom'>
                            <input className='championInput'
                                type="text"
                                value={enteredId2}
                                onChange={IdChangeHandler2}
                            />
                        </td>
                    </tr>

                    <tr className='tr-match-recom'>
                        <td className='td-match-recom'>Teammate  NO.4</td>
                        <td className='td-match-recom'>
                            <input className='championInput'
                                type="text"
                                value={enteredId3}
                                onChange={IdChangeHandler3}
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
