import React from "react";
import '../../App.css'
import MatchAgainst from "../adv_query/MatchAgainst";
import MatchRecom from "../adv_query/MatchRecom";

// Matchup Page
export default function MatchUp()
{
    return (<div className='champs'>
        <MatchAgainst />
        <MatchRecom />
    </div>
    )
}