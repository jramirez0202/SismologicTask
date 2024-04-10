import React, { useState, useEffect } from 'react';
import AxiosData from '../../../api/AxiosData';


const EarthquakeTable = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AxiosData.fetchUsgsData();
      if (data) {
        setEarthquakes(data);
        setLoading(false);
      } else {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2>Tabla de Terremotos</h2>
      <a href="http://localhost:3000/api/v1/earthquakes">endPoint</a>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center">
            <th scope="col">ID</th>
            <th scope="col" className="px-6 py-3">kjjjjk</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Place</th>
            <th scope="col" className="px-6 py-3">Time</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Tsunami</th>
            <th scope="col" className="px-6 py-3">Mag Type</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Title</th>
            <th scope="col" className="px-6 py-3">Longitude/Latitude</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">URL</th>

          </tr>
        </thead>
        <tbody>
          {earthquakes.length > 0 ? (
            earthquakes.slice(0, 25).map(({ id, attributes, links }) => (
              <tr key={id} className="border-b border-gray-200 dark:border-gray-700 text-center">
                <td className="px-6 py-4">{id}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{attributes.magnitude}</td>
                <td className="px-6 py-4">{attributes.place}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{attributes.time}</td>
                <td className="px-6 py-4">{attributes.tsunami ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{attributes.mag_type}</td>
                <td className="px-6 py-4">{attributes.title}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{attributes.coordinates ? `  Long: ${attributes.coordinates.longitude}, Lat: ${attributes.coordinates.latitude}` : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={links.external_url} target="_blank" rel="noopener noreferrer">Ver la URL</a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-4">No data available</td>
            </tr>
          )} 
        </tbody>      
      </table>
    </div>
  );
};

export default EarthquakeTable;

