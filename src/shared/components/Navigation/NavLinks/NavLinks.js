import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';

import {AuthContext} from '../../../context/auth-context'

import './NavLinks.css';


export default props => {

    const authContext = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact> ALL USERS</NavLink>
            </li>
            {authContext.isLoggedIn && <li>
                <NavLink to="/u1/places"> MY PLACES</NavLink>
            </li>}
            {authContext.isLoggedIn && <li>
                <NavLink to="/places/new"> ADD PLACE</NavLink>
            </li>}
            {!authContext.isLoggedIn && <li>
                <NavLink to="/auth"> LOGIN </NavLink>
            </li>}
            {authContext.isLoggedIn && <li>
                <NavLink to="/"> LOG OUT </NavLink>
            </li>}
        </ul>
    )

}


