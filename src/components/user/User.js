import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { VictoryBar } from 'victory';
import { VictoryChart } from 'victory';
import { VictoryAxis } from 'victory';

function User({ user, logout })
{
    //Display user info
    //TODO
    //get the id of the champion
    console.log(user)
    const [flagLoaded, setFlagLoaded] = useState(false);
    const [regionPrefer, serRegionPrefer] = useState({})
    if (user.userID === '-1') {
        return <Redirect to='/' />
    }
    // useEffect(() =>
    // {
    //     if (user.userID === '-1') {
    //         return <Redirect to='/' />
    //     }
    //     if (!flagLoaded) {
    //     }
    // }, [user, flagLoaded, setFlagLoaded]);

    // const [details, setDetails] = useState([]);


    // const fetchChamps = (array) =>
    // {
    //     console.log(user.favourite)
    //     for (let i = 0; i < user.favourite.length; i += 1) {
    //         for (let j = 0; j < array.length; j += 1) {
    //             if (user.favourite[i] === array[j].Champion_ID) {
    //                 setDetails(array[j]);
    //             }
    //         }
    //     }
    //     console.log(details)
    // }
    return (
        <div className='users'>
            <h1 className='title'>Welcome {user.name}</h1>
            <br />
            <h1 className='intro'>
                Your Favorite Champions
            </h1>
            {/* Image & Name */}
            {
                user.favouriteDetail.map((item) => (
                    <div className='item'>
                        <Link to={`/champion/${item.Champion_ID}`}>
                            <div><img src={item.Image_Url} alt='' /></div>
                        </Link>
                        {/* <div className='champion-label'><a href={item.Main_Page_Url}>{item.Name}</a></div> */}
                        <div className='champion-label'>
                            <Link to={`/champion/${item.Champion_ID}`}>
                                <div>{item.Name}</div>
                            </Link>
                        </ div>
                    </div>
                ))}
            <div className='graphs'>
                <h1> Region Preference </ h1>
                {/* Region Bar Chart */}
                <div >
                    <VictoryChart
                        domainPadding={0}

                        style={{
                            label: { fontSize: 15 }
                        }}
                    >
                        <VictoryBar
                            data={user.favouriteDetail}
                            x='Region'
                            y='Name'
                            barWidth={5}
                            style={{
                                data: {
                                    fill: "#c43a31", stroke: "black", strokeWidth: 1
                                },
                            }}
                            animate={{
                                onExit: {
                                    duration: 500,
                                    before: () => ({
                                        _y: 0,
                                        fill: "orange",
                                        label: "BYE"
                                    })
                                }
                            }}
                        />
                        <VictoryAxis
                            style={{
                                tickLabels: { fontSize: 5, padding: 0 }
                            }}
                        />
                    </ VictoryChart>
                </ div>
            </div>
            {/* Logout Button */}
            < button onClick={logout} className='logoutButton'> Logout</button>
        </div >
    )
}

export default User;