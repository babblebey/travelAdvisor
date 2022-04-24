const AttractionsListLoader = () => {
    return ( 
        <div className="container mx-auto p-4 animate-pulse">
            <div className="block md:grid md:grid-cols-2 gap-3 space-y-3 md:space-y-0">
                <div className="h-52 rounded-sm w-full bg-gray-300" />
                <div className="h-52 rounded-sm w-full bg-gray-300" />
                <div className="h-52 hidden md:block rounded-sm w-full bg-gray-300" />
                <div className="h-52 hidden md:block rounded-sm w-full bg-gray-300" />
                <div className="h-52 hidden md:block rounded-sm w-full bg-gray-300" />
                <div className="h-52 hidden md:block rounded-sm w-full bg-gray-300" />
            </div>
        </div>
     );
}
 
export default AttractionsListLoader;