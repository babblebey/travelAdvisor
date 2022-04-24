import React, { useState, useEffect } from 'react';
import { getPlacesByBounds, getPlacesByLatLng } from "../api";
import axios from "axios";

export const MainContext = React.createContext();

export const MainContextProvider = ({ children }) => {
    const [places, setPlaces] = useState();
    const [filteredPlaces, setFilteredPlaces] = useState();
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [rating, setRating] = useState(0);
    const [type, setType] = useState('restaurants');
    const [isLoading, setIsLoading] = useState(false);
    const [restaurants, setRestaurants] = useState();
    const [hotels, setHotels] = useState();
    const [attractions, setAttractions] = useState();

    // Get Current User Location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
            setCoordinates({lat: latitude, lng: longitude})
        })
    }, [])

    // Get Places for Map View
    useEffect(() => {
        let source = axios.CancelToken.source();
        setIsLoading(true);
        if (bounds.sw && bounds.ne) {
            try {
                getPlacesByBounds(type, bounds.sw, bounds.ne, source)
                    .then(data => {
                        console.log(data);
                        setPlaces(data?.filter(place => place.name))
                        setIsLoading(false);
                    })
                console.log('All set! ', bounds.sw, bounds.ne);
            } catch (error) {
                console.error(error)
            }
        }

        return () => {
            source.cancel();
        }
    }, [type, bounds])

    // Get Places for Homepage
    useEffect(() => {
        let source = axios.CancelToken.source();
        setIsLoading(true);
        if (coordinates.lat && coordinates.lng) {
            try {
                getPlacesByLatLng('restaurants', coordinates.lat, coordinates.lng, { limit: 20, min_rating: 4 }, source)
                    .then(data => {
                        setRestaurants(data?.filter(restaurant => restaurant.name && restaurant.location_id != 0))
                    });
                getPlacesByLatLng('attractions', coordinates.lat, coordinates.lng, { limit: 20, min_rating: 4 }, source)
                    .then(data => {
                        setAttractions(data?.filter(attraction => attraction.name && attraction.location_id != 0 && attraction.rating > 0))
                    });
                getPlacesByLatLng('hotels', coordinates.lat, coordinates.lng, { limit: 20, min_rating: 4 }, source)
                    .then(data => {
                        setHotels(data?.filter(hotel => hotel.name && hotel.location_id != 0 && hotel.rating > 0))
                    });
            } catch (error) {
                console.error(error)
            }
        }

        return () => {
            source.cancel()
        }
    }, [coordinates]);
    
    // Get Filtered Places by Rating
    useEffect(() => {
        setFilteredPlaces(places?.filter(place => Number(place.rating) >= rating))
    }, [rating])

    return (
        <MainContext.Provider value={{ places, setPlaces, coordinates, setCoordinates, bounds, setBounds, rating, setRating, type, setType, isLoading, setIsLoading, filteredPlaces, attractions, restaurants, hotels }}>
            { children }
        </MainContext.Provider>
    )
}

