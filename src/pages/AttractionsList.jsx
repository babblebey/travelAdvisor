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

    useEffect(() => {
        let source = axios.CancelToken.source()
        setIsLoading(true)
        getPlacesByLatLng('attractions', coordinates.lat, coordinates.lng, { limit: 30 }, source)
            .then(data => {
                console.log(data);
                setIsLoading(false);
                setAttractions(data.filter(item => item.num_reviews != 0 && item.location_id != 0 && item.name))
            })

        return () => {
            source.cancel();
        }
    }, [coordinates])

    return ( 
        <>
            <Navbar border />

            <div className="container mx-auto pb-4">
                <div className="text-center my-10">
                    <h1 className="font-semibold text-lg md:text-3xl">
                        Attractions near you
                    </h1>
                </div>

                { !attractions || isLoading ? (
                    <AttractionsListLoader />
                ) : (
                    <div className="block md:grid md:grid-cols-12 md:px-4 my-2 gap-3">
                        { attractions?.map((attraction, i) => (
                            <div key={i} className="md:col-span-6 lg:col-span-4 mb-4">
                                <div className="w-full h-[250px] md:h-[400px] object-cover">
                                    <Link to={`/attractions/${attraction.location_id}`}>
                                        <img src={ attraction.photo ? attraction.photo.images.large.url : 'https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg'} alt="" 
                                            className=" w-full h-full object-cover curso-pointer"
                                        />
                                    </Link>
                                </div>
                                <div className="px-4 md:px-0 py-2 space-y-1">
                                    <h2 className="font-semibold md:text-lg">
                                        { attraction.name }
                                    </h2>
                                    <p className="flex items-center text-xs">
                                        <span className="flex items-center mr-1">
                                            <ReactStarsRating 
                                                value={Number(attraction.rating)} 
                                                size={18} 
                                                className="flex mr-2"
                                                isEdit={false} 
                                                primaryColor="#00afef" 
                                                secondaryColor="#e5e7eb" 
                                            />
                                        </span>
                                        { attraction.num_reviews } Reviews
                                    </p>
                                    <p className="text-sm">
                                        { attraction?.subtype.map((type, i) => (
                                            <span key={i}>
                                                { type.name }
                                            </span>
                                        )) }
                                    </p>
                                </div>
                            </div>
                        )) }
                    </div>
                )}
            </div>

            <Footer />
        </>
     );
}
 
export default AttractionsList;