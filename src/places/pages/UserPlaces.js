
import React from 'react';
import {useParams} from 'react-router-dom'
import PlaceList from '../components/userplaces/placeList/PlaceList';

const DUMMY_PLACES = [
    {
       id: 'p1',
       title: "Empire State",
       description: 'One of the tallest',
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
        title: "Empire State Building!!!",
        description: 'One of the tallest building in the world!!!',
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



const UserPlaces = props => {

     let userId = useParams().uid;
    // console.log(userId)

    let userPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    return <PlaceList items={userPlaces}/>
}




export default UserPlaces;
