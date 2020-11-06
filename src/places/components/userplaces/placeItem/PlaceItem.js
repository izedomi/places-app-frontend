
import React, {useState} from 'react';
import Card from '../../../../shared/components/UIElement/Card/Card';
import Button from '../../../../shared/components/FormElements/Button/Button';
import Modal from '../../../../shared/components/UIElement/Modal/Modal';
import Map from '../../../../shared/components/UIElement/Map/Map';

import './PlaceItem.css';


const PlaceItem = props => {

    const [showMap, setShowMap] = useState(false);

    const showCloseMapHandler = function(){console.log(showMap);setShowMap(false); console.log(showMap)}

    const showOpenMapHandler =  function(){console.log(showMap);setShowMap(true); console.log(showMap)}


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
                        <Button to={'/places/'+place.id}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )


}



export default PlaceItem;
