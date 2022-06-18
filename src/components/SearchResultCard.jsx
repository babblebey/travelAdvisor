import ReactStarsRating from "react-awesome-stars-rating";
import { Link } from "react-router-dom";

const SearchResultCard = ({ result }) => {
    return ( 
        <>
            {/* Search Result Object Card  */}
            { result?.result_object?.category?.key === 'geographic' ? (
                // -> this particular card is display if the result value of key is 'geographic'
                <div className="block md:grid md:grid-cols-12 p-4 gap-3 border-b">
                    <div className="col-span-3 rounded overflow-hidden max-h-[200px] md:max-h-[150px] relative">
                        {/* Image displayed for Result Objcet, Check whether result has image and chooses which ever size available else a default image is displayed as fallback */}
                        <img src={ result?.result_object?.photo ? ( 
                                    result?.result_object?.photo?.images?.large?.url || result?.result_object?.photo?.images?.original?.url ||
                                    result?.result_object?.photo?.images?.medium?.url || result?.result_object?.photo?.images?.small?.url
                                ) : (
                                    'https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg'
                                )                                      
                            } 
                            alt={result?.result_object?.name} 
                            className="object-cover h-full w-full" 
                        />
                        {/* --- */}

                        {/* Result Object Category Name */}
                        <p className="absolute text-xs z-20 bottom-0 text-white p-2">
                            { result?.result_object?.category?.name }
                        </p>
                        {/* --- */}

                        {/* Transparent Overlay */}
                        <div className="absolute w-full h-full top-0 bg-gradient-to-b from-transparent to-black opacity-80" />
                        {/* --- */}
                    </div>
                    <div className="col-span-9 flex flex-wrap">
                        <div className="w-full self-start">
                            {/* Result Object Name */}
                            <h3 className="font-semibold text-lg mb-2 mt-1 md:mt-0">
                                { result?.result_object?.name }
                            </h3>
                            {/* --- */}

                            <div className="text-sm text-dark">
                                {/* Reesult Object Rating (renders only if value is found), its rating value is passed into a ReactStarsRating component to render stars rating */}
                                { result?.result_object?.rating && (
                                    <p className="flex items-center">
                                        <ReactStarsRating 
                                            value={Number(result?.result_object?.rating)} 
                                            className="flex mr-2" size={15} 
                                            isEdit={false} 
                                            primaryColor="#00afef" 
                                            secondaryColor="#e5e7eb" 
                                        />
                                        { result?.result_object?.num_reviews?.toLocaleString() } reviews
                                    </p>
                                ) }
                                {/* --- */}

                                {/* Result Object Address or Location */}
                                <p>
                                    { result?.result_object?.address || result?.result_object?.location_string  }
                                </p>
                                {/* --- */}
                            </div>
                        </div>
                
                        {/* Review Snippet Displayed If Available */}
                        { (result?.review_snippet && result?.review_snippet?.snippet) && (
                            <div className="w-full self-end text-xs mmd:text-sm text-dark mt-5 mmd:mt-0 space-y-1">
                                <p className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    { result?.search_explanations?.mentioned_by_travelers || 'Review' }
                                </p>
                                <p>
                                    "...{ result?.review_snippet?.snippet && result?.review_snippet?.snippet }..."
                                </p>
                            </div>
                        ) }
                        {/* / Review Snippet Displayed If Available */}
                    </div>
                </div>
            ) : (
                // -> this card is display for every result value that key is not 'geographic'
                <div className="block md:grid md:grid-cols-12 p-4 gap-3 border-b">
                    <div className="col-span-3 rounded overflow-hidden max-h-[200px] md:max-h-[150px] relative">
                        {/* Link to Individual placeDetails route created with result's category key (e.g. 'hotel') plus 's' (i.e. 'hotels') forward slash the result object id */}
                        <Link to={`${result?.result_object?.category?.key+'s'}/${result?.result_object?.location_id}`}>
                            <>
                                {/* Image displayed for Result Objcet, Check whether result has image and chooses which ever size available else a default image is displayed as fallback */}
                                <img src={ result?.result_object?.photo ? ( 
                                            result?.result_object?.photo?.images?.large?.url || result?.result_object?.photo?.images?.original?.url ||
                                            result?.result_object?.photo?.images?.medium?.url || result?.result_object?.photo?.images?.small?.url
                                        ) : (
                                            'https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg'
                                        )                                      
                                    } 
                                    alt={result?.result_object?.name} 
                                    className="object-cover h-full w-full" 
                                />
                                {/* --- */}

                                {/* Result object category name */}
                                <p className="absolute text-xs z-20 bottom-0 text-white p-2">
                                    { result.result_object.category.name }
                                </p>
                                {/* --- */}

                                {/* Transparent Overlay */}
                                <div className="absolute w-full h-full top-0 bg-gradient-to-b from-transparent to-black opacity-80" />
                                {/* --- */}
                            </>
                        </Link>
                        {/* --- */}
                    </div>
                    <div className="col-span-9 flex flex-wrap">
                        <div className="w-full self-start">
                            {/* Result object name */}
                            <h3 className="font-semibold text-lg mb-2 mt-1 md:mt-0">
                                { result?.result_object?.name }
                            </h3>
                            {/* --- */}

                            <div className="text-sm text-dark">
                                {/* Result Object rating (renders only if value is found), its rating value is passed into a ReactStarsRating component to render stars rating */}
                                { result?.result_object?.rating && (
                                    <p className="flex items-center">
                                        <ReactStarsRating 
                                            value={Number(result?.result_object?.rating)} 
                                            className="flex mr-2" size={15} 
                                            isEdit={false} 
                                            primaryColor="#00afef" 
                                            secondaryColor="#e5e7eb" 
                                        />
                                        { result?.result_object?.num_reviews?.toLocaleString() } reviews
                                    </p>
                                ) }
                                {/* --- */}

                                {/* Result Object Address or Location */}
                                <p>
                                    { result?.result_object?.address || result?.result_object?.location_string  }
                                </p>
                                {/* --- */}
                            </div>
                        </div>
                
                        {/* Review Snippet Displayed If Available */}
                        { (result?.review_snippet && result?.review_snippet?.snippet) && (
                            <div className="w-full self-end text-xs mmd:text-sm text-dark mt-5 mmd:mt-0 space-y-1">
                                <p className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    { result?.search_explanations?.mentioned_by_travelers || 'Review' }
                                </p>
                                <p>
                                    "...{ result?.review_snippet?.snippet && result?.review_snippet?.snippet }..."
                                </p>
                            </div>
                        ) }
                        {/* / Review Snippet Displayed If Available */}
                    </div>
                </div>
            ) }
        </>
        
     );
}
 
export default SearchResultCard;