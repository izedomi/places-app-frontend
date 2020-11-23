import React, {useState, useContext} from 'react';
import useForm from '../../shared/hooks/form-hooks'

import {AuthContext} from '../../shared/context/auth-context'
import Input from '../../shared/components/FormElements/Input/Input'
import Button from '../../shared/components/FormElements/Button/Button'
import Card from '../../shared/components/UIElement/Card/Card'
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinnier/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElement/ErrorModal/ErrorModal'
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from '../../utils/validators'


import './Auth.css'

    const Authenticate = () => {

        const authContext = useContext(AuthContext);

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
        let [isLoading, setIsLoading] = useState(false);
        let [error, setError] = useState()

        const setAuthModeHandler = function(){
            
           console.log("changed mode");
            
           if(!isLogin){
                
                setFormData({
                    ...formState.inputs,
                    name: undefined
                })
            }
            else{
                setFormData({
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    },
                }, false)
            }
            
             
           setAuthMode(isLogin = !isLogin)
            //return;
        }



        const authSubmitHandler = async event => {

            event.preventDefault();
            setIsLoading(true);
            var responseData;
            var url;
            var data;
            
            try{
                if(isLogin){
                    
                    console.log("logging in...")

                    data = JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    });

                    url = "http://localhost:5000/api/users/login";
                }
                else{

                    console.log("signing up...")

                    data = JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    });

                    url = "http://localhost:5000/api/users/signup";  
                }

                const response = await fetch(url, {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: data
                });

                responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message);
                }

                setIsLoading(false)
                authContext.login();

            }
            catch(e){

                setIsLoading(false)
                setError(e.message || "Something went wrong. Please try again!");
                console.log(error);
            }
           
            
        }

        const removeErrorModal = () => {
            setError(null);
        }

        return (

            <React.Fragment>

            {error && <ErrorModal error={error} onClear={removeErrorModal}/>}
                    
            <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
                <form>
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

