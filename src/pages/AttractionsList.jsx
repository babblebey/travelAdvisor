import { useContext, useEffect, useState } from "react";
import { getPlacesByLatLng } from "../api";
import { Footer, Navbar } from "../components";
import { MainContext } from "../context/MainContext";
import ReactStarsRating from 'react-awesome-stars-rating'
import { AttractionsListLoader } from "../components/loaders";
import axios from "axios";
import { Link } from "react-router-dom";

const AttractionsList = () => {
    const { coordinates, isLoading, setIsLoading } = useContext(MainContext);
    const [attractions, setAttractions] = useState();

    // Effect to fetch list of places for component from the getPlacesByLatLng endpoint and effect is reran on change of coordinates 
    useEffect(() => {
        let source = axios.CancelToken.source();

        // Loading state is set to true while data is being fetched from endpoint
        setIsLoading(true)

        // Calling on the getPlacesByLatLng endpoint passing in the 'attraction' as place type, coordinates (longitude and latitude), a limit parameter and source for error handling
        getPlacesByLatLng('attractions', coordinates.lat, coordinates.lng, { limit: 30 }, source)
            .then(data => {
                // Data is received and set to 'attractions' state list filtering out items with zero reviews, items with id '0' and items with no 'name' property  
                setAttractions(data.filter(item => item.num_reviews != 0 && item.location_id != 0 && item.name))
                
                // Setting loading state back to false to stop loading
                setIsLoading(false);
            })

        // Effect Cleanup
        return () => {
            source.cancel();
        }
    }, [coordinates])

    return ( 
        <>
            {/* Navbar with Border */}
            <Navbar border />
            {/* --- */}

            <div className="container mx-auto pb-4">
                <div className="text-center my-10">
                    <h1 className="font-semibold text-lg md:text-3xl">
                        Attractions near you
                    </h1>
                </div>

                {/* Attractions Listing */}
                { !attractions || isLoading ? (
                    // Displays a loading if 'attractions' has no data in state or data fetching is in loading state
                    <AttractionsListLoader />
                ) : (
                    <>
                        {/* Renders Section If 'attractions' list is ready or data fetching is not in loading state */}
                        <div className="block md:grid md:grid-cols-12 md:px-4 my-2 gap-3">
                            {/* Mapping through list of attractions object  */}
                            { attractions?.map((attraction, i) => (
                                <div key={i} className="md:col-span-6 lg:col-span-4 mb-4">
                                    <div className="w-full h-[250px] md:h-[400px] object-cover">
                                        {/* Link that routes to the placeDetails route with the current attraction 'location_id' passed into the url parameter */}
                                        <Link to={`/attractions/${attraction?.location_id}`}>
                                            {/* Attraction Image - display if Image is found in result object, else a default image is displayed as fallback */}
                                            <img src={ attraction?.photo ? attraction?.photo?.images?.large?.url : 'https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg'} alt="" 
                                                className=" w-full h-full object-cover curso-pointer"
                                            />
                                            {/* --- */}
                                        </Link>
                                        {/* --- */}
                                    </div>
                                    <div className="px-4 md:px-0 py-2 space-y-1">
                                        {/* Attraction Name */}
                                        <h2 className="font-semibold md:text-lg">
                                            { attraction?.name }
                                        </h2>
                                        {/* --- */}

                                        <p className="flex items-center text-xs">
                                            {/* Attraction Rating with 'rating' property passed to generate a React Stars Rating element - displays only if found in result object  */}
                                            <span className="flex items-center mr-1">
                                                <ReactStarsRating 
                                                    value={Number(attraction?.rating)} 
                                                    size={18} 
                                                    className="flex mr-2"
                                                    isEdit={false} 
                                                    primaryColor="#00afef" 
                                                    secondaryColor="#e5e7eb" 
                                                />
                                            </span>
                                            {/* --- */}

                                            {/* Attraction Revies Count */}
                                            { attraction?.num_reviews } Reviews
                                            {/* --- */}
                                        </p>
                                        <p className="text-sm">
                                            {/* Mapping thought Attraction Subtype List  */}
                                            { attraction?.subtype.map((type, i) => (
                                                <span key={i}>
                                                    { type.name }
                                                </span>
                                            )) }
                                            {/* --- */}
                                        </p>
                                    </div>
                                </div>
                            )) }
                            {/* --- */}
                        </div>
                        {/* --- */}
                    </>
                )}
                {/* --- */}
            </div>

            {/* Footer Component */}
            <Footer />
            {/* --- */}
        </>
     );
}
 
export default AttractionsList;