import React from "react";
import '../App.css'
import { Button } from "./Button";
import './champion.css';
import sample from '../images/res.mp4';

// Home Page Button & Layout
function Champion()
{
    return (
        <div className='champion-container'>
            {/* <video src='../images/res.mp4'
                autoPlay loop muted /> */}
            <video autoPlay loop muted>
                <source src={sample} type='video/mp4' />
            </video>
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
                    Sign In Here <i class="far fa-hand-point-left"></i>
                </Button>
            </div>
        </div >
    )
}

export default Champion;