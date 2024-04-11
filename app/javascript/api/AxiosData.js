import axios from 'axios';

const fetchUsgsData = async (currentPage) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/earthquakes?&page=${currentPage}`);
    return response.data;
  } catch (error) {
    console.error('Error getting earthquake data:', error);
    return null;
  }
};

export default { fetchUsgsData };