
import React, {useState, useContext} from 'react';
import Card from '../../../../shared/components/UIElement/Card/Card';
import Button from '../../../../shared/components/FormElements/Button/Button';
import Modal from '../../../../shared/components/UIElement/Modal/Modal';
import Map from '../../../../shared/components/UIElement/Map/Map';
import {AuthContext} from '../../../../shared/context/auth-context'
import {useHttpClient} from '../../../../shared/hooks/http-hook'

import LoadingSpinner from '../../../../shared/components/UIElement/LoadingSpinnier/LoadingSpinner'
import ErrorModal from '../../../../shared/components/UIElement/ErrorModal/ErrorModal'


import './PlaceItem.css';


const PlaceItem = props => {

    const authContext = useContext(AuthContext)
   
    const [showMap, setShowMap] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const showCloseMapHandler = function(){setShowMap(false);}
    const showOpenMapHandler =  function(){setShowMap(true);}

    let {isLoading, error, sendRequest, cancelError} = useHttpClient();

   // const showCloseMapHandler = () => setShowMap(false);
  //  const showOpenMapHandler =  () => setShowMap(true);

    const openDeleteModalHandler = () => {
        console.log(showDeleteModal);
        setShowDeleteModal(true)
    }
    const closeDeleteModalHandler = (state) => {
        console.log(showDeleteModal);
        setShowDeleteModal(false)
    }

    const confirmDelete = async() => {
        
        setShowDeleteModal(false)
        console.log("deleting...");
        const url = "http://localhost:5000/api/places/"+props.place._id;

        const response = await sendRequest(url, "DELETE");

        if(response.status)
            console.log("Deleted successfully")
            props.onDelete(props.place._id);
        
    }
    
    let place = props.place;

    if(isLoading){
        return isLoading && <div className="center"><LoadingSpinner/></div>
    }

    return (
        
        <React.Fragment> 

           <ErrorModal error={error} onClear={cancelError}/>


           <Modal
            show={showMap} 
            onCancel={showCloseMapHandler}
            contentClass="place-item__modal-content"
            header={place.address}
            footerClass="place-item__modal-actions"
            footer={<Button onClick={showCloseMapHandler} >CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={place.location} zoom={17} />
                </div>
            </Modal>

            <Modal
            show={showDeleteModal}
            header="Are you sure?"
            footerClass="place-item__modal-actions"
            footer={
                <React.Fragment>
                    <Button onClick={closeDeleteModalHandler} >CANCEL</Button>
                    <Button onClick={confirmDelete} >YES</Button>
                </React.Fragment>
            }>
             <p>You won't be able to revert after this action have been taken.</p>
            </Modal>
            
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={`http://localhost:5000/${place.image}`} alt={place.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{place.title}</h2>
                        <h3>{place.address}</h3>
                        <p>{place.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={showOpenMapHandler}>VIEW ON MAP</Button>
                        {authContext.userId === place.creator_id && <Button to={'/places/'+place._id}>EDIT</Button>}
                        {authContext.userId === place.creator_id && <Button danger onClick={openDeleteModalHandler}>DELETE</Button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )


}



export default PlaceItem;
