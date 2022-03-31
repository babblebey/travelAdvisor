import { useContext } from 'react'
import { Header, Map, Sidebar } from "./components"
import { MainContext } from "./context/MainContext"

const App = () => {
  const { places, coordinates, setCoordinates, setBounds } = useContext(MainContext);

  return (
    <div className="w-full flex flex-wrap-reverse md:flex-nowrap md:h-screen">
      <div className="h-auto md:h-full w-full md:w-[35%] lg:w-[23%] md:overflow-y-scroll"> 
        <Sidebar places={places}  />
      </div>
      <div className="h-[50vh] md:h-full w-full md:w-[65%] lg:w-[79%] relative">
        <Header />
        <Map 
          setBounds={setBounds}
          setCoordinates={setCoordinates}
          coordinates={coordinates}
        />
      </div>
    </div>
  )
}

export default App
