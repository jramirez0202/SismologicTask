import React, { useState, useEffect, useRef } from 'react';
import AxiosData from '../../../api/AxiosData';
import Pagination from '../components/Pagination/Pagination.js';


const EarthquakeTable = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setOnSearch, setSetOnSearch] = useState('');
  const [dataPerPage, setDataPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [total_page, setTotalPage] = useState(1);
  const dataRef = useRef([])


  console.log(lastIndex)
  console.log(firstIndex)
  useEffect(() => {
    fetchData();
  }, [currentPage]);


  useEffect(() => {
    const searchDataByTitle = dataRef.current?.filter((item) => {
      return item?.attributes?.title?.toLowerCase().includes(setOnSearch?.toLowerCase())
    })

    searchDataByTitle.length === 0 ? setEarthquakes(dataRef.current) : setEarthquakes(searchDataByTitle)

  }, [setOnSearch]);

  const fetchData = async () => {
    const data = await AxiosData.fetchUsgsData(currentPage);
    if (data) {
      dataRef.current = data.data
      setEarthquakes(data?.data);
      setTotalPage(data?.pagination?.total_page)
      setLoading(false);
    } else {
      setLoading(false); 
    }
  };


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="max-w-md mx-auto">   
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg> */}
              </div>
              <input 
              type="search" 
              onChange={(e) => setSetOnSearch(e.target.value)}
              value={setOnSearch}
              id="default-search" 
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Search title" required />
          </div>
      </div>
      <Pagination 
        dataPage={dataPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={total_page || 1}

      />
      {loading && <div>Loa  const lastIndex = currentPage * dataPerPage
  const firstIndex = 0 - dataPerPageding...</div>}           
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center">
            <th scope="col">ID</th>
            <th scope="col" className="px-6 py-3">Magnitude</th>
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
            earthquakes?.map(({ id, attributes, links }) => (
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
          ).slice(0, dataPerPage) : (
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

