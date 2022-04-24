import axios from "axios";

export const getPlacesByBounds = async (type, sw, ne, source) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng
          },
          headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
          }
        }, { cancelToken: source.token });
        return data;
    } catch (error) {
        if (axios.isCancel(error)) {
          console.log('axios Call Cancelled!');
        } else {
          throw error;
        }
    }
}

export const getPlacesByLatLng = async (type, lat, lng, params, source) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`, {
      params: {
        latitude: lat,
        longitude: lng,
        ...params
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
      }
    }, { cancelToken: source.token });
    return data;
  } catch (error) {
    if (axios.isCancel(error)){
      console.log('axios Call Cancelled!');
    } else {
      throw error
    }
  }
}

export const getPlaceDetails = async (type, location_id, source) => {
  try {
    const { data } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/get-details`, {
      params: {
        location_id: location_id
      }, 
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
      }
    }, { cancelToken: source.token });
    return data;
  } catch (error) {
    if (axios.isCancel(error)){
      console.log('axios Call Cancelled!');
    } else {
      throw error
    }
  }
}

export const getPlaceReviews = async (location_id, source) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/reviews/list`, {
      params: {
        location_id: location_id,
        limit: 20
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
      }
    }, { cancelToken: source.token });
    return data;
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('axios Call Cancelled');
    } else {
      throw error;
    }
  }
}

export const getPlacePhotos = async (location_id, count = 10) => {
  const abortControl = new AbortController();
  try {
    const { data: { data } } = await axios.get('https://travel-advisor.p.rapidapi.com/photos/list', {
      params: {
        location_id: location_id,
        limit: count
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
      }
    }, { signal: abortControl.signal })
    return data;
  } catch (error) {
    console.error(error)
    abortControl.abort()
  }
}

export const searchPlaces = async (location, params, source) => {
  try {
    const { data: { data } } = await axios.get('https://travel-advisor.p.rapidapi.com/locations/search', {
      params: {
        query: location,
        ...params
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
      }
    }, { cancelToken: source.token })
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('axios Call Cancelled');
    } else {
      throw error;
    }
  }
}
