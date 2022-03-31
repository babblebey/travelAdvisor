import { useState } from "react";
import PlaceDetails from "./PlaceDetails";

const Sidebar = ({ places }) => {
    const [rating, setRating] = useState('');
    const [type, setType] = useState('');

    return ( 
        <div className="w-full p-2">
            <div className="flex border-b border-gray-300 py-2 sticky -top-1 bg-white">
                <div className="w-6/12">
                    <p>Type</p>
                    <select 
                        value={type} 
                        onChange={(e) => {setType(e.target.value)}}
                        className="focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-l-md border border-gray-300 w-full p-2"
                    >
                        <option value="restaurant" className="">Restaurant</option>
                        <option value="hotels">Hotels</option>
                        <option value="attraction">Attractions</option>
                    </select>
                </div>
                <div className="w-6/12">
                    <p>Rating</p>
                    <select 
                        value={rating} 
                        onChange={(e) => {setRating(e.target.value)}}
                        className="focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-r-md border border-gray-300 w-full p-2"
                    >
                        <option value={0}>All</option>
                        <option value={3}>Above 3.0</option>
                        <option value={4}>Above 4.0</option>
                        <option value={4.5}>Above 4.5</option>
                    </select>
                </div>
            </div>
            <div>
                {places?.map((place, i) => (
                    <PlaceDetails key={i} place={place} />
                ))}
            </div>
        </div>
     );
}
 
export default Sidebar;