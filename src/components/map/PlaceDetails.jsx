import { useState } from "react";
import icon from '../../img/favicon.svg';
import ReactStarsRating from 'react-awesome-stars-rating';

const PlaceDetails = ({ place }) => {
    const [showInfo, setShowInfo] = useState(false);

    return ( 
        <div>
            <div className="w-full rounded-sm bg-white shadow-md overflow-hidden mb-5 relative z-10 cursor-pointer"
                // onClick Event to display a pop-over of individual place details
                onClick={() => !showInfo ? setShowInfo(true) : setShowInfo(false)}
            >
                {/* Place Image displays Image if found else a default image is rendered as fallback */}
                <img 
                    src={place?.photo ? place?.photo?.images?.large?.url : 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/f7/49/68/hotel-bon-voyage.jpg?w=200&h=-1&s=1'} 
                    className="w-full h-[150px] object-cover"
                />
                {/* --- */}

                <div className="p-2">
                    {/* Place name */}
                    <h1 className="font-semibold">
                        { place?.name }
                    </h1>
                    {/* --- */}
                    <p className="my-2 text-sm">
                        {/* Place Rating with 'place.rating' value passed to generate a React Stars Rating element */}
                        <span className="flex items-center mb-2">
                            <ReactStarsRating 
                                value={place?.rating} 
                                className="flex mr-2" size={20} 
                                isEdit={false} 
                                primaryColor="#00afef" 
                                secondaryColor="#e5e7eb" 
                            />
                            ~ { place?.num_reviews } Reviews
                        </span>
                        {/* --- */}

                        {/* Place Ranking */}
                        { place?.ranking }
                        {/* --- */}
                    </p>
                </div>

                <div className="absolute top-0">
                    {/* Place Open or Close Button - Displayed with specific colors based on status */}
                    { (!place?.isClose && place?.open_now_text)  && (
                        // If Place isClose - a red button is diplayed else a green burron is diplayed - this is possible with the differnce in classes as seen below
                        <button className={`${place?.open_now_text?.includes('Closed') ? 'bg-red-400' : 'bg-green-400'} rounded-full py-1 px-3 m-2 shadow-md`}>
                            <p className="text-sm flex items-center">
                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path stroke-linecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                                {/* Place Close/Open Status Diplay with an Open now fallback just incase no text is found in object */}
                                { place?.open_now_text || 'Open Now' }
                                {/* --- */}
                            </p>
                        </button>
                    ) }
                    {/* --- */}

                    {/* Place Price, Displays if price is found in place details */}
                    { place?.price  && (
                        <button className="bg-yellow-400 rounded-full py-1 px-3 m-2 shadow-md">
                            <p className="text-sm flex items-center">
                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                { place.price }
                            </p>
                        </button>
                    ) } 
                    {/* --- */}
                </div>
            </div>

            {/* Place Info Pop-over - Displays only when user click Place Details on sidebar hence setting 'showInfo = true' */}
            { showInfo && (
                <div className="w-[100%] h-screen flex flex-wrap justify-center items-start mx-auto pb-20 fixed bg-white top-0 right-0 box-border z-50 overflow-y-scroll">
                    <div className="border-b w-full h-fit md:w-[70%] flex justify-between items-center sticky top-0 bg-white z-20">
                        {/* Return to Listing Button - Sets 'showInfo = false' on Click hence removing the Place Info Pop-over from display */}
                        <div onClick={() => setShowInfo(false)}
                            className="w-fit border-r py-3 pl-3 pr-3 md:pl-0 md:pr-4 cursor-pointer flex item-center">
                            <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <p>
                                Return to Listing
                            </p>
                        </div>
                        <img src={icon} alt="Traveladvisor" className="h-6 md:h-8 mr-3" />
                        {/* --- */}
                    </div>

                    <div className="w-full h-full md:w-[70%] p-4 md:p-0 items-start">
                        {/* Place Name */}
                        <h1 className="font-bold text-lg md:text-[35px] my-2 md:my-4">
                            { place?.name }
                        </h1>
                        {/* --- */}

                        <p className="my-2 text-sm flex flex-wrap">
                            {/* Place Rating with 'place.rating' value passed to generate a React Stars Rating element */}
                            <span className="flex items-center mr-2 mb-1">
                                <ReactStarsRating 
                                    value={place?.rating} 
                                    className="flex mr-2" size={20} 
                                    isEdit={false} 
                                    primaryColor="#00afef" 
                                    secondaryColor="#e5e7eb" 
                                />
                                { place?.num_reviews } Reviews
                            </span>
                             {/*---  */}

                             {/* Place Ranking */}
                            <span className="mb-1">
                                ~ { place?.ranking }    
                            </span>
                            {/* --- */}

                            {/* Place price level */}
                            <span className="mb-1">
                                ~ { place?.price_level }
                            </span>
                            {/* --- */}
                        </p>

                        <div className="text-sm flex flex-wrap items-center my-2 leading-relaxed">
                            {/* Place address - displays only if found in place details */}
                            { place?.address && (
                                <p className="flex items-center mr-2">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="underline decoration-dotted decoration-gray-400">{ place?.address }</span>
                                </p>
                            ) }
                            {/* --- */}
                            
                            {/* Place phone - displays only if found in place details */}
                            { place?.phone && (
                                <p className="hidden md:flex items-center mr-2">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    {/* Created a Telephone call anchor link */}
                                    <a href={`tel:${place?.phone}`}
                                        className="underline decoration-dotted decoration-gray-400">
                                        { place?.phone }
                                    </a>
                                    {/* --- */}
                                </p>
                            ) }
                            {/* --- */}

                            {/* Place email - displays only if found in place details */}
                            { place?.email && (
                                <p className="hidden md:flex items-center mr-2">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    {/* Created a send mail anchor link */}
                                    <a href={`mailto:${place?.email}`}
                                        className="underline decoration-dotted decoration-gray-400">
                                        Email
                                        <svg className="h-3 w-3 ml-1 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                        </svg>
                                    </a>
                                    {/* --- */}
                                </p>
                            ) }

                            {/* Place website - displays only if found in place details */}
                            { place?.website && (
                                <p className="hidden md:flex items-center mr-2">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                    </svg>
                                    {/* Anchor link to website */}
                                    <a href={ place?.website }
                                        target="_blank"
                                        className="underline decoration-dotted decoration-gray-400">
                                        Website
                                        <svg className="h-3 w-3 ml-1 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                        </svg>
                                    </a>
                                    {/* --- */}
                                </p>
                            ) }
                            {/* --- */}
                        </div>

                        {/* Place Open or Close Button - Displayed with specific colors based on status */}
                        { (!place?.isClose && place?.open_now_text)  && (
                            // If Place isClose - a red button is diplayed else a green burron is diplayed - this is possible with the differnce in classes as seen below
                            <button className={`${place.open_now_text?.includes('Closed') ? 'bg-red-400' : 'bg-green-400'} rounded-full py-1 px-3 my-2 mr-2`}>
                                <p className="text-sm flex items-center">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path stroke-linecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    {/* Place Close/Open Status Diplay with an Open now fallback just incase no text is found in object */}
                                    { place.open_now_text || 'Open Now' }
                                    {/* --- */}
                                </p>
                            </button>
                        ) }
                        {/* --- */}

                        {/* Place Price - displays only if found in place details  */}
                        { place?.price  && (
                            <button className="bg-yellow-400 rounded-full py-1 px-3 my-2 mr-2">
                                <p className="text-sm flex items-center">
                                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    { place?.price }
                                </p>
                            </button>
                        ) }
                        {/* --- */}

                        {/* Place Photo - displays only if found in place details else a default photo is displayed as fallback  */}
                        <img 
                            src={place?.photo ? place?.photo?.images?.original?.url : 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/f7/49/68/hotel-bon-voyage.jpg?w=200&h=-1&s=1'} 
                            className="w-full h-[300px] object-cover rounded-t md:rounded my-2"
                        />
                        {/* --- */}

                        {/* A Mobile Only Section - Diplays if either of Place Email, Phone or Website is found */}
                        { ( place?.phone || place?.email || place?.website ) && (
                            <div className="flex bg-white shadow-sm rounded-b p-2 md:hidden border border-t-0 mb-2">
                                {/* Place phone - displays only if found in place details  */}
                                { place?.phone && (
                                    <p className="flex flex-col items-center justify-center w-full">
                                        <svg className="h-7 w-7 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        {/* Telephone call anchor link */}
                                        <a href={`tel:${place?.phone}`}
                                            className="underline decoration-dotted decoration-gray-400">
                                            Call
                                        </a>
                                        {/* --- */}
                                    </p>
                                ) }
                                {/* --- */}

                                {/* Place email - displays only if found in place details  */}
                                { place?.email && (
                                    <p className="flex flex-col items-center justify-center w-full">
                                        <svg className="h-7 w-7 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        {/* Send Mail anchor link */}
                                        <a href={`mailto:${place?.email}`}
                                            className="underline decoration-dotted decoration-gray-400">
                                            Email
                                        </a>
                                        {/* --- */}
                                    </p>
                                ) }
                                {/* --- */}

                                {/* Place website - displays only if found in place details  */}
                                { place?.website && (
                                    <p className="flex flex-col items-center justify-center w-full">
                                        <svg className="h-7 w-7 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                        </svg>
                                        {/* link to website */}
                                        <a href={ place?.website }
                                            target="_blank"
                                            className="underline decoration-dotted decoration-gray-400">
                                            Website
                                            <svg className="h-3 w-3 ml-1 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                            </svg>
                                        </a>
                                        {/* --- */}
                                    </p>
                                ) }
                                {/* --- */}
                            </div>
                        ) }
                        {/* --- */}

                        <div className="md:grid grid-cols-1 md:grid-cols-3 gap-2 pb-10">
                            {/* Place description section - displays only if found in place details  */}
                            <div className="col-span-3">
                                {place?.description && (
                                    <>
                                        <h1 className="font-semibold text-lg md:text-2xl">
                                            About
                                        </h1>
                                        <p className="text-base">
                                            { place?.description }
                                        </p>
                                    </>
                                )}
                            </div>
                            {/* --- */}

                            {/* Section displays If either awards, rating or ranking is found in place details */}
                            {(place?.awards?.length > 0 || place?.rating > 0 || place?.ranking ) && (
                                <div className="col-span-1 bg-white border border-gray-200 p-4 my-1 mx-0 md:my-2 shadow-sm space-y-3 md:space-y-4">
                                    <h2 className="font-medium text-lg">
                                       Ratings & Recognitions
                                    </h2>

                                    {/* Place Rating with 'place.rating' value passed to generate a React Stars Rating element - displays only if found in place details  */}
                                    {(place?.rating > 0 ) && ( 
                                        <p className="my-2 flex items-center text-sm">
                                            <span className="font-semibold text-xl">{ place.rating }</span> 
                                            <ReactStarsRating 
                                                value={place.rating} 
                                                className="flex mx-2" size={22} 
                                                isEdit={false} 
                                                primaryColor="#00afef" 
                                                secondaryColor="#e5e7eb" 
                                            />
                                            { place?.num_reviews } Reviews
                                        </p> 
                                    )}
                                    {/* --- */}
                                    
                                    {/* Place ranking - displays only if found in place details */}
                                    {place?.ranking && (
                                        <p className="my-2 text-sm">
                                            { place?.ranking }
                                        </p>
                                    )}
                                    {/* --- */}
                                    
                                    {/* Place awards - displays only if the award array has any item i.e. greater than 0 */}
                                    {(place?.awards?.length > 0) && (
                                        <div className="text-xs space-y-2">
                                            <h3 className="font-medium uppercase">Awards</h3>
                                            <div className="flex flex-wrap items-center">
                                                {/* Mapping through awards */}
                                                {place?.awards?.map((award, i) => (
                                                    <div key={i}
                                                        className="group relative cursor-pointer">
                                                        <div className="flex flex-wrap items-center bg-white border border-gray-200 shadow-md rounded-md p-2 mr-2 mb-2">
                                                            {/* Award Image */}
                                                            <img src={award?.images?.small} />
                                                            {/* --- */}

                                                            {/* Award display name - Hidden on desktop (Large devices) but display on Mobile */}
                                                            <p className="ml-2 md:hidden">{ award?.display_name}</p>
                                                            {/* -- */}
                                                        </div>
                                                        
                                                        {/* Award display name - Display only on hover of award Image. Only on Desktop, Hidden on Mobile */}
                                                        <div className="w-content hidden md:group-hover:block absolute bg-white border border-gray-200 shadow-md rounded-md p-2 mr-2 mb-2 -bottom-10 z-10">
                                                            <p className="ml-2 whitespace-nowrap">{ award?.display_name}</p>
                                                        </div>
                                                        {/* --- */}
                                                    </div>
                                                ))}
                                                {/* --- */}
                                            </div>
                                        </div>
                                    )}
                                            
                                </div>
                            )}  
                    
                            {/* Cuisines/Special Diets - Section display only if either cusine or diet restriction is found in place details */}
                            {(place?.cuisine || place?.dietary_restrictions) && (
                                <div className="col-span-1 bg-white border border-gray-200 p-4 my-1 mx-0 md:my-2 shadow-sm space-y-3 md:space-y-4">
                                    <h2 className="font-medium text-lg">
                                        Details
                                    </h2>

                                    {/* Place cuisines - displays only if the cuisine array has any item i.e. greater than 0 */}
                                    {(place?.cuisine?.length > 0) && (
                                        <div className="text-xs space-y-2">
                                            <h3 className="font-medium uppercase">Cuisine</h3>
                                            <p>
                                                {/* Mapping through list of cuisines */}
                                                {place?.cuisine?.map((type) => (
                                                    <span 
                                                        className="bg-gray-200 rounded-full py-1 px-2 mb-2 mr-2 inline-block"
                                                        key={type?.key}>
                                                        {type?.name}
                                                    </span>
                                                ))}
                                                {/* --- */}
                                            </p>
                                        </div>
                                    )}
                                    {/* --- */}

                                    {/* Place diet restriction - displays only if the diet restriction array has any item i.e. greater than 0 */}
                                    {(place?.dietary_restrictions?.length > 0) && (
                                        <div className="text-xs space-y-2">
                                            <h3 className="font-medium uppercase">Special Diet</h3>
                                            <p>
                                                {/* Mapping through list of diet restriction */}
                                                {place?.dietary_restrictions?.map((type) => (
                                                    <span 
                                                        className="bg-gray-200 rounded-full py-1 px-2 mb-2 mr-2 inline-block"
                                                        key={type?.key}>
                                                        {type?.name}
                                                    </span>
                                                ))}
                                                {/* --- */}
                                            </p>
                                        </div>
                                    )}
                                    {/* --- */}
                                </div>
                            )}
                            {/* --- */}

                            {/* Section Diplays only if either of Place Email, Phone or Website is found */}
                            {( place?.phone || place?.email || place?.website ) && (
                                <div className="col-span-1 bg-white border border-gray-200 p-4 my-1 mx-0 md:my-2 shadow-sm space-y-3 md:space-y-4">
                                    <h2 className="font-medium text-lg">
                                        Contact Details
                                    </h2>

                                    {/* Place address - displays only if found in place details */}
                                    { place?.address && (
                                        <p className="flex items-start mr-2 text-sm">
                                            <div className="w-1/12">
                                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="underline decoration-dotted decoration-gray-400">{ place?.address }</span>
                                        </p>
                                    ) }
                                    {/* --- */}
                                    
                                    {/* Place phone - displays only if found in place details */}
                                    { place?.phone && (
                                        <p className="flex items-center mr-2 text-sm">
                                            <div className="w-1/12">
                                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                            </div>
                                            {/* Telephone call anchor link */}
                                            <a href={`tel:${place?.phone}`}
                                                className="underline decoration-dotted decoration-gray-400">
                                                { place?.phone }
                                            </a>
                                            {/* --- */}
                                        </p>
                                    ) }
                                    {/* --- */}

                                    {/* Place email - displays only if found in place details */}
                                    { place?.email && (
                                        <p className="flex items-center mr-2 text-sm">
                                            <div className="w-1/12">
                                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                </svg>
                                            </div>
                                            {/* Send mail anchor link */}
                                            <a href={`mailto:${place?.email}`}
                                                className="underline decoration-dotted decoration-gray-400">
                                                Email
                                                <svg className="h-3 w-3 ml-1 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                </svg>
                                            </a>
                                            {/* --- */}
                                        </p>
                                    ) }
                                    {/* --- */}

                                    {/* Place website - displays only if found in place details */}
                                    { place?.website && (
                                        <p className="flex items-center mr-2 text-sm">
                                            <div className="w-1/12">
                                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            {/* Website anchor link */}
                                            <a href={ place?.website }
                                                target="_blank"
                                                className="underline decoration-dotted decoration-gray-400">
                                                Website
                                                <svg className="h-3 w-3 ml-1 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                </svg>
                                            </a>
                                            {/* --- */}
                                        </p>
                                    ) }
                                    {/* --- */}
                                            
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            ) }
            {/* --- */}

        </div>
     );
}
 
export default PlaceDetails;