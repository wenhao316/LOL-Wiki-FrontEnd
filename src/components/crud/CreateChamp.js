import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './ChampForm.css'

const defaultData = {
    Champion_ID: null,
    Name: null,
    Class: null,
    Resource: null,
    Range_Type: null,
    Region: null,
    Adaptive_Type: null,
    Background_Story: null,
    Image_Url: null
}

function CreateChamp({ data = defaultData, onButtonClick })
{
    let a = 'http://bcfb-206-221-147-133.ngrok.io'
    const [name, setName] = useState(data.Name);
    const [imageUrl, setImageUrl] = useState(data.Image_Url);
    const [champion_Id, setChampion_Id] = useState(data.Champion_ID);
    const [champ_Class, setChamp_Class] = useState(data.Class);
    const [resource, setResource] = useState(data.Resource);
    const [range_type, setRangeType] = useState(data.Range_Type);
    const [region, setRegion] = useState(data.Region);
    const [adaptive_type, setAdaptiveType] = useState(data.Adaptive_Type);
    const [backgroun_Story, setStory] = useState(data.Background_Story);

    const nameChangeHandler = (event) =>
    {
        setName(event.target.value);
    };

    const classChangeHandler = (event) =>
    {
        setChamp_Class(event.target.value);
    };

    const resrouceChangeHandler = (event) =>
    {
        setResource(event.target.value);
    };

    const rangeTypeChangeHandler = (event) =>
    {
        setRangeType(event.target.value);
    };

    const regionChangeHandler = (event) =>
    {
        setRegion(event.target.value);
    };

    const adaptiveTypeChangeHandler = (event) =>
    {
        setAdaptiveType(event.target.value);
    };

    const storyChangeHandler = (event) =>
    {
        setStory(event.target.value);
    };

    const imageUrlChangeHandler = (event) =>
    {
        setImageUrl(event.target.value);
    };

    const idChangeHandler = (event) =>
    {
        setChampion_Id(event.target.value);
    };

    const handleCreateClick = () =>
    {
        const newData = {
            Name: `'${name}'`,
            Class: `'${champ_Class}'`,
            Resource: `'${resource}'`,
            Range_Type: `'${range_type}'`,
            Region: `'${region}'`,
            Adaptive_Type: `'${adaptive_type}'`,
            Background_Story: `'${backgroun_Story}'`,
            Image_Url: `'${imageUrl}'`
        }
        axios
            .post(a + `/champion?id=${champion_Id}`, newData)
            .then((res) =>
            {
                console.log(res)
            })
            .catch((error) =>
            {
                console.log(error)
            })
    };

    const handlePutClick = () =>
    {
        const newData = {
            Name: `'${name}'`,
            Class: `'${champ_Class}'`,
            Resource: `'${resource}'`,
            Range_Type: `'${range_type}'`,
            Region: `'${region}'`,
            Adaptive_Type: `'${adaptive_type}'`,
            Background_Story: `'${backgroun_Story}'`,
            Image_Url: `'${imageUrl}'`
        }
        axios
            .put(a + `/champion?id=${champion_Id}`, newData)
            .then((res) =>
            {
                console.log(res)
            })
            .catch((error) =>
            {
                console.log(error)
            })
    };



    return (
        <div className='champForm'>
            <div>
                <div> Champion ID
                    <input
                        type="text"
                        value={champion_Id}
                        onChange={idChangeHandler}
                    /></div>
                <div> Name
                    <input
                        type="text"
                        value={name}
                        onChange={nameChangeHandler}
                    /></div>
                <div> Class
                    <input
                        type="text"
                        value={champ_Class}
                        onChange={classChangeHandler}
                    /></div>
                <div> Resource
                    <input
                        type="text"
                        value={resource}
                        onChange={resrouceChangeHandler}
                    /></div>
                <div> Range Type
                    <input
                        type="text"
                        value={range_type}
                        onChange={rangeTypeChangeHandler}
                    /></div>
                <div> Region
                    <input
                        type="text"
                        value={region}
                        onChange={regionChangeHandler}
                    /></div>
                <div> Adaptive Type
                    <input
                        type="text"
                        value={adaptive_type}
                        onChange={adaptiveTypeChangeHandler}
                    /></div>
                <div> Background Story
                    <input
                        type="text"
                        value={backgroun_Story}
                        onChange={storyChangeHandler}
                    /></div>
                <div> Image URL
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={imageUrlChangeHandler}
                    /></div>
            </div>
            <button onClick={handleCreateClick}>Create</button>
            <button onClick={handlePutClick}>Update</button>
        </div>

    )
}

export default CreateChamp
