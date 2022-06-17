import ReactStarsRating from 'react-awesome-stars-rating';
import { Link } from "react-router-dom";

const PlaceCard = ({ place, type }) => {
    return ( 
        <>
            {/* Place card is rendered if place prop is received */}
            {place && <div className="group cursor-pointer">
                {/* Place location_id is passed as parameter to place_type (hotels || restaurants || attractions) route for full place details */}
                <Link to={`${type}/${place?.location_id}`}>
                    {/* Place Photo is render if found or a default image is renderedas fallback */}
                    <img src={place?.photo ? place?.photo?.images?.large?.url : 'https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg'} 
                        alt={place?.name}
                        className="w-full h-[250px] object-cover group-hover:brightness-125"
                    />
                    {/* --- */}

                    {/* Place name */}
                    <h2 className="font-semibold text-lg group-hover:underline">
                        { place?.name }
                    </h2>
                    {/* --- */}

                    {/* Place Rating with place.rating value passed into component to render star rating */}
                    <span className="flex items-center mb-2">
                        <ReactStarsRating 
                            value={Number(place?.rating)}
                            className="flex mr-2"
                            size={20}
                            isEdit={false}
                            primaryColor="#00afef" 
                            secondaryColor="#e5e7eb" 
                        />
                        ~ { place?.num_reviews } Reviews
                    </span>
                    {/* --- */}
                </Link>
                {/* --- */}
            </div>}
        </>
     );
}
 
export default PlaceCard;