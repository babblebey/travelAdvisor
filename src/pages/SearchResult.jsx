import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Footer, Navbar, SearchResultCard } from "../components";
import { searchPlaces } from "../api";
import ReactStarsRating from "react-awesome-stars-rating";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchResultLoader } from "../components/loaders";

const SearchResult = () => {
    const { search } = useLocation();
    const history = useHistory();
    const queryParams = new URLSearchParams(search);
    const [location, setLocation] = useState(queryParams.get("location"));
    const [term, setTerm] = useState(location);
    const [searchResults, setSearchResults] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [scrolled, setScrolled] = useState(false);
    document.addEventListener('scroll', () => window.scrollY > 100 ? setScrolled(true) : setScrolled(false));

    useEffect(() => {
        let source = axios.CancelToken.source()
        setIsLoading(true)
        searchPlaces(location, { limit: 30 }, source)
            .then(data => {
                console.log(data);
                setIsLoading(false);
                setSearchResults(data);
            }).catch(err => console.log(err))

        return () => {
            source.cancel()
        }
    }, [location])

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/search?location=${term}`);
        setLocation(term)
    }

    return ( 
        <>
            <Navbar border />
            <div className="relative">
                <div className={`bg-white sticky-top ${scrolled && 'shadow'} z-10`}>
                    <form className="container mx-auto p-4 flex space-x-2" onSubmit={handleSubmit}>
                        <div className="relative w-full">
                            <input type="text"
                                className="w-full border rounded-sm pl-10 pr-4 py-2 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none"  
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-3 left-3 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <button className="bg-secondary py-2 px-3 md:px-6 rounded-sm hidden sm:inline cursor-pointer hover:bg-cyan-400 transition ease-in duration-200">
                            <p className="font-semibold">
                                Search
                            </p>
                        </button>
                    </form>
                </div>

                { !searchResults || isLoading ? (
                    <SearchResultLoader />
                ) : (
                    <>
                        <div className="container mx-auto p-4">
                            <div className="border shadow">
                                <div className="border-b p-4">
                                    <h2 className="font-semibold text-xl">
                                        Top result match "{ location }"
                                    </h2>
                                </div>
                                
                                <div>
                                    { searchResults?.filter(result => result.is_top_result).map((result, i)  => (
                                        <SearchResultCard key={i} result={result} />
                                    )) }
                                </div>
                            </div>
                        </div>


                        <div className="container mx-auto p-4">
                            <div className="border shadow">
                                <div className="border-b p-4">
                                    <h2 className="font-semibold text-xl">
                                        More results matching "{ location }"
                                    </h2>
                                </div>
                                
                                <div>
                                    { searchResults?.filter(result => !result.is_top_result).map((result, i)  => (
                                       <SearchResultCard key={i} result={result} />
                                    )) }
                                </div>
                            </div>
                        </div>  
                    </>
                ) }

            </div>

            <Footer />
        </>
     );
}
 
export default SearchResult;