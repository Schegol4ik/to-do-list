import React from 'react';
import './Header.scss'
import logo from '../../images/logo.png'
import avatar from '../../images/avatar.png'
import arrow from '../../images/arrow.png'

const Header = () => {
    return (
        <div className='wrapper__header'>
            <div className='logo__header'>
                <div className='about__app'>
                    <img src={logo}/>
                    <span>To-Do</span>
                </div>
                <h4>Tasks</h4>
            </div>
            <div className='about__header'>
                <span>Ilyinchik Artyom</span>
                <img src={avatar}/>
                <img src={arrow}/>
            </div>
        </div>
    );
};

export default Header;