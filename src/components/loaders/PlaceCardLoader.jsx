const PlaceCardLoader = () => {
    return ( 
        <div className="container mx-auto px-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-3 my-12">
            <div className="md:col-span-1 group cursor-pointer space-y-3 animate-pulse duration-75">
                <div className="h-[200px] bg-gray-300 rounded-sm" />
                <div className="h-4 bg-gray-300 rounde-sm" />
                <div className="h-3 w-5/12 bg-gray-300 rounded-sm" />
            </div>
            <div className="md:col-span-1 hidden sm:block group cursor-pointer space-y-3 animate-pulse duration-75">
                <div className="h-[200px] bg-gray-300 rounded-sm" />
                <div className="h-4 bg-gray-300 rounded-sm" />
                <div className="h-3 w-5/12 bg-gray-300 rounded-sm" />
            </div>
            <div className="md:col-span-1 hidden md:block group cursor-pointer space-y-3 animate-pulse duration-75">
                <div className="h-[200px] bg-gray-300 rounded-sm" />
                <div className="h-4 bg-gray-300 rounded-sm" />
                <div className="h-3 w-5/12 bg-gray-300 rounded-sm" />
            </div>
            <div className="md:col-span-1 hidden lg:block group cursor-pointer space-y-3 animate-pulse duration-75">
                <div className="h-[200px] bg-gray-300 rounded-sm" />
                <div className="h-4 bg-gray-300 rounded-sm" />
                <div className="h-3 w-5/12 bg-gray-300 rounded-sm" />
            </div>
        </div>
     );
}
 
export default PlaceCardLoader;