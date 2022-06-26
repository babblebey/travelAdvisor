import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { Footer, HotelCard, Navbar } from "../components";
import { getPlacesByLatLng } from "../api";
import { PlaceListLoader } from "../components/loaders";
import map from "../img/map.png";
import moment from "moment";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

// Custom Input Field Component
const Input = ({ type, name, value, valueInline, handleChange, handleChangeInline, classProps, moreProps }) => (
    <input 
        // Input type
        type={type}
        // Input Name
        name={name}
        // Value - Takes value of 'valueInLine' prop as value else takes the 'value' prop as value
        value={valueInline ? valueInline : value[name]}
        // Change event handler - Takes 'handleChangeInline' as onchange event else event is handled within the handleChange function
        onChange={handleChangeInline ? handleChangeInline : (e) => handleChange(e, name)}
        // Class names for styling
        className={classProps}
        // All other props are desctruction into the component
        {...moreProps}
    />
)

const HotelsList = () => {
    // Destructuring the neccessary states from the main context
    const { coordinates, isLoading, setIsLoading, setType } = useContext(MainContext);
    const [hotels, setHotels] = useState();
    const [guestsToggle, setGuestsToggle] = useState(false);
    const history = useHistory();

    // Scroll State Handler
    const [scrolled, setScrolled] = useState(false);
    document.addEventListener('scroll', () => window.scrollY > 100 ? setScrolled(true) : setScrolled(false));

    // Filter Parameter state with certain Default value set
    const [filterParams, setFilterParams] = useState({ 
        limit: 30, 
        rooms: 1, 
        adults: 1, 
        hotel_class: '4, 5',
        checkin: moment(new Date()).format("YYYY-MM-DD"),
        checkout: '',
        nights: 1,
        pricesmax: '',
        pricesmin: ''
    })

    // Form Changes Handler
    const handleChange = (e, name) => {
        // Value of 'filterParams' updated on change of input value detected from form fields 
        setFilterParams((prevState) => ({...prevState, [name]: e.target.value}))
    }

    // Effect to fetch places for component from the getPlacesByLatLng endpoint and effect is reran on change of 'coordinates' or 'filterParams' state values
    useEffect(() => {
        let source = axios.CancelToken.source()

        // Loading state is set to true while data is being fetched from endpoint
        setIsLoading(true);

        // Calling on the getPlacesByLatLng endpoint passing in the 'hotels' as place type, coordinates (longitude and latitude), a limit parameter and source for error handling
        getPlacesByLatLng('hotels', coordinates.lat, coordinates.lng, {...filterParams}, source)
            .then(data => {
                // Data is received anf set to 'hotels' state filtering out items without the 'name' property
                setHotels(data.filter(item => item.name));

                // Loading state set back to false to stop loading
                setIsLoading(false);
            })

        // Effect Cleanup
        return () => {
            source.cancel()
        }
    }, [coordinates, filterParams])

    return ( 
       <>
            {/* Navigation Bar with Border */}
            <Navbar border />
            {/* --- */}

            <div className="pb-4">
                <div className="container mx-auto text-center my-10">
                    <h1 className="font-semibold text-lg md:text-3xl">
                        Hotels and Places to stay
                    </h1>
                </div>
                
                {/* Check In/Out and Guests Filter */}
                <div className={`${scrolled && 'border-b'} mb-10 z-30 md:sticky-top bg-white -mt-4`}>
                    <div className="container mx-auto block space-y-4 md:space-y-0 md:grid md:grid-cols-3 gap-2 px-4 py-5">
                        {/* Check In */}
                        <div className="w-full relative">
                            <span className="absolute text-xs bg-white font-semibold px-2 -top-2 left-2">
                                Check In
                            </span>
                            {/* Input Field for 'checkin' date */}
                            <Input type="date" name="checkin" value={filterParams}
                                // Inline change event handling - Update the 'checkin' and 'nights' within the parameter states
                                handleChangeInline={(e) => setFilterParams(prevState => (
                                    {
                                        // Spreading other unchanged states properties
                                        ...prevState, 

                                        // new form input value set to the 'checkin' state property
                                        checkin: e.target.value,

                                        // Difference between 'checkin' property and 'checkout' property is calculated with resulting value is saved to 'nights'
                                        // ...the individual properties are formatted using 'momentJs' that also does the difference evaluation with the value type coverted into a number using the 'Number' objecct 
                                        nights: Number(moment(new Date(filterParams.checkout)).diff(moment(new Date(e.target.value)), 'days')),
                                    }
                                ))}

                                // Extra Props to set 'min' and 'max' value of the date input
                                moreProps={{min: filterParams.checkin, max: filterParams.checkout}}

                                // CSS Classes Props
                                classProps="w-full rounded border-y border-r shadow px-4 py-2 border-l-8 border-l-green-600 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none" 
                            />
                            {/* --- */}
                        </div>
                        {/* --- */}
                        
                        {/* Check Out */}
                        <div className="w-full relative">
                            <span className="absolute text-xs bg-white font-semibold px-2 -top-2 left-2">
                                Check Out
                            </span>

                            {/* Input field for 'checkout' date */}
                            <Input type="date" name="checkout" value={filterParams}
                                // Inline change event handling - Update the 'checkout' and 'nights' within the parameter states
                                handleChangeInline={(e) => setFilterParams(prevState => (
                                    {
                                        // Spreading other unchanged states properties
                                        ...prevState, 

                                        // new form input value set to the 'checkin' state property
                                        checkin: e.target.value,

                                        // Difference between 'checkout' property and 'checkin' property is calculated with resulting value is saved to 'nights'
                                        // ...the individual properties are formatted using 'momentJs' that also does the difference evaluation with the value type coverted into a number using the 'Number' objecct 
                                        nights: Number(moment(new Date(e.target.value)).diff(filterParams.checkin, 'days')),
                                    }
                                ))}

                                // Extra Props to set 'min' value of the date input
                                moreProps={{min: filterParams.checkin}}
                                
                                // CSS Classes Props
                                classProps="w-full rounded border-y border-r shadow px-4 py-2 border-l-8 border-l-red-600 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none" 
                            />
                            {/* --- */}
                        </div>
                        {/* --- */}

                        {/* Guests */}
                        <div className="w-full rounded border-y border-r shadow px-4 py-2 border-l-8 border-l-gray-500 relative">
                            {/* Click-enbaled Overlay, that toggles Guests Field */}
                            <div className="absolute w-full h-full top-0 left-0 cursor-pointer bg-transparent z-10"
                                // On Click function sets 'guestsToggle' to true, hence opening the form field dropdown for Guests and adults
                                onClick={() => setGuestsToggle(true)} 
                            />
                            {/* --- */}

                            <span className="absolute text-xs bg-white font-semibold px-2 -top-2 left-0">
                                Guests
                            </span>

                            {/* FilterParams 'rooms' and 'adults' properties displayed on input display */}
                            <p className="w-full">
                                { filterParams.rooms } room, { filterParams.adults } adults
                            </p>
                            {/* --- */}

                            <span className="absolute top-3 right-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>

                            {/* Dropdown is displayed If Guests Toggle is Clicked, hence 'guestsToggle' set to true */}
                            { guestsToggle && (
                                <div className="absolute z-20 w-full left-0 top-12">
                                    <div className="h-4 w-4 bg-white shadow transform rotate-45 mx-auto -mb-2 border border-gray-200" />
                                    <div className="bg-white shadow-md w-full p-4 space-y-2 relative">
                                        {/* Close Button */}
                                        <p className="flex justify-end pb-2 relative"
                                            // On Click function sets 'guestsToggle' to false, hence closing the form field dropdown for Guests and adults
                                            onClick={() => setGuestsToggle(false)}
                                        >
                                            <svg className="h-4 w-4 block cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </p>
                                        {/* --- */}

                                        {/* Rooms */}
                                        <div className="flex justify-between items-center">
                                            <p>
                                                Rooms
                                            </p>
                                            {/* Input Field for 'rooms' */}
                                            <Input type="number" name="rooms" value={filterParams} handleChange={handleChange}
                                                classProps="w-14 rounded border p-1 text-center focus:text-gray-700 focus:bg-white focus:outline-none" 
                                            />
                                            {/* --- */}
                                        </div>
                                        {/* --- */}

                                        {/* Adults */}
                                        <div className="flex justify-between items-center">
                                            <p>
                                                Adults
                                            </p>
                                            {/* Input Field from 'adults' */}
                                            <Input type="number" name="adults" value={filterParams} handleChange={handleChange}
                                                classProps="w-14 rounded border p-1 text-center focus:text-gray-700 focus:bg-white focus:outline-none" 
                                            />
                                            {/* --- */}
                                        </div>
                                        {/* --- */}
                                    </div>
                                </div>
                            ) }
                            {/* --- */}
                        </div>
                        {/* --- */}
                    </div>
                </div>
                {/* / Check In/Out and Guests Filter */}

                <div className="container mx-auto px-4 lg:grid lg:grid-cols-12 gap-2">

                    {/* Map view with Route Link to map view */}
                    <div className="lg:col-span-3">
                        <div className="w-full border shadow mt-2 p-2">
                            <div className="relative">
                                <img src={map} alt="Map" className="w-full h-20 lg:h-full object-cover" />
                                <div className="absolute w-full h-full top-0 flex items-center justify-center">
                                    {/* Rounte Link */}
                                    <button className="bg-white rounded-sm border border-black py-2 px-4 hover:bg-black hover:text-white"
                                        // Click event 
                                        onClick={() => {
                                            // Places Type for Map Filter is set to current place type i.e. 'hotels'
                                            setType('hotels');
                                            // Then routing is done to the Map Route
                                            history.push("/map");
                                        }} 
                                    >
                                        <p className="font-semibold flex items-center text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            View On Map
                                        </p>
                                    </button>
                                    {/* --- */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* / Map view */}

                    {/* Hotels Listing */}
                    <div className="lg:col-span-9">
                        { !hotels || isLoading ? (
                            // Displays a loading if 'hotels' has no data in state or data fetching is in loading state
                            <PlaceListLoader />
                        ) : (
                            // Maps through 'hotels' list when it is ready or data fetching is not in loading state
                            hotels?.map((hotel, i) => (
                                <HotelCard key={i} hotel={hotel} />
                            ))
                        ) }
                    </div>
                    {/* / Hotels Listing */}
                    
                </div>
            </div>
            
            {/* Footer Component */}
            <Footer />
            {/* --- */}
       </>
     );
}
 
export default HotelsList;