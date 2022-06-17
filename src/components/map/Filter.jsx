import { useContext } from "react";
import { MainContext } from "../../context/MainContext";

const Filter = () => {
    // Bringing Neccesary states from the Main Context
    const { type, setType, rating, setRating } = useContext(MainContext);

    return ( 
        <div className="hidden md:flex items-center p-2 absolute bottom-0 z-10 w-[50%] lg:w-[25%]">
            <div className="shadow-md rounded-sm bottom-0 bg-white p-3 text-sm w-full space-y-2">
                <h2 className="font-semibold flex items-center text-2xl">
                    <svg className="h-7 w-7 mr-1 text-[#00afef] my-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Filter
                </h2>
                <div className="w-full space-y-1 font-medium">
                    <p>Place Type</p>
                    
                    {/* Select Field for Rating that Set new Place Type state value */}
                    <select 
                        value={type} 
                        onChange={(e) => {setType(e.target.value)}}
                        className="focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md border border-gray-300 w-full p-2"
                    >
                        <option value="restaurants" className="">Restaurants</option>
                        <option value="hotels">Hotels</option>
                        <option value="attractions">Attractions</option>
                    </select>
                    {/* --- */}
                </div>
                <div className="w-full space-y-1 font-medium">
                    <p>Rating</p>
                    
                    {/* Select Field for Rating that Set new Rating state value */}
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
        </div>
     );
}
 
export default Filter;