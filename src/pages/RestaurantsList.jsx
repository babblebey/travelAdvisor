import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { Footer, Navbar } from "../components";
import { getPlacesByLatLng } from "../api";
import ReactStarsRating from 'react-awesome-stars-rating';
import { PlaceListLoader } from "../components/loaders";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import map from "../img/map.png";

const RestaurantsList = () => {
    const { coordinates, isLoading, setIsLoading, setType } = useContext(MainContext);
    const [restaurants, setRestaurants ] = useState();
    const history = useHistory();

    useEffect(() => {
        let source = axios.CancelToken.source();
        setIsLoading(true)
        getPlacesByLatLng('restaurants', coordinates.lat, coordinates.lng, { limit: 30, min_rating: 4 }, source)
            .then(data => {
                // console.log(data);
                setIsLoading(false);
                setRestaurants(data?.filter(restaurant => restaurant.name));
            })

        return () => {
            source.cancel()
        }
    }, [coordinates])

    return ( 
        <>
            <Navbar border />

            <div className="container mx-auto pb-4">
                <div className="text-center my-10">
                    <h1 className="font-semibold text-lg md:text-3xl">
                        Restaurants near you
                    </h1>
                </div>

                <div className="px-4 lg:grid lg:grid-cols-12 lg:gap-2">
                    {/* Map view */}
                    <div className="lg:col-span-3">
                        <div className="w-full border shadow mt-2 p-2">
                            <div className="relative">
                                <img src={map} alt="Map" className="w-full h-20 lg:h-full object-cover" />
                                <div className="absolute w-full h-full top-0 flex items-center justify-center">
                                    <button className="bg-white rounded-sm border border-black py-2 px-4 hover:bg-black hover:text-white"
                                        onClick={() => {
                                            setType('restaurants');
                                            history.push("/map");
                                        }}    
                                    >
                                        <p className="font-semibold flex items-center text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            View On Map
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* / Map view */}

                    {/* Restaurants List */}
                    <div className="lg:col-span-9">
                        { !restaurants || isLoading ? (
                            <PlaceListLoader />
                        ) : ( 
                            restaurants?.map((restaurant, i) => (
                                <div key={i} className="grid grid-cols-12 my-2 border border-gray-200 rounded shadow hover:shadow-xl cursor-pointer">

                                    {/* Restaurant Image */}
                                    <div className="col-span-12 md:col-span-4 h-[180px]">
                                        <Link to={`restaurants/${restaurant.location_id}`}>
                                            <img src={ restaurant.photo ? restaurant.photo.images.large.url : 'https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg'} alt={restaurant.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </Link>
                                    </div>
                                    {/* /Restaurant Image */}
                                    
                                    {/* Restaurant Details */}
                                    <div className="col-span-12 md:col-span-8 px-2 md:px-4 py-2">
                                        <h2 className="font-semibold text-lg md:text-xl">
                                            { restaurant.name }
                                        </h2>
                                        <p className="flex items-center my-1">
                                            <span className="flex items-center mr-1">
                                                <ReactStarsRating 
                                                    value={Number(restaurant.rating)} 
                                                    className="flex mr-2" size={20} 
                                                    isEdit={false} 
                                                    primaryColor="#00afef" 
                                                    secondaryColor="#e5e7eb" 
                                                />
                                            </span> 
                                            <span className="text-sm mr-3">
                                                { restaurant.num_reviews } Reviews
                                            </span>
                                            { (!restaurant.isClose && restaurant.open_now_text)  && (
                                                <button className={`${restaurant.open_now_text?.includes('Closed') ? 'bg-red-400' : 'bg-green-400'} rounded-full py-1 px-2 md:px-3 my-1 shadow-md`}>
                                                    <p className="text-sm flex items-center">
                                                        <svg className="h-4 md:h-5 w-4 md:w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        { restaurant.open_now_text || 'Open Now' }
                                                    </p>
                                                </button>
                                            ) }
                                        </p>

                                        { (restaurant.cuisine.length > 0) && (
                                            <p className="text-xs my-2">
                                                {restaurant.cuisine.map((item, i) => (
                                                    <span key={i} className="bg-gray-300 rounded-full inline-block px-2 py-1 mr-1 mb-1">
                                                        { item.name }
                                                    </span>
                                                ))}
                                                {  restaurant.price_level && ( 
                                                    <span>
                                                        ~ {restaurant.price_level}
                                                    </span> 
                                                )}
                                            </p>
                                        ) }

                                        {(restaurant.reviews && restaurant.reviews[0] !== null && restaurant.reviews.length > 0) && ( restaurant.reviews.map((review, i) => (                                
                                            <div key={i}>
                                                <div className="h-[1px] bg-gray-300 my-3" />

                                                <p className="flex items-center text-sm font-medium">
                                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                                        <path d="M2 11h5l-3 5h4l3-5V2H2zM13 2v9h5l-3 5h4l3-5V2z"></path>
                                                    </svg>
                                                    “{ review.title }”
                                                </p>
                                            </div>
                                        ))) }
                                    </div>
                                    {/* /Restaurant Details */}
                                </div>
                            ))
                        ) }
                    </div>
                    {/* / Restaurants List */}
                </div>

            </div>

            <Footer />
        </>
     );
}
 
export default RestaurantsList;