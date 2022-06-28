import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Footer, Navbar, SearchResultCard } from "../components";
import { searchPlaces } from "../api";
import axios from "axios";
import { SearchResultLoader } from "../components/loaders";

const SearchResult = () => {
    const history = useHistory();
    
    // Destructuring the 'search' property from the useLocation() hook object
    const { search } = useLocation();
    
    // Instantiating a URLSearchParams passing on the search property
    const queryParams = new URLSearchParams(search);
    
    // Setting the 'location' property from derived search param to a new 'location' state
    const [location, setLocation] = useState(queryParams.get("location"));

    // Search Term state for form input field with current 'location; state value as default 
    const [term, setTerm] = useState(location);
    
    // Search Result State
    const [searchResults, setSearchResults] = useState();

    // a Loading State
    const [isLoading, setIsLoading] = useState(false);

    // Navigation Bar Scrolled state with Event Listener
    const [scrolled, setScrolled] = useState(false);
    document.addEventListener('scroll', () => window.scrollY > 100 ? setScrolled(true) : setScrolled(false));

    // Effect to fetch search result for componnt from the 'searchPlaces' endpoint, effect is reran on change of 'location' state
    useEffect(() => {
        let source = axios.CancelToken.source();

        // Setting loading state to true while data is being fetched from endpoint
        setIsLoading(true);

        // Calling the 'searchPlaces' endppoint passing in the 'location', 'limit' paramter and 'source' for error handling
        searchPlaces(location, { limit: 30 }, source)
            .then(data => {
                // Search Result data is received and set to the 'searchResult' state
                setSearchResults(data);
                
                // Setting Loading state back to false to stop loading
                setIsLoading(false);
            }).catch(err => console.log(err))

        // Effect Cleanup
        return () => {
            source.cancel()
        }
    }, [location])

    // Search Form Submission Handle Funtion
    const handleSubmit = (e) => {
        // Prevent Page from reloading on form submission
        e.preventDefault()

        // Setting search term as value to the 'location' state
        setLocation(term)

        // Router route the page to a new url with the new search term set as value to 'location' in url parameter
        history.push(`/search?location=${term}`);
    }

    return (    
        <>
            {/* Navbar with Border */}
            <Navbar border />
            {/* --- */}
            
            <div className="relative">
                {/* Search Form */}
                <div className={`bg-white sticky-top ${scrolled && 'shadow'} z-30`}>
                    {/* The Search form - with reference to the 'handleSubmit' as submit function */}
                    <form className="container mx-auto p-4 flex space-x-2" onSubmit={handleSubmit}>
                        <div className="relative w-full">
                            {/* Search Input Field */}
                            <input type="text"
                                className="w-full border rounded-sm pl-10 pr-4 py-2 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none"  
                                // Search Term value
                                value={term}

                                // onChange Event to update search Term value 
                                onChange={(e) => setTerm(e.target.value)}
                            />
                            {/* --- */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-3 left-3 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {/* Submit Button */}
                        <button className="bg-secondary py-2 px-3 md:px-6 rounded-sm hidden sm:inline cursor-pointer hover:bg-cyan-400 transition ease-in duration-200">
                            <p className="font-semibold">
                                Search
                            </p>
                        </button>
                        {/* --- */}
                    </form>
                    {/* --- */}
                </div>
                {/* --- */}

                {/* Search result Area */}
                { !searchResults || isLoading ? (
                    // If there are not items in 'searchResults' state or the 'isLoading' state is true - Then the Search result loader below is render
                    <SearchResultLoader />
                ) : (
                    // If 'searchResults' is found and 'isLoading' state is false - then searchResult elements is rendered
                    <>
                        {/* Top Result - Search Result  */}
                        <div className="container mx-auto p-4">
                            <div className="border shadow">
                                <div className="border-b p-4">
                                    <h2 className="font-semibold text-xl">
                                        Top result match "{ location }"
                                    </h2>
                                </div>
                                
                                {/* Result Object rendered here only if 'is_top_result' property is true */}
                                <div>
                                    {/* Mapping through Search result - filtering in only results that 'is_top_result' */}
                                    { searchResults?.filter(result => result?.is_top_result).map((result, i)  => (
                                        // Rendering a SearchResultCard component for each search result
                                        <SearchResultCard key={i} result={result} />
                                    )) }
                                    {/* --- */}
                                </div>
                                {/* --- */}
                            </div>
                        </div>
                        {/* --- */}

                        {/* More Matching Results - Search Result */}
                        <div className="container mx-auto p-4">
                            <div className="border shadow">
                                <div className="border-b p-4">
                                    <h2 className="font-semibold text-xl">
                                        More results matching "{ location }"
                                    </h2>
                                </div>
                                
                                {/* Result Object rendered here only if 'is_top_result' property is false */}
                                <div>
                                    {/* Mapping through Search result - filtering in only results that is not top result */}
                                    { searchResults?.filter(result => !result?.is_top_result).map((result, i)  => (
                                        // Rendering a SearchResultCard component for each search result
                                       <SearchResultCard key={i} result={result} />
                                    )) }
                                    {/* --- */}
                                </div>
                                {/* --- */}
                            </div>
                        </div>
                        {/* --- */}
                    </>
                ) }

            </div>

            {/* Footer Component */}
            <Footer />
            {/* --- */}
        </>
     );
}
 
export default SearchResult;