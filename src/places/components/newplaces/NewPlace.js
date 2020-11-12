import React from 'react';
import Input from '../../../shared/components/FormElements/Input/Input'
import {VALIDATOR_REQUIRE} from '../../../utils/validators'

import './NewPlace.css';

const NewPlaces = (props) => {

    return <form className="place-form">
        <Input element='input' 
        label="Title" 
        type="text"  
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Place enter a valid input"/>
        <Input label="Description" type="text" />
    </form>
}

export default NewPlaces;