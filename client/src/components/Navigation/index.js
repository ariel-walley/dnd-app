import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {

    return (
        <>
            <div className='navigation'>
                <NavLink exact to='/snapshot'>
                    <h4 className='links'>Snapshot</h4>
                </NavLink>
                <NavLink exact to='/gallery'>
                    <h4 className='links'>Gallery</h4>
                </NavLink>
                <NavLink exact to='/history'>History
                </NavLink>
                <NavLink exact to='/messenger'>
                    <h4 className='links'>Messenger</h4>
                </NavLink>
                <NavLink exact to='/history'>
                    <h4 className='links'>History</h4>
                </NavLink>
            </div>
        </>
    )

}
