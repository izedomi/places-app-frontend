import React from 'react';
import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../../utils/validators'

import useForm from '../../../shared/hooks/form-hooks';


import './NewPlace.css';


const NewPlaces = (props) => {

    
    const [formState, onInputChangeHandler] = useForm({
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        false
    );


    return <form className="place-form">
        <Input element='input' 
        id="title"
        label="Title" 
        type="text"  
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Place enter a valid title"
        onInput={onInputChangeHandler}/>

        <Input 
        id="description"
        label="Title" 
        type="text"  
        validators={[VALIDATOR_MINLENGTH(5)]} 
        errorText="Place enter a valid description(atleast 5 characters)"
        onInput={onInputChangeHandler}
       />

        <Input element='input' 
        id="address"
        label="Address" 
        type="text"  
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Place enter an address"
        onInput={onInputChangeHandler}
       />
        
        
        <Button type="submit" disabled={!formState.isValid}> ADD PLACE {console.log("form state: " + formState.isValid)}</Button>
    </form>
}

export default NewPlaces;