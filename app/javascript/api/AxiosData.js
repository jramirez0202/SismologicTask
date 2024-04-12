import axios from 'axios';

const fetchUsgsData = async (currentPage, filter,dataPerPage ) => {
  try {
    let url 
    if (filter.length) {
      url = `http://localhost:3000/api/v1/features?&page=${currentPage}&per_page=${dataPerPage}&filters[mag_type]=${filter.join(',')}`
    } else {
      url = `http://localhost:3000/api/v1/features?&page=${currentPage}&per_page=${dataPerPage}`
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error getting feature data:', error);
    return null;
  }
};

const fetchFilter = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/filters');
    return response.data;
  } catch (error) {
    console.error('Error getting feature data:', error);
    return null;
  }
};

export default { fetchUsgsData, fetchFilter };