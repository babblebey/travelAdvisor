import GoogleMapReact from 'google-map-react';
import ReactStarsRating from 'react-awesome-stars-rating';

// Map Component with its props destructured
const Map = ({ places, coordinates, setCoordinates, setBounds }) => {
    return ( 
        <GoogleMapReact
            bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAP_API_KEY }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50,50,50,50]}
            options={''}
            onChange={(e) => {
                // console.log(e);
                // onChange Event sets new Coordinates for Google Map Component
                setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                // onChange Event sets new Bounds for Google Map Component
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
            }}
            onChildClick={() => {}}
        >
            {places?.map((place, i) => (
                <div key={i}
                    className="hover:z-30 relative cursor-pointer"
                    lat={Number(place?.latitude)}
                    lng={Number(place?.longitude)}
                >
                    <div className="hidden md:block font-semibold p-1 shadow-md hover:shadow-2xl hover:border-2 hover:border-gray-300 text-center w-fit transition ease-in duration-1000 rounded-sm overflow-hidden bg-white">
                        {/* Place Name */}
                        <p>{ place?.name }</p>
                        {/* --- */}

                        {/* Place Photo - Display only if Photo is found in object */}
                        { place?.photo && <img src={place?.photo?.images?.small?.url} className="w-20 h-full object-cover" /> }
                        {/* --- */}

                        {/* Place Rating with 'place.rating' value passed to generate a React Stars Rating element */}
                        <ReactStarsRating 
                            value={place?.rating} 
                            className="flex w-fit m-auto" size={10} 
                            isEdit={false} 
                            primaryColor="#00afef" 
                            secondaryColor="#e5e7eb" 
                        />
                        {/* --- */}
                    </div>

                    {/* Place Item Displayed on map */}
                    <div className="group md:hidden">
                        <svg className="text-cyan-500 h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div className="hidden group-hover:block font-semibold p-1 shadow-md text-center w-fit rounded-sm overflow-hidden bg-white">
                            {/* Place Name */}
                            <p>{ place?.name }</p>
                            {/* --- */}

                            {/* Place Photo - Display only if Photo is found in object */}
                            { place?.photo && <img src={place?.photo?.images?.small?.url} className="w-full h-full object-cover" /> }
                            {/* --- */}
                        </div>
                    </div>
                    {/* --- */}
                </div>
            ))}
        </GoogleMapReact>
     );
}
 
export default Map;