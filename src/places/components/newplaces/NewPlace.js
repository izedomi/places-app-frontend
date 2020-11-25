import React from 'react';
import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../../utils/validators'

import LoadingSpinner from '../../../shared/components/UIElement/LoadingSpinnier/LoadingSpinner'
import ErrorModal from '../../../shared/components/UIElement/ErrorModal/ErrorModal'

import useForm from '../../../shared/hooks/form-hooks';
import {useHttpClient} from '../../../shared/hooks/http-hook';


import './NewPlace.css';


const NewPlaces = (props) => {

    let {isLoading, error, sendRequest, cancelError} = useHttpClient();

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

    const addNewPlace = async (event) => {

        event.preventDefault();
        console.log("adding new place...")

        const url = "http://localhost:5000/api/places";

        const data = JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.description.email.value,
            address: formState.inputs.address.value,
            creator_id: 'yt'
        });

        const headers = {"Content-Type" : "application/json"}

        const response = await sendRequest(url, "POST", data, headers)
        if(response.status)
            console.log("New place added successfully")


    }

    return (
        <React.Fragment>
        {error && <ErrorModal error={error} onClear={cancelError}/>}
         {isLoading && <LoadingSpinner asOverlay/>}

        <form onSubmit={addNewPlace} className="place-form">
        <Input element='input' 
        id="title"
        label="Title" 
        type="text"  
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Place enter a valid title"
        onInput={onInputChangeHandler}
        />

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

        <Button disabled={!formState.isValid} type="submit">ADD PLACE</Button>
    </form>
    </React.Fragment>
    )
   
}

export default NewPlaces;