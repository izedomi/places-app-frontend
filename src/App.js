import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'


import MainNav from './shared/components/Navigation/MainNav/MainNav';
import Users from './users/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import UserPlaces from './places/pages/UserPlaces';



import './App.css';


function App() {
  return (
    <Router>
        <MainNav />
        <main>
            <Switch>
              
                <Route path="/" exact>
                    <Users/>
                </Route>

                <Route path="/places/new" exact>
                    <NewPlaces/>
                </Route>

                <Route path="/:uid/places" exact>
                    <UserPlaces />
                </Route>
                
                <Redirect to="/"/>

            </Switch>
        </main>
    </Router>
   
  );
}

export default App;
