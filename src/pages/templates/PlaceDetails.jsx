// Single Place Details for => Attractions and Restaurants

import { useParams } from "react-router-dom";
import { useEffect, useState, } from "react";
import { getPlaceDetails, getPlaceReviews } from "../../api";
import { Navbar, Review } from "../../components";
import ReactStarsRating from 'react-awesome-stars-rating';
import { Loader, PlaceDetailsLoader } from "../../components/loaders";
import axios from "axios";
import { Link } from "react-router-dom";

const PlaceDetails = () => {
    const { type, id } = useParams();
    const [place, setPlace] = useState();
    const [reviews, setReviews] = useState();

    useEffect(() => {
        let source = axios.CancelToken.source()
        getPlaceDetails(type, id, source).then(data => {
            console.log('Get Places Details: ', data);
            setPlace(type === 'hotels' ? data.data[0] : data)
            return getPlaceReviews(id, source)
        }).then(data => setReviews(data));

        return () => {
            source.cancel()
        }
    }, [type, id])

    return ( 
        <div className="relative">
            <Navbar border />
            
            { !place ? (
                <PlaceDetailsLoader />
            ) : (
                <>  
                    <div className="border-b w-full h-fit flex justify-between items-center sticky top-0 bg-white z-20">
                        <div className="container mx-auto px-4">
                            <Link to={`/${type}`}>
                                <div className="w-fit border-r py-3 pl-3 pr-3 md:pl-0 md:pr-4 cursor-pointer flex item-center">
                                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <p>
                                        Back to all { type }
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>              
                    <div className="container mx-auto px-4 pt-4">
                        <h1 className="font-bold text-lg md:text-[35px] my-2 md:my-4">
                            { place.name }
                        </h1>

                        <p className="my-2 text-sm flex flex-wrap leading-relaxed">
                            <span className="flex items-center mr-2">
                                <ReactStarsRating 
                                    value={Number(place.rating)} 
                                    className="flex mr-2" size={20} 
                                    isEdit={false} 
                                    primaryColor="#00afef" 
                                    secondaryColor="#e5e7eb" 
                                />
                                { place.num_reviews } Reviews
                            </span> 
                            ~ { place.ranking } ~ { place.price_level }
                        </p>

                        <div className="text-sm flex flex-wrap items-center my-2 leading-relaxed">
                            { place.address && (
                                <p className="flex items-center mr-2">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="underline decoration-dotted decoration-gray-400">{ place.address }</span>
                                </p>
                            ) }
                            
                            { place.phone && (
                                <p className="hidden md:flex items-center mr-2">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <a href={`tel:${place.phone}`}
                                        className="underline decoration-dotted decoration-gray-400">
                                        { place.phone }
                                    </a>
                                </p>
                            ) }

                            { place.email && (
                                <p className="hidden md:flex items-center mr-2">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <a href={`mailto:${place.email}`}
                                        className="underline decoration-dotted decoration-gray-400">
                                        Email
                                        <svg className="h-3 w-3 ml-1 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                        </svg>
                                    </a>
                                </p>
                            ) }

                            { place.website && (
                                <p className="hidden md:flex items-center mr-2">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                    </svg>
                                    <a href={ place.website }
                                        target="_blank"
                                        className="underline decoration-dotted decoration-gray-400">
                                        Website
                                        <svg className="h-3 w-3 ml-1 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                        </svg>
                                    </a>
                                </p>
                            ) }
                        </div>
                        
                        

                        { (!place.isClose && place.open_now_text)  && (
                            <button className={`${place.open_now_text?.includes('Closed') ? 'bg-red-400' : 'bg-green-400'} rounded-full py-1 px-3 my-2 mr-2`}>
                                <p className="text-sm flex items-center">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    { place.open_now_text || 'Open Now' }
                                </p>
                            </button>
                        ) }

                        { place.price  && (
                            <button className="bg-yellow-400 rounded-full py-1 px-3 my-2 mr-2">
                                <p className="text-sm flex items-center">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    { place.price }
                                </p>
                            </button>
                        ) }
                    </div>

                    <div className="container mx-auto grid grid-cols-2">
                        <div className="col-span-2">
                            <img 
                                src={place.photo ? place.photo.images.original.url : 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/f7/49/68/hotel-bon-voyage.jpg?w=200&h=-1&s=1'}
                                className="w-full h-[250px] md:h-[400px] object-cover my-2" 
                                alt="" 
                            />
                        </div>
                    </div>
                    
                    <div className="container mx-auto px-4 pb-4">
                        { ( place.phone || place.email || place.website ) && (
                            <div className="flex bg-white shadow-sm rounded-b p-2 md:hidden border border-t-0 mb-2">
                                { place.phone && (
                                    <p className="flex flex-col items-center justify-center w-full">
                                        <svg className="h-7 w-7 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        <a href={`tel:${place.phone}`}
                                            className="underline decoration-dotted decoration-gray-400">
                                            Call
                                        </a>
                                    </p>
                                ) }

                                { place.email && (
                                    <p className="flex flex-col items-center justify-center w-full">
                                        <svg className="h-7 w-7 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        <a href={`mailto:${place.email}`}
                                            className="underline decoration-dotted decoration-gray-400">
                                            Email
                                        </a>
                                    </p>
                                ) }

                                { place.website && (
                                    <p className="flex flex-col items-center justify-center w-full">
                                        <svg className="h-7 w-7 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                        </svg>
                                        <a href={ place.website }
                                            target="_blank"
                                            className="underline decoration-dotted decoration-gray-400">
                                            Website
                                            <svg className="h-3 w-3 ml-1 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                            </svg>
                                        </a>
                                    </p>
                                ) }
                            </div>
                        ) }

                        <div className="md:grid grid-cols-1 md:grid-cols-6 gap-3 pb-10">
                            {/* About Info */}
                            <div className="col-span-6 bg-white my-1 mx-0 space-y-2">
                                {place.description && (
                                    <>
                                        <h1 className="font-semibold text-lg md:text-2xl">
                                            About
                                        </h1>
                                        <p className="text-base">
                                            { place.description }
                                        </p>
                                    </>
                                )}
                            </div>
                            
                            {/* Rating and Ranking */}
                            {(place.awards?.length > 0 || Number(place.rating) > 0 || place.ranking ) && (
                                <div className="col-span-2 bg-white border border-gray-200 p-4 my-1 mx-0 shadow-sm space-y-3 md:space-y-4">
                                    <h2 className="font-medium text-lg">
                                        Ratings & Recognitions
                                    </h2>

                                    {(Number(place.rating) > 0 )&& ( 
                                        <p className="my-2 flex flex-wrap items-center">
                                            <span className="font-semibold text-lg md:text-3xl">{ place.rating }</span> 
                                            <ReactStarsRating 
                                                value={Number(place.rating)} 
                                                className="flex mx-2" size={20} 
                                                isEdit={false} 
                                                primaryColor="#00afef" 
                                                secondaryColor="#e5e7eb" 
                                            />
                                            <span className="text-sm font-medium">{ place.num_reviews } Reviews </span>
                                        </p> 
                                    )}
                                    
                                    {place.ranking && (
                                        <p className="my-2 text-sm">
                                            { place.ranking }
                                        </p>
                                    )}
                                    
                                    {(place.awards?.length > 0) && (
                                        <div className="text-xs space-y-2">
                                            <h3 className="font-medium uppercase">Awards</h3>
                                            <div className="flex flex-wrap items-center">
                                                {place.awards.map((award, i) => (
                                                    <div key={i}
                                                        className="group relative cursor-pointer">
                                                        <div className="flex flex-wrap items-center bg-white border border-gray-200 shadow-md rounded-md p-2 mr-2 mb-2">
                                                            <img src={award.images?.small} />
                                                            <p className="ml-2 md:hidden">{ award.display_name}</p>
                                                        </div>
                                                        <div className="w-content hidden md:group-hover:block absolute bg-white border border-gray-200 shadow-md rounded-md p-2 mr-2 mb-2 -bottom-10 z-10">
                                                            <p className="ml-2 whitespace-nowrap">{ award.display_name}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )} 
                                </div>
                            )}

                            {/* Cuisines/Special Diets */}
                            {(place.cuisine || place.dietary_restrictions) && (
                                <div className="col-span-2 bg-white border border-gray-200 p-4 my-1 mx-0 shadow-sm space-y-3 md:space-y-4">
                                    <h2 className="font-medium text-lg">
                                        Details
                                    </h2>

                                    {(place.cuisine?.length > 0) && (
                                        <div className="text-xs space-y-2">
                                            <h3 className="font-medium uppercase">Cuisine</h3>
                                            <p>
                                                {place.cuisine.map((type) => (
                                                    <span 
                                                        className="bg-gray-200 rounded-full py-1 px-2 mb-2 mr-2 inline-block"
                                                        key={type.key}>
                                                        {type.name}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    )}

                                    {(place.dietary_restrictions?.length > 0) && (
                                        <div className="text-xs space-y-2">
                                            <h3 className="font-medium uppercase">Special Diet</h3>
                                            <p>
                                                {place.dietary_restrictions.map((type) => (
                                                    <span 
                                                        className="bg-gray-200 rounded-full py-1 px-2 mb-2 mr-2 inline-block"
                                                        key={type.key}>
                                                        {type.name}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Contact Details */}
                            {( place.phone || place.email || place.website ) && (
                                <div className="col-span-2 bg-white border border-gray-200 p-4 my-1 mx-0 shadow-sm space-y-3 md:space-y-4">
                                    <h2 className="font-medium text-lg">
                                        Contact Details
                                    </h2>

                                    { place.address && (
                                        <div className="flex items-start mr-2 text-sm">
                                            <div className="w-1/12">
                                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="underline decoration-dotted decoration-gray-400">{ place.address }</span>
                                        </div>
                                    ) }
                                    
                                    { place.phone && (
                                        <div className="flex items-center mr-2 text-sm">
                                            <div className="w-1/12">
                                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                            </div>
                                            <a href={`tel:${place.phone}`}
                                                className="underline decoration-dotted decoration-gray-400">
                                                { place.phone }
                                            </a>
                                        </div>
                                    ) }

                                    { place.email && (
                                        <div className="flex items-center mr-2 text-sm">
                                            <div className="w-1/12">
                                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                </svg>
                                            </div>
                                            <a href={`mailto:${place.email}`}
                                                className="underline decoration-dotted decoration-gray-400">
                                                Email
                                                <svg className="h-3 w-3 ml-1 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                </svg>
                                            </a>
                                        </div>
                                    ) }

                                    { place.website && (
                                        <div className="flex items-center mr-2 text-sm">
                                            <div className="w-1/12">
                                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <a href={ place.website }
                                                target="_blank"
                                                className="underline decoration-dotted decoration-gray-400">
                                                Website
                                                <svg className="h-3 w-3 ml-1 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                </svg>
                                            </a>
                                        </div>
                                    ) }
                                            
                                </div>
                            )} 

                            {/* Reviews */}
                            { reviews ? (
                                <div className="md:col-span-6 xl:col-span-4 bg-white border border-gray-200 p-4 my-1 mx-0 shadow-sm">
                                    <h2 className="font-semibold text-lg md:text-2xl">
                                        Reviews <span className="text-gray-400">({ place.num_reviews })</span>
                                    </h2>
                                    <div className="h-[1px] bg-gray-300 my-3 md:my-4" />

                                    { place.num_reviews > 0 ? reviews?.map((review, i) => (
                                        <Review key={i} review={review} place={place.name} />
                                    )) : (
                                        <p className="text-gray-300 text-center">
                                            There are currently no no reviews for this place.
                                        </p>
                                    )}

                                </div>
                            ) : (
                                <div className="md:col-span-6 xl:col-span-4 h-fit bg-white border border-gray-200 p-4 my-1 mx-0 shadow-sm">
                                    <h2 className="font-semibold text-lg md:text-2xl">
                                        Reviews <span className="text-gray-400">({ place.num_reviews })</span>
                                    </h2>
                                    <div className="h-[1px] bg-gray-300 my-3 md:my-4" />
                                    <Loader />
                                </div>
                            ) }
                        </div>
                    </div>
                </>
            ) }
        </div>
     );
}
 
export default PlaceDetails;