
import React, {useState, useContext} from 'react';
import Card from '../../../../shared/components/UIElement/Card/Card';
import Button from '../../../../shared/components/FormElements/Button/Button';
import Modal from '../../../../shared/components/UIElement/Modal/Modal';
import Map from '../../../../shared/components/UIElement/Map/Map';
import {AuthContext} from '../../../../shared/context/auth-context'

import './PlaceItem.css';


const PlaceItem = props => {

    const authContext = useContext(AuthContext)
    
    const [showMap, setShowMap] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const showCloseMapHandler = function(){console.log(showMap);setShowMap(false); console.log(showMap)}

    const showOpenMapHandler =  function(){console.log(showMap);setShowMap(true); console.log(showMap)}
    
    const openDeleteModalHandler = () => {
        console.log(showDeleteModal);
        setShowDeleteModal(true)
    }
    const closeDeleteModalHandler = (state) => {
        console.log(showDeleteModal);
        setShowDeleteModal(false)
    }

    const confirmDelete = () => {
        console.log("deleting...");
    }
    
    let place = props.place;

    return (
        
        <React.Fragment> 
            <Modal
            show={showMap} 
            onCancel={showCloseMapHandler}
            contentClass="place-item__modal-content"
            header={place.address}
            footerClass="place-item__modal-actions"
            footer={<Button onClick={showCloseMapHandler} >CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={place.location} zoom={10} />
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
                        <img src={place.imageUrl} alt={place.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{place.title}</h2>
                        <h3>{place.address}</h3>
                        <p>{place.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={showOpenMapHandler}>VIEW ON MAP</Button>
                        {authContext.isLoggedIn && <Button to={'/places/'+place.id}>EDIT</Button>}
                        {authContext.isLoggedIn && <Button danger onClick={openDeleteModalHandler}>DELETE</Button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )


}



export default PlaceItem;
