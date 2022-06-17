import { useContext } from "react";
import PlaceDetails from "./PlaceDetails";
import { Loader } from "../loaders";
import { MainContext } from "../../context/MainContext";

const Sidebar = ({ places }) => {
    // Bringing in all necessary state from MainContext
    const { rating, setRating, type, setType, isLoading } = useContext(MainContext);

    return ( 
        <div className="w-full">
            <div className="md:hidden grid grid-cols-2 gap-1 border-t border-gray-300 p-2 box-border fixed z-30 w-full bottom-0 bg-white text-sm font-medium">
                <div className="col-span-1 space-y-1">
                    <p>Type</p>
                    {/* Select field for setting new value for 'type' state value */}
                    <select 
                        value={type} 
                        onChange={(e) => {setType(e.target.value)}}
                        className="focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md border border-gray-300 w-full p-2"
                    >
                        <option value="restaurants" className="">Restaurant</option>
                        <option value="hotels">Hotels</option>
                        <option value="attractions">Attractions</option>
                    </select>
                    {/* --- */}
                </div>
                <div className="col-span-1 space-y-1">
                    <p>Rating</p>
                    {/* Select field for setting new value for 'rating' state value */}
                    <select 
                        value={rating} 
                        onChange={(e) => {setRating(e.target.value)}}
                        className="focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md border border-gray-300 w-full p-2"
                    >
                        <option value={0}>All</option>
                        <option value={3}>Above 3.0</option>
                        <option value={4}>Above 4.0</option>
                        <option value={4.5}>Above 4.5</option>
                    </select>
                    {/* --- */}
                </div>
            </div>
            <div className="px-2 pt-2 pb-20 md:pb-2">
                {/* Loader is rendered when places info is in loading state i.e. isLoading is True else the place list is mapped */}
                { isLoading ? (
                    <Loader />
                ) : (
                    // Mapping through the Places data with a placDetails component rendered for each
                    places?.map((place, i) => (
                        <PlaceDetails key={i} place={place} />
                    ))
                )} 
                {/* --- */}
            </div>
        </div>
     );
}
 
export default Sidebar;