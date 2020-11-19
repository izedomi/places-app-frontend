import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button'
import Card from '../../../shared/components/UIElement/Card/Card'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../../utils/validators'

import useForm from '../../../shared/hooks/form-hooks';


import './UpdatePlace.css';


const DUMMY_PLACES = [
    {
       id: 'p1',
       title: "Empire State Building",
       description: 'One of the tallest building in the world',
       imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
       address: '20 W 34t St, New York, NY 10001',
       creator: 'u1',
       location:  {
            lat: parseFloat('40.7484405'),
            lng: parseFloat('-73,9878584')
       }
    },
    {
        id: 'p2',
        title: "Empire State Building",
        description: 'One of the tallest building in the world',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34t St, New York, NY 10001',
        creator: 'u2',
        location: {
            lat: parseFloat('40.7484405'),
            lng: parseFloat('-73,9878584')
        }

     },
     {
        id: 'p3',
        title: "Empire State Building",
        description: 'One of the tallest building in the world',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34t St, New York, NY 10001',
        creator: 'u2',
        location:  {
            lat: parseFloat('40.7484405'),
            lng: parseFloat('-73,9878584')
        }

     }
];



const UpdatePlace = (props) => {

    const placeId = useParams().placeId;

    let [isLoading, setLoading] = useState(true);

   
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

    let indentifiedPlace = DUMMY_PLACES.find((place) => placeId === place.id);

    useEffect(() => {
        if(indentifiedPlace){
            setFormData({
                title: {
                    value: indentifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: indentifiedPlace.description,
                    isValid: true
                }
            }, true)
        }
       
        setLoading(false);
    
    }, [setFormData, indentifiedPlace])

    
    if(!indentifiedPlace){
        return <div className="center">
            <Card>
                <p> Couldn't find a place</p>
                <Button to="/places/new"> New Place</Button>
            </Card>
           
        </div>
    }

    if(isLoading){
        return (<div className="center">
            <h2> Loading...</h2>
        </div>);
    }


    function placeUpdateHandler(event){
        event.preventDefault();
        console.log(formState);
    }


    return !isLoading && <form className="place-form" onSubmit={placeUpdateHandler}>
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
        
        <Button type="submit" disabled={!formState.isValid}> UPDATE PLACE </Button>
    </form>
}

export default UpdatePlace;