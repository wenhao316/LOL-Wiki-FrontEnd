import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import url from '../url_config';

function ReadChamp()
{
    const [data, setData] = useState(null)
    const [enteredName, setEnteredName] = useState("");

    // GET Request
    const handleSearch = () =>
    {
        axios
            // put 信息
            .get(url + `/champion?name=` + enteredName)
            .then((res) =>
            {
                //  [][0] is undefined
                setData(res.data['Query Result'][0]);
            })
            .catch((error) =>
            {
                setData({})
                console.log(error)
            })
    };


    // Set entered name to Get
    const NameChangeHandler = (event) =>
    {
        setEnteredName(event.target.value);
    };

    //  Set Display Info from Get
    const getDetails = data === null ? null : Object.keys(data).length === 0 ?
        <div> Champion Name Not Found</div>
        :
        (
            <div>
                <div>
                    <div ><img className='img' src={data.Image_Url} alt='' /> </div>
                    <div >Name: {data.Name}</div>
                    <div >Class: {data.Class}</div>
                    <div >Resource: {data.Resource}</div>
                    <div >Range Type: {data.Range_Type}</div>
                    <div >Region: {data.Region}</div>
                    <div >Adaptive Type: {data.Adaptive_Type}</div>
                    <div> Story: {data.Background_Story}</div>
                    <div >Main Page: <a href={data.Main_Page_Url}>{data.Name}</a></div>
                </div>
                <div>
                    <button onClick={handleSearch} />
                </div>
            </div>
        )

    return (
        <div className='champs'>
            <table className='table-champ-form'>
                <tr className='tr-champ-form'>
                    <td className='td-champ-form'>Champion Name</td>
                    <td className='td-champ-form'>
                        <input
                            className='text-input'
                            type="text"
                            value={enteredName}
                            onChange={NameChangeHandler}
                        />
                    </td>
                </tr>
            </table>
            <button className='button-champ-form' onClick={handleSearch}>Read</button>
            {getDetails}
        </div>
    )
}

export default ReadChamp