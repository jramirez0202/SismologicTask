import axios from 'axios';

const fetchUsgsData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/earthquakes');
    return response.data.data;
  } catch (error) {
    console.error('Error getting earthquake data:', error);
    return null;
  }
};

export default { fetchUsgsData };