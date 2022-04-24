const PlaceDetailsLoader = () => {
    return (
        <div className="container mx-auto p-4 space-y-3 animate-pulse duration-75">
            <div className="h-8 w-10/12 md:w-8/12 bg-gray-300 shadow-sm" />
            
            <div className="w-full md:w-5/12 grid grid-cols-6 gap-2">
                <div className="h-3 w-full col-span-2 bg-gray-300 shadow-sm" />
                <div className="h-3 w-full hidden md:block col-span-2 bg-gray-300 shadow-sm" />
                <div className="h-3 w-full hidden md:block col-span-2 bg-gray-300 shadow-sm" />
            </div>

            <div className="w-full md:w-11/12 grid grid-cols-12 gap-2">
                <div className="h-3 w-full col-span-6 bg-gray-300 shadow-sm" />
                <div className="h-3 w-full col-span-2 bg-gray-300 shadow-sm" />
                <div className="h-3 w-full col-span-2 bg-gray-300 shadow-sm" />
                <div className="h-3 w-full col-span-2 bg-gray-300 shadow-sm" />
            </div>

            <div className="h-[300px] w-full bg-gray-300 shadow-sm" />

            <div className="grid grid-cols-3 md:hidden gap-3">
                <div className="h-[100px] col-span-1 bg-gray-300 shadow-sm" />
                <div className="h-[100px] col-span-1 bg-gray-300 shadow-sm" />
                <div className="h-[100px] col-span-1 bg-gray-300 shadow-sm" />
            </div>

            <div className="h-4 w-full md:w-4/12 bg-gray-300 shadow-sm" />

            <div className="h-3 w-full bg-gray-300 shadow-sm" />
            <div className="h-3 w-full bg-gray-300 shadow-sm" />
            <div className="h-3 w-11/12 bg-gray-300 shadow-sm" />
            <div className="h-3 w-full bg-gray-300 shadow-sm" />
            <div className="h-3 w-10/12 bg-gray-300 shadow-sm" />

            <div className="hidden md:grid grid-cols-3 gap-3">
                <div className="h-[300px] col-span-1 bg-gray-300 shadow-sm" />
                <div className="h-[300px] col-span-1 bg-gray-300 shadow-sm" />
                <div className="h-[300px] col-span-1 bg-gray-300 shadow-sm" />
            </div>
        </div>
    );
}
 
export default PlaceDetailsLoader;