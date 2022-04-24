import { useState } from "react";
import { Navbar, WhereTo, ToVisit, ToEat, ToStay, Footer } from '../components';
import travelerChoiceBg from "../img/tc_cards_desktop.jpeg";
import travelerChoiceBgSM from "../img/tc_cards_tablet.jpeg";
import botb from "../img/botb_mark.svg";

const Home = () => {
    const [toggle, setToggle] = useState({
        toGo: true,
        toDo: false,
        toStay: false
    })

    return ( 
        <>
            <Navbar sticky />
            <WhereTo />
            <ToVisit />
            <ToEat />
            <ToStay />

            <div className="bg-[#004f32]">
                <div className="container mx-auto mmd:grid mmd:grid-cols-12 h-[400px] sm:h-[500px] mmd:h-[600px] overflow-hidden">
                    <div className="col-span-3 text-center py-6 flex flex-col items-center justify-center p-4 md:p-2">
                        <img src={botb} alt=""  className="h-16 lg:h-20 mb-5 lg:mb-10" />
                        <h2 className="text-white font-bold text-2xl md:text-[2.15em]">
                            Travelers' Choice Best of the Best
                        </h2>
                        <button className="rounded-full bg-black hover:bg-gray-600 transition ease-out duration-200 text-white w-fit py-2 sm:py-3 px-3 sm:px-4 mt-5 lg:mt-14">
                            <p className="font-semibold text-sm">
                                See the winners
                            </p>
                        </button>
                    </div>
                    <div className="hidden mmd:block h-full col-span-9 bg-cover" style={{backgroundImage: `url(${travelerChoiceBg})`}}/>
                    <div className="block mmd:hidden h-full bg-contain bg-top" style={{backgroundImage: `url(${travelerChoiceBgSM})`, backgroundRepeat: 'no-repeat'}} />
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <h2 className="font-bold text-lg md:text-2xl my-5">
                    Trending in Travel
                </h2>
                <div>
                    <div className="flex text-sm md:text-base space-x-4 md:space-x-8 whitespace-nowrap overflow-x-auto travel_toggle">
                        <h3 className={`${toggle.toGo ? 'border-black' : 'border-transparent'} font-medium mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
                            onClick={() => setToggle({toGo: true, toDo: false, toStay: false})}
                        >
                            Places to Go
                        </h3>
                        <h3 className={`${toggle.toDo ? 'border-black' : 'border-transparent'} font-medium mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
                            onClick={() => setToggle({toGo: false, toDo: true, toStay: false})}
                        >
                            Things to Do
                        </h3>
                        <h3 className={`${toggle.toStay ? 'border-black' : 'border-transparent'} font-medium mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
                            onClick={() => setToggle({toGo: false, toDo: false, toStay: true})}
                        >
                            Places to Stay
                        </h3>
                    </div>
                    <div>
                        {toggle.toGo && (
                            <div className="grid grid-cols-12">
                                {["Las Vegas Hotels", "Destin Hotels", "Myrtle Beach Hotels", "Gatlinburg Hotels", "Walt Disney World Hotels",
                                "Orlando Hotels", "Ocean City Hotels", "Panama City Beach Hotels", "Branson Hotels", "Seattle Hotels",
                                "Turks and Caicos Hotels", "Mazatlan Hotels", "Amalfi Coast Hotels", "Miami Beach Hotels", "Fort Lauderdale Hotels",
                                "South Padre Island Hotels", "Jackson Hotels", "Yosemite National Park Hotels", "South Lake Tahoe Hotels"]
                                    .map((item, i) => (
                                        <a key={i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:underline mb-1" href="#">
                                            { item }
                                        </a>
                                    ))
                                }
                            </div>
                        )}
                        {toggle.toDo && (
                            <div className="grid grid-cols-12">
                                {["Things to Do in Atlanta", "Things to Do in Austin", "Things to Do in Denver", "Things to Do in Kansas City",
                                "Things to Do in Gatlinburg", "Things to Do in Asheville", "Things to Do in Pigeon Forge", "Things to Do in Philadelphia",
                                "Things to Do in Santa Barbara", "Things to Do in Myrtle Beach", "Things to Do in Jacksonville", "Things to Do in Colorado",
                                "Things to Do in Lake Tahoe (California)", "Things to Do in Fredericksburg", "Things to Do in California", "Things to Do in Puerto Rico",
                                "Things to Do in Rome", "Things to Do in Venice", "Things to Do in Edinburgh", "Things to Do in Niagara Falls"]
                                    .map((item, i) => (
                                        <a key={i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:underline mb-1" href="#">
                                            { item }
                                        </a>
                                    ))
                                }
                            </div>
                        )}
                        {toggle.toStay && (
                            <div className="grid grid-cols-12">
                                {["Beaches Turks & Caicos", "Moon Palace Cancun", "Majestic Elegance Costa Mujeres", "Hyatt Ziva Cancun", "Moon Palace Jamaica", "Dreams Punta Cana Resort & Spa",
                                "Disney's Grand Floridian Resort & Spa", "Majestic Mirage Punta Cana", "Planet Hollywood Cancun", "Barcelo Aruba", "Sheraton Waikiki", "Finest Playa Mujeres", "Hyatt Ziva Cap Cana",
                                "JW Marriott Marco Island Beach Resort", "Wyndham Alltra Cancun", "Atelier Playa Mujeres", "Hotel Riu Palace Cabo San Lucas", "Grand Hyatt Baha Mar", "The Venetian Resort", "Hyatt Ziva Puerto Vallarta",
                                "Barcelo Maya Riviera", "Grand Velas Riviera Maya", "Hard Rock Hotel Cancun", "The Ritz-Carlton Orlando, Grande Lakes", "Sandos Caracol Eco Resort", "Hyatt Ziva Los Cabos", "Grand Fiesta Americana Coral Beach",
                                "Hard Rock Hotel Riviera Maya", "Andaz Maui At Wailea Resort", "Caribe Hilton", "Live Aqua Beach Resort Cancun", "Iberostar Selection Cancun", "Hyatt Zilara Cancun", "Hilton Playa del Carmen",
                                "Ka'anapali Beach Hotel", "Paris Las Vegas", "Planet Hollywood Resort & Casino", "Club Med Sandpiper Bay", "Hyatt Zilara Cap Cana", "Beloved Playa Mujeres", "Hilton Hawaiian Village Waikiki Beach Resort"]
                                    .map((item, i) => (
                                        <a key={i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:underline mb-1" href="#">
                                            { item }
                                        </a>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

        </>
     );
}
 
export default Home;