import React from "react";
import '../../App.css'
import './champs.css';
import CreateChamp from "../crud/CreateChamp";
import ReadChamp from "../crud/ReadChamp";
import DeleteChamp from "../crud/DeleteChamp";

// Champion Page
export default function Champs()
{

    return (
        <div className='champs'>
            <h1 className='search'>CRUD Champion Info</h1>
            <ReadChamp />
            <CreateChamp />
            <DeleteChamp />
        </div>
    );
}