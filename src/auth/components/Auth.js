import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {useHttpClient} from '../../shared/hooks/http-hook'
import useForm from '../../shared/hooks/form-hooks'

import {AuthContext} from '../../shared/context/auth-context'
import Input from '../../shared/components/FormElements/Input/Input'
import Button from '../../shared/components/FormElements/Button/Button'
import ImageUpload from '../../shared/components/FormElements/ImageUpload/ImageUpload'
import Card from '../../shared/components/UIElement/Card/Card'
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinnier/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElement/ErrorModal/ErrorModal'
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from '../../utils/validators'


import './Auth.css'


    const Authenticate = () => {

        const history = useHistory();
        const authContext = useContext(AuthContext);
        let {isLoading, error, sendRequest, cancelError} = useHttpClient();

        const [formState, onInputChangeHandler, setFormData] = useForm({
                email: {
                    value: '',
                    isValid: false
                },
                password: {
                    value: '',
                    isValid: false
                },
            
            },
            false
        );

        let [isLogin, setAuthMode] = useState(true);
       
        const setAuthModeHandler = function(){
            
           console.log("changed mode");
            
           if(!isLogin){
                setFormData({...formState.inputs, name: undefined, image: undefined})
            }
            else{
                setFormData({
                    ...formState.inputs,
                    name: {value: '', isValid: false},
                    image: {value: null, isValid: false}
                }, false)
            }
            
            setAuthMode(isLogin = !isLogin)
            //return;
        }



        const authSubmitHandler = async event => {

            event.preventDefault();
            var url;
            var data;
            var headers;
            
                if(isLogin){
                    
                    console.log("logging in...")

                    url = "http://localhost:5000/api/users/login";

                    data = JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    });

                    headers = {"Content-Type" : "application/json"};
                    
                }
                else{

                    console.log("signing up...")

                    url = "http://localhost:5000/api/users/signup";  

                   
                    data = new FormData();
                    data.append('name', formState.inputs.name.value);
                    data.append('email', formState.inputs.email.value);
                    data.append('password', formState.inputs.password.value);
                    data.append('image', formState.inputs.image.value)
                    
                    headers = {};
                }

                //const headers = {"Content-Type" : "application/json"}

                let response = await sendRequest(url, "POST", data, headers)

                if(response.status)
                    //console.log(response.data.user._id)
                    if(isLogin){ return authContext.login(response.data.user._id);}  
                    else{history.push("/login")}
                             
                   
        }

        
        return (

            <React.Fragment>

            {error && <ErrorModal error={error} onClear={cancelError}/>}
                    
            <Card className="authentication">
            
                <form>
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2> {isLogin ? "Login Required" : "Create An Account"}</h2>
                <hr/>
                {!isLogin && <Input element='input' 
                id="name"
                label="Name" 
                type="text"  
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid name"
                onInput={onInputChangeHandler}/>
                }

                {!isLogin && <ImageUpload 
                center 
                id='image'
                onInput={onInputChangeHandler}/>
                }

                <Input element='input' 
                id="email"
                label="Email" 
                type="email"  
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} 
                errorText="Please enter a valid email"
                onInput={onInputChangeHandler}/>

                <Input element='input' 
                id="password"
                label="Password" 
                type="password"  
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid password, atleast 3 characters long"
                onInput={onInputChangeHandler}
                />
                
                <Button type="submit" onClick={authSubmitHandler} disabled={!formState.isValid}> {isLogin ? "Login": "Signup"} {console.log("form state: " + formState.isValid)}</Button>
                <br/><br/>
                <Button type="button" inverse onClick={setAuthModeHandler}>{isLogin ? "Goto Signup": "Goto Login"}</Button>
            </form></Card>
            </React.Fragment>
        );
        
       

}



export default Authenticate;

