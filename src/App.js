import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'


import {useState, useCallback} from 'react';


import MainNav from './shared/components/Navigation/MainNav/MainNav';
import Users from './users/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import Auth from './auth/pages/Auth';
import Card from './shared/components/UIElement/Card/Card';

import {AuthContext} from './shared/context/auth-context';
import {MAP_API_KEY} from './utils/api_key';


import './App.css';

let mapApiKey = null;

function addScriptTag(){
    
    mapApiKey = MAP_API_KEY();

    var tag = document.createElement('script');
    tag.src = "https://maps.googleapis.com/maps/api/js?key="+mapApiKey;
    tag.onload = function () {
    // callback();
        console.log("inserted successfully")
    };

    (document.head || document.documentElement).appendChild(tag);
  
}

function App() {
 
  addScriptTag()
  
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
      setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
      setIsLoggedIn(false)
  }, [])

  let routes;
  if(!mapApiKey){
        routes = (
            <div className="center">
                <Card>
                    <h3> Google Map Api Key Not Found! <br/><br/> Set key @ "utils/apk_key.js"</h3>
                    <br/>
                    <small> If "utils/api_key.js" not found, rename "utils/api_key_test.js" to "utils
                        /api_key.js" and enter your google map api key
                    </small>
                </Card>
            </div>
        )
  }
  else if(isLoggedIn){
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
