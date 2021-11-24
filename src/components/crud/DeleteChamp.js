import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';


function DeleteChamp()
{
    let a = 'http://bcfb-206-221-147-133.ngrok.io'

    const [data, setData] = useState(null)
    const [enteredName, setEnteredName] = useState("");

    const handleDelete = data =>
    {
        axios
            .delete(a + `/champion?id=${enteredName}`, data)
            .then((res) =>
            {
                console.log(res)
            })
            .catch((error) =>
            {
                console.log(error)
            })
    };

    const NameChangeHandler = (event) =>
    {
        setEnteredName(event.target.value);
    };

    return (
        <div className='champs'>
            <table className='table-champ-form'>
                <tr className='tr-champ-form'>
                    <td className='td-champ-form'>Champion ID</td>
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
            <button className='button-champ-form' onClick={handleDelete} >Delete</button>
        </div>
    )
}

export default DeleteChamp
