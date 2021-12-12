import React from 'react';
import './Navbar.scss'
import tasks from '../../images/Tasks.png'

const Navbar = () => {
    return (
        <div className='wrapper_navbar'>
            <img src={tasks}/>
        </div>
    );
};

export default Navbar;