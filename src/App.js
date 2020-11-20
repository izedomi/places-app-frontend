import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'


import {useState, useCallback} from 'react';

import MainNav from './shared/components/Navigation/MainNav/MainNav';
import Users from './users/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import Auth from './auth/pages/Auth'

import {AuthContext} from './shared/context/auth-context'



import './App.css';


function App() {


  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
      setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
      setIsLoggedIn(false)
  }, [])

  let routes;
  if(isLoggedIn){
        routes = (
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
                
                <Route path="/places/:placeId" exact>
                    <UpdatePlace/>
                </Route>

                <Redirect to="/"/>
            </Switch>
        );
  }
  else{
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users/>
                </Route>

                <Route path="/:uid/places" exact>
                    <UserPlaces />
                </Route>

                <Route path="/auth" exact>
                    <Auth />
                </Route>
                
                <Redirect to="/auth"/>
            </Switch>
        );
  }


  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
    <Router>
        <MainNav />
        <main>
           {routes}
        </main>
    </Router>
    </AuthContext.Provider>
   
  );
}

export default App;
