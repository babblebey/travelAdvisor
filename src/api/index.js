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
      'X-RapidAPI-Key': 'f93c4349f2mshc013ab6964bca9ap1b04d2jsna3010d9dca5a'
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