import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import logo from '../img/logo.svg';

const Header = () => {
    const [search, setSearch] = useState(false);

    return ( 
        <div className="flex items-center w-full p-2 absolute top-0 z-10">
            <div className="flex bg-white justify-between items-center w-full p-3 md:p-4 rounded-sm shadow-md">
                { !search && ( 
                    <img src={logo} alt="Traveladvisor" className="h-6 sm:h-7 md:h-8" />
                 ) }

                <div className={`relative w-full md:w-auto md:block ${!search && 'hidden'}`}>
                    {/* <Autocomplete> */}
                        <form className="group relative">
                            <svg class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" width="20" height="20" fill="currentColor"  aria-hidden="true">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                            </svg>
                            <input 
                                class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-sm py-1 md:py-2 pl-10 ring-1 ring-slate-200" 
                                type="text" 
                                placeholder="Search Location..." 
                            />
                        </form>
                    {/* </Autocomplete> */}
                </div>
                <div 
                    className="cursor-pointer md:hidden p-2 -mr-2"
                    onClick={() => search ? setSearch(false) : setSearch(true)}
                >
                    { !search ? (
                        <svg class="w-5 h-5 transition ease-out duration-1000" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    ) : (
                        <svg class="w-5 h-5 transition ease-out duration-1000" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Header;