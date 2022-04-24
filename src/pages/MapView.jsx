import { useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import { Header, Map, Sidebar, Filter } from "../components/map"
import { MainContext } from "../context/MainContext"

const MapView = () => {
    const { places, coordinates, setCoordinates, setBounds, filteredPlaces } = useContext(MainContext);
    const history = useHistory();

    return ( 
        <div className="w-full flex flex-wrap-reverse md:flex-nowrap md:h-screen">
            <div className="h-auto md:h-full w-full md:w-[35%] lg:w-[23%] md:overflow-y-scroll"> 
                <div className="w-full text-center">
                    <button className="bg-black text-white py-2 px-8 rounded my-2 hover:bg-gray-600 transition ease-in duration-100"
                        onClick={() => history.goBack()}
                    >
                        <p>Close Map View</p>
                    </button>
                </div>
                <Sidebar places={filteredPlaces ? filteredPlaces : places}  />
            </div>
            <div className="h-[50vh] md:h-full w-full md:w-[65%] lg:w-[79%] relative">
                <Header setCoordinates={setCoordinates} />
                <Map 
                    setBounds={setBounds}
                    setCoordinates={setCoordinates}
                    coordinates={coordinates}
                    places={filteredPlaces ? filteredPlaces : places}
                />
                <Filter />
            </div>
        </div>
     );
}
 
export default MapView;