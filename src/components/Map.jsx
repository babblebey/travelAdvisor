import GoogleMapReact from 'google-map-react';

const Map = ({ coordinates, setCoordinates, setBounds }) => {
    return ( 
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAudtMSjQlxXLTRO3mGKvIKP5Vy3OqSFSg' }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50,50,50,50]}
            options={''}
            onChange={(e) => {
                console.log(e);
                setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
            }}
            onChildClick={() => {}}
        >

        </GoogleMapReact>
     );
}
 
export default Map;