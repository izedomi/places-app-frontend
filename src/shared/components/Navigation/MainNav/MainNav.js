import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Backdrop from '../../UIElement/Backdrop/Backdrop';

import MainHeader from '../MainHeader/MainHeader';
import NavLink from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';

import './MainNav.css';

const MainNav = props => {

    let [isDrawerOpen, setDrawerState] = useState(false);

    function changeDrawerOpenState(state) {
        setDrawerState(state);
    }

    return (
        <React.Fragment>
            {isDrawerOpen && <Backdrop onClick={() => changeDrawerOpenState(false)} />}
            <SideDrawer show={isDrawerOpen} onClick={() => changeDrawerOpenState(false)}>
                <nav className="main-navigation__drawer-nav">
                    <NavLink/>
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={() => changeDrawerOpenState(true)}>
                <span/>
                <span/>
                <span/>
                </button>
                
                <h1 className="main-navigation__title">
                    <Link to="/">Places-App</Link>
                </h1>
            
                <nav className="main-navigation__header-nav">
                    <NavLink/>
                </nav>
            </MainHeader>
        </React.Fragment> 
    );
}

export default MainNav;