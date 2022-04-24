import ReactStarsRating from 'react-awesome-stars-rating';
import moment from "moment";
import { useState } from "react";

const Review = ({ review, place }) => {
    const [showMore, setShowMore] = useState(false);

    return ( 
        <>
            <div className="flex flex-wrap md:grid md:grid-cols-12">
                <div className="w-full flex md:flex-col md:col-span-2 items-center">
                    <img src={review.user.avatar.large.url}
                        className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" 
                    />
                    <p className="ml-3 md:ml-0 md:mt-2 text-xs text-center">
                        {review.user.username}
                    </p>
                </div>
                <div className="w-full md:col-span-10 space-y-2 mt-2 md:mt-0">
                    <p className="text-[11px] md:text-xs flex flex-wrap space-x-2">
                        <ReactStarsRating 
                            value={Number(review.rating)} 
                            className="flex" size={15} 
                            isEdit={false} 
                            primaryColor="#00afef" 
                            secondaryColor="#e5e7eb" 
                        />
                        <span>Reviewed on { moment(review.published_date).format('LL') }</span>
                        <span className="flex">
                            { (review.published_platform == 'Mobile') ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    via { review.published_platform }
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    via { review.published_platform }
                                </>
                            ) }
                        </span>
                    </p>
                    <h3 className="font-medium md:text-lg">
                        { review.title }
                    </h3>
                    <p className="text-sm">
                        { (showMore || review.text.split(' ').length <= 46) ? 
                            review.text : `${review.text.split(' ').slice(0, 45).join(' ')}... ` 
                        } 
                        { (review.text.split(' ').length > 46) && (
                            <span className="font-medium cursor-pointer" onClick={() => showMore ? setShowMore(false) : setShowMore(true)} >
                                { showMore ? <span><br />Show less</span> : 'More' }
                            </span>
                        ) }
                    </p>
                    
                    { review.photos && (
                        <div className="flex space-x-2">
                            {review.photos.map((pic, i) => (
                                <img key={i} src={pic?.images?.small?.url} 
                                    className="w-20 h-16 object-cover my-1 cursor-pointer" />
                            ))}
                        </div>
                    ) }

                    <p className="text-sm">
                        <span className="font-semibold">Date of Visit:</span> { moment(review.travel_date).format('MMMM YYYY') }
                    </p>

                    { review.owner_response && (
                        <div className="pl-3 md:pl-4 border-l border-gray-300 my-2">
                            <p className="text-sm">
                                { review.owner_response.responder }, { review.owner_response.connection } at { place }, <span className="text-xs">responded to this review</span>
                            </p>
                            <p className="text-xs my-1">
                                Responded { moment(review.owner_response.published_date).format('MMMM YYYY') }
                            </p>
                            <p className="text-sm">
                                { (showMore || review.owner_response.text.split(' ').length <= 46) ? 
                                    review.owner_response.text : `${review.owner_response.text.split(' ').slice(0, 45).join(' ')}... ` 
                                } 
                                { (review.owner_response.text.split(' ').length > 45) && (
                                    <span className="font-medium cursor-pointer" onClick={() => showMore ? setShowMore(false) : setShowMore(true)} >
                                        { showMore ? <span><br />Show less</span> : 'More' }
                                    </span>
                                ) }
                            </p>
                        </div>
                    ) }
                </div>
            </div>
            <div className="h-[1px] col-span-12 bg-gray-200 my-10" />
        </>
     );
}
 
export default Review;