import React from 'react';
import Card from '../../../../shared/components/UIElement/Card/Card';
import Button from '../../../../shared/components/FormElements/Button/Button'

import PlaceItem from '../placeItem/PlaceItem';


import './PlaceList.css';



const PlaceList = (props) => {

    if(props.items.length === 0){

        return (
        
            <div className="place-list center">
                <Card>
                    <h2>No Places found</h2>
                    <Button to="/places/new">Add A Place</Button>
                    <button>Add A Place</button>
                </Card>
            </div>
        );
    }

    return (
        <ul className='place-list'>
            {props.items.map(place => <PlaceItem key={place.id} place={place} />)}
        </ul>
    )
     
 
}

export default PlaceList;