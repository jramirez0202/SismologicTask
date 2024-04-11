import axios from 'axios';

const fetchUsgsData = async (currentPage, filter ) => {
  try {
    let url 
    if (filter.length) {
      console.log('hjhh', filter)
      url = `http://localhost:3000/api/v1/earthquakes?&page=${currentPage}&filters[mag_type]=${filter.join(', ')}`
    } else {
      url = `http://localhost:3000/api/v1/earthquakes?&page=${currentPage}`
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error getting earthquake data:', error);
    return null;
  }
};

const fetchFilter = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/filters');
    return response.data;
  } catch (error) {
    console.error('Error getting earthquake data:', error);
    return null;
  }
};

export default { fetchUsgsData, fetchFilter };