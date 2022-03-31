import axios from "axios";

const URI = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const options = {
    params: {
      bl_latitude: '11.847676',
      tr_latitude: '12.838442',
      bl_longitude: '109.095887',
      tr_longitude: '109.149359'
    },
    headers: {
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      'X-RapidAPI-Key': 'a2a854c193msh6b3b744a6856009p165adfjsn28164ba8122d'
    }
  };

export const getPlaces = async () => {
    try {
        const { data: { data } } = await axios.get(URI, options);
        return data
    } catch (error) {
        console.log(error);
    }
}