import React from 'react';
import './MyButton.scss'

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className='myBtn'>
            {children}
        </button>
    );
};


export default MyButton;