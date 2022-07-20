import { useContext } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import PlaceCard from "./PlaceCard";
import { PlaceCardLoader } from "./loaders";
import { MainContext } from "../context/MainContext";

// OwlCarousel Responsive Options
const responsive = {
    0: {
        items: 1,
        margin: 15,
    },
    600: {
        items: 2,
        margin: 10,
    },
    768: {
        items: 3,
        margin: 10,
    },
    1000: {
        items: 4,
        margin: 10,
    }
}

const ToStay = () => {
    // Bringing the hotels state from the Main context and saved into variable name 'places'
    const { hotels: places  } = useContext(MainContext);

    return ( 
        <>
            {!places || places?.length < 1 ? (
                // if places list is empty, render a Loader
                <PlaceCardLoader />
            ) : (
                // Places are ready, hence the element below is render
                <div className="container mx-auto p-4">
                    <h2 className="font-semibold text-lg md:text-2xl">
                        Place to Stay
                    </h2>
                    <p className="text-sm text-dark mb-2">
                        These are some places you might want to visit
                    </p>

                    {/* OwlCarousel to Render Places in Carousel */}
                    <div className="relative -left-[20px]">
                        <OwlCarousel nav stagePadding={20} 
                            navClass={["navStyle", "navStyle"]} 
                            navContainerClass="navContainerStyle" 
                            responsive={responsive} 
                            slideBy={4}
                            navText={[
                                `<svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>`,
                                `<svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>`
                            ]}
                        >
                            {/* Mapping through the Places Object, a place card is rendered for each data */}
                            {places?.map((place, index) => (
                                // Place card receives each place as prop
                                <PlaceCard key={index} place={place} type="hotels" />
                            ))}
                            {/* --- */}
                        </OwlCarousel>
                    </div>
                    {/* --- */}
                </div>
            )}
        </>
     );
}
 
export default ToStay;