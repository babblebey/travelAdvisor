import ReactStarsRating from 'react-awesome-stars-rating';
import moment from "moment";
import { useState } from "react";

const Review = ({ review, place }) => {
    const [showMore, setShowMore] = useState(false);

    return ( 
        <>
            <div className="flex flex-wrap md:grid md:grid-cols-12">
                <div className="w-full flex md:flex-col md:col-span-2 items-center">
                    {/* Review User Picture */}
                    <img src={review?.user?.avatar?.large?.url}
                        className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" 
                    />
                    {/* --- */}

                    {/* review User Username */}
                    <p className="ml-3 md:ml-0 md:mt-2 text-xs text-center">
                        {review?.user?.username}
                    </p>
                    {/* --- */}
                </div>

                <div className="w-full md:col-span-10 space-y-2 mt-2 md:mt-0">
                    <p className="text-[11px] md:text-xs flex flex-wrap space-x-2">
                        {/* Review rating with value passed into component to render rating stars */}
                        <ReactStarsRating 
                            value={Number(review?.rating)} 
                            className="flex" size={15} 
                            isEdit={false} 
                            primaryColor="#00afef" 
                            secondaryColor="#e5e7eb" 
                        />
                        {/* --- */}

                        {/* Date of Review - Formatted using Moments */}
                        <span>Reviewed on { moment(review?.published_date).format('LL') }</span>
                        {/* --- */}

                        {/* Review Platform - Mobile || Desktop */}
                        <span className="flex">
                            { (review?.published_platform == 'Mobile') ? (
                                <>
                                    {/* Review Platform Renders MobilePhone icon If it 'Mobile' */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    via { review?.published_platform }
                                    {/* --- */}
                                </>
                            ) : (
                                <>
                                    {/* Review Platform Renders Computer icon If its not 'Mobile' */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    via { review?.published_platform }
                                    {/* --- */}
                                </>
                            ) }
                        </span>
                    </p>

                    {/* Review Title */}
                    <h3 className="font-medium md:text-lg">
                        { review?.title }
                    </h3>
                    {/* --- */}
                    
                    {/* Show More -> Review text is trucanted to a certain length and Show More action is displayed to view complete text */}
                    <p className="text-sm">
                        {/* If User as Click Show More or Review text is less than 46 word.... */}
                        { (showMore || review?.text?.split(' ').length <= 46) ? 
                            // ...then all full review text is displayed 
                            review?.text 
                            // ...else, the review text is truncated to 45 word and the '...' character is appended to the text
                            : `${review?.text?.split(' ').slice(0, 45).join(' ')}... ` 
                        }
                        {/* --- */}

                        {/* If Review text is greater 46 words... */}
                        { (review?.text?.split(' ').length > 46) && (
                            // ...a More/Show Less state button is added to the truncated review text
                            <span className="font-medium cursor-pointer"
                                // onClick event to toggle between show more / show less  
                                onClick={() => showMore ? setShowMore(false) : setShowMore(true)} 
                            >
                                {/* Text displayed when review text is in Show more state (Displays 'Show less' when show more is clicked) or show less state (Displays 'More' when show less is clicked) */}
                                { showMore ? <span><br />Show less</span> : 'More' }
                                {/* --- */}
                            </span>
                        ) }
                        {/* --- */}
                    </p>
                    {/* --- */}
                    
                    {/* Review Photos -> Renders if photos is found in review */}
                    { review?.photos && (
                        <div className="flex space-x-2">
                            {/* Mapping through the list of photos */}
                            {review?.photos?.map((pic, i) => (
                                <img key={i} src={pic?.images?.small?.url} 
                                    className="w-20 h-16 object-cover my-1 cursor-pointer" />
                            ))}
                            {/* --- */}
                        </div>
                    ) }
                    {/* --- */}

                    {/* Date of Visit - Formatted using Moments */}
                    <p className="text-sm">
                        <span className="font-semibold">Date of Visit:</span> { moment(review?.travel_date).format('MMMM YYYY') }
                    </p>
                    {/* --- */}

                    {/* Review Owners Response - Display if response is found for the review */}
                    { review?.owner_response && (
                        <div className="pl-3 md:pl-4 border-l border-gray-300 my-2">
                            {/* Responder Details */}
                            <p className="text-sm">
                                { review?.owner_response?.responder }, { review?.owner_response?.connection } at { place }, <span className="text-xs">responded to this review</span>
                            </p>
                            {/* --- */}

                            {/* Response Date - Formatted using Moments */}
                            <p className="text-xs my-1">
                                Responded { moment(review?.owner_response?.published_date).format('MMMM YYYY') }
                            </p>
                            {/* --- */}

                            {/* Show More Funtionationality to trucate long text for response */}
                            <p className="text-sm">
                                {/* If User as Click Show More or Review text is less than 46 word.... */}
                                { (showMore || review?.owner_response?.text?.split(' ').length <= 46) ? 
                                    // ...then all full response text is displayed 
                                    review?.owner_response?.text 
                                    // ...else, the response text is truncated to 45 word and the '...' character is appended to the text
                                    : `${review?.owner_response?.text?.split(' ').slice(0, 45).join(' ')}... ` 
                                } 
                                
                                {/* If Review text is greater 45 words... */}
                                { (review?.owner_response?.text?.split(' ').length > 45) && (
                                    // ...a More/Show Less state button is added to the truncated review text
                                    <span className="font-medium cursor-pointer" 
                                        // onClick event to toggle between show more / show less
                                        onClick={() => showMore ? setShowMore(false) : setShowMore(true)} 
                                    >
                                        {/* Text displayed when review text is in Show more state (Displays 'Show less' when show more is clicked) or show less state (Displays 'More' when show less is clicked) */}
                                        { showMore ? <span><br />Show less</span> : 'More' }
                                        {/* --- */}                     
                                    </span>
                                ) }
                                {/* --- */}
                            </p>
                            {/* --- */}
                        </div>
                    ) }
                    {/* --- */}
                </div>
            </div>
            <div className="h-[1px] col-span-12 bg-gray-200 my-10" />
        </>
     );
}
 
export default Review;