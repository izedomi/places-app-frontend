import React, {useState, useContext} from 'react';
import useForm from '../../shared/hooks/form-hooks'

import {AuthContext} from '../../shared/context/auth-context'
import Input from '../../shared/components/FormElements/Input/Input'
import Button from '../../shared/components/FormElements/Button/Button'
import Card from '../../shared/components/UIElement/Card/Card'
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

        const setAuthModeHandler = () => {

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
        }

        const authSubmitHandler = event => {
            event.preventDefault();
            console.log(formState.inputs);
            authContext.login();
        }

        return <Card className="authentication"><form onSubmit={authSubmitHandler}>
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
            errorText="Please enter a valid password, atleast 5 characters long"
            onInput={onInputChangeHandler}
            />
            
            <Button type="submit" disabled={formState.isValid}> {isLogin ? "Login": "Signup"} {console.log("form state: " + formState.isValid)}</Button>
            <br/><br/>
            <Button inverse onClick={setAuthModeHandler}>{isLogin ? "Goto Signup": "Goto Login"}</Button>
        </form></Card>

}



export default Authenticate;

