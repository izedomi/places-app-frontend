import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../../utils/validators'

import LoadingSpinner from '../../../shared/components/UIElement/LoadingSpinnier/LoadingSpinner'
import ErrorModal from '../../../shared/components/UIElement/ErrorModal/ErrorModal'

import useForm from '../../../shared/hooks/form-hooks';
import {AuthContext} from '../../../shared/context/auth-context'
import {useHttpClient} from '../../../shared/hooks/http-hook';


import './NewPlace.css';


const NewPlaces = (props) => {

    const history = useHistory();
    let {isLoading, error, sendRequest, cancelError} = useHttpClient();
    let authContext = useContext(AuthContext);

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
        console.log(authContext.userId);

        const url = "http://localhost:5000/api/places";

        const data = JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
            creator_id: authContext.userId
        });

        const headers = {"Content-Type" : "application/json"}

        const response = await sendRequest(url, "POST", data, headers)
        if(response.status)
            history.push('/')
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
            label="Description" 
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