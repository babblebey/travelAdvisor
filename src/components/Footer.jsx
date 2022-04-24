import icon from '../img/icon.svg';

const Footer = () => {
    return ( 
        <div className="bg-[#faf1ed]">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-12 text-gray-800">
                    <div className="col-span-12 lg:col-span-8 space-y-2 text-dark">
                        <div className="flex space-x-3">
                            <img src={icon} alt="" className="h-10 w-10" />
                            <div className="w-fit">
                                <p className="text-xs">
                                    © 2022 TravelAdvisor LLC All rights reserved.
                                </p>
                                <div className="flex flex-wrap">
                                    {["Terms of Use", "Privacy and Cookies Statement", "Cookie consent", "Site Map", "How the site works"].map((item, i) => (
                                        <a key={i} href="#" className="text-[0.8em] md:text-sm font-bold underline mr-2">
                                            { item }
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="text-[0.7em] md:text-xs w-full space-y-3">
                            <p>
                                This is the version of our website addressed to speakers of English in the United States. If you are a resident of another country or region, please select the appropriate version of TravelAdvisor for your country or region in the drop-down menu.
                            </p>
                            <p>
                                TravelAdvisor LLC makes no guarantees for availability of prices advertised on our sites and applications. Listed prices may require a stay of a particular length or have blackout dates, qualifications or other applicable restrictions. TravelAdvisor LLC is not responsible for any content on external web sites that are not owned or operated by TravelAdvisor. Indicative hotel prices displayed on our “Explore” pages are estimates extrapolated from historic pricing data.
                            </p>
                            <p>
                                TravelAdvisor LLC is not a booking agent or tour operator. When you book with one of our partners, please be sure to check their site for a full disclosure of all applicable fees.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-8">

                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;