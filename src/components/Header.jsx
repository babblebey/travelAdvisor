import { Autocomplete } from "@react-google-maps/api";
import logo from '../img/logo.svg';

const Header = () => {
    return ( 
        <div className="flex items-center w-full p-2 absolute top-0 z-10">
            <div className="flex bg-white justify-between items-center w-full p-4 rounded-sm shadow-md">
                <img src={logo} alt="Traveladvisor" className="h-7 md:h-8" />

                <div className="relative">
                    {/* <Autocomplete> */}
                        <form className="group relative">
                            <svg class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" width="20" height="20" fill="currentColor"  aria-hidden="true">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                            </svg>
                            <input 
                                class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-sm py-2 pl-10 ring-1 ring-slate-200" 
                                type="text" 
                                placeholder="Search Location..." 
                            />
                        </form>
                    {/* </Autocomplete> */}
                </div>
            </div>
        </div>
     );
}
 
export default Header;