import React, {useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {useHttpClient} from '../../../shared/hooks/http-hook'
import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import Card from '../../../shared/components/UIElement/Card/Card'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../../utils/validators'
import {AuthContext} from '../../../shared/context/auth-context';

import useForm from '../../../shared/hooks/form-hooks';
import LoadingSpinner from '../../../shared/components/UIElement/LoadingSpinnier/LoadingSpinner'
import ErrorModal from '../../../shared/components/UIElement/ErrorModal/ErrorModal'


import './UpdatePlace.css';


const UpdatePlace = (props) => {

    const history = useHistory();
    const authContext = useContext(AuthContext);
    const placeId = useParams().placeId;

    let {isLoading, error, sendRequest, cancelError} = useHttpClient();
    let [indentifiedPlace, setIndentifiedPlace] = useState();


    const [formState, onInputChangeHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        
    },
    false
    );


    useEffect(() => {

        const fetchUserPlaces = async () => {

            const response = await sendRequest("http://localhost:5000/api/places/"+placeId)
            console.log(response)
            if(response.status){
                //console.log(response.data);
                setIndentifiedPlace(response.data)
               /* setFormData({
                        title: {
                            value: indentifiedPlace.title,
                            isValid: true
                        },
                        description: {
                            value: indentifiedPlace.description,
                            isValid: true
                        }
                    }, true)
                */
                
            }
              
        }

        fetchUserPlaces();

    }, [sendRequest, setFormData, placeId]);

    if(isLoading){
        return isLoading && <div className="center"><LoadingSpinner/></div>
    }

    if(!indentifiedPlace && !error){
        return <div className="center">
            <Card>
                <p> Couldn't find a place</p>
                <Button to="/places/new"> New Place</Button>
            </Card>
           
        </div>
    }


    const placeUpdateHandler = async (event) => {

        event.preventDefault();
        console.log("updating place...")
        
        const url = "http://localhost:5000/api/places/"+placeId
        console.log(url);
        console.log(formState.inputs.title.value)
        console.log(formState.inputs.description.value)

        const data = JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
        });

        const headers = {"Content-Type" : "application/json"}

        const response = await sendRequest(url, "PATCH", data, headers)
        //console.log(response.data);
        if(response.status)
            history.push("/"+authContext.userId+"/places")
    }


    return (

        <React.Fragment>

            <ErrorModal error={error} onClear={cancelError}/>

            {!isLoading && indentifiedPlace && <form className="place-form">
            <Input element='input' 
            id="title"
            label="Title" 
            type="text"  
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Place enter a valid title"
            onInput={onInputChangeHandler}
            value={indentifiedPlace.title}
            valid={true}/>

            <Input 
            id="description"
            label="Description" 
            validators={[VALIDATOR_MINLENGTH(5)]} 
            errorText="Place enter a valid description(atleast 5 characters)"
            onInput={onInputChangeHandler}
            value={indentifiedPlace.description}
            valid={true}
            />
        
            <Button type="button" disabled={!formState.isValid} onClick={placeUpdateHandler}> UPDATE PLACE </Button>
            </form>}
        </React.Fragment>
    )
}

export default UpdatePlace;