import React, {useRef} from 'react';

import './Map.css';


const Map = (props) => {

    const mapRef = useRef();

    let map;
    const uluru = { lat: -25.344, lng: 131.036 };


    map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    // The marker, positioned at Uluru
    new window.google.maps.Marker({
        position: uluru,
        map: map,
    });

    

    return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
}


export default Map;