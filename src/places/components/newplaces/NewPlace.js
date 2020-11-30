import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import ImageUpload from '../../../shared/components/FormElements/ImageUpload/ImageUpload'
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
            },
            image: {
                value: null,
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

        let formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('address', formState.inputs.address.value)
        formData.append('image', formState.inputs.image.value)


        const headers = {'authorization' : 'Bearer '+ authContext.token}

        const response = await sendRequest(url, "POST", formData, headers)
        if(response.status)
            history.push('/')
    }

    return (
        <React.Fragment>
        {error && <ErrorModal error={error} onClear={cancelError}/>}
        
        <form onSubmit={addNewPlace} className="place-form">
        {isLoading && <LoadingSpinner asOverlay/>}
        <Input element='input' 
            id="title"
            label="Title" 
            type="text"  
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Place enter a valid title"
            onInput={onInputChangeHandler}
        />

        <ImageUpload id='image' onInput={onInputChangeHandler}/>

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