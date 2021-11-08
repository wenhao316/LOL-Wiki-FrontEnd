import React from "react";
import '../App.css'
import { Button } from "./Button";
import './Champion.css';

// Home Page Button & Layout
function Champion()
{
    return (
        <div className='champion-container'>
            <video src='/videos/toPlay.mp4' autoPlay loop muted />
            <h1>Champion Lookup</h1>
            <p>What are you waiting for</p>
            <div className="champion-btns">
                <Button className='btns'
                    buttonStyle='btn--outline'
                    buttonSize='btn--large'>
                    GET STARTED
                </Button>
                <Button className='btns'
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'>
                    WATCH TRAILER <i className='far fa-play-circle' />
                </Button>
            </div>
        </div >
    )
}

export default Champion