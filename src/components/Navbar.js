import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';


// Navigation Bar
function Navbar({user})
{
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () =>  
    {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() =>
    {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        LOL Wiki
                        <i className='fas fa-ghost' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        {/* only display after login */}
                        {user.userID !== '-1' ? 
                            (
                                <li className='nav-item'>
                                    <Link
                                        to='/user'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        User
                                    </Link>
                                </li>
                            ) : 
                            (<></>)
                        }
                        <li className='nav-item'>
                            <Link
                                to={user.userID === '1' ? '/championUpdate' : '/championList'}
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Champion
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/matchup'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                MatchUp
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/register'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Register
                            </Link>
                        </li>

                        <li>
                            <Link
                                to='/sign-up'
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline'>SIGN IN</Button>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;