
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

import {useHttpClient} from '../../shared/hooks/http-hook'

import PlaceList from '../components/userplaces/placeList/PlaceList';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinnier/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElement/ErrorModal/ErrorModal'


const UserPlaces = props => {

    let userId = useParams().uid;

    let {isLoading, error, sendRequest, cancelError} = useHttpClient();
    let [userPlaces, setUserPlaces] = useState();

    
    useEffect(() => {

        const fetchUserPlaces = async () => {

            const response = await sendRequest("http://localhost:5000/api/places/user/"+userId)
            console.log(response)
            if(response.status)
               setUserPlaces(response.data)
        }

        fetchUserPlaces();

    }, [sendRequest, userId]);


    const onDeletePlace = (deletedPlaceId) => {
        
        setUserPlaces(
            userPlaces.filter((place) => {
                return place._id !== deletedPlaceId
            })
        );
    }

  
    return (

        <React.Fragment>
            <ErrorModal error={error} onClear={cancelError}/>

            {isLoading && <div className="center"><LoadingSpinner/></div>}

            {!isLoading && userPlaces && <PlaceList items={userPlaces} onDelete={onDeletePlace}/> }
        </React.Fragment>
    )
}




export default UserPlaces;
