import React, { useState, useEffect, useRef } from 'react';
import AxiosData from '../../../../api/AxiosData.js';
import Pagination from '../../components/Pagination/Pagination.jsx';


const FeatureTable = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setOnSearch, setSetOnSearch] = useState('');
  const [dataPerPage, setDataPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [total_page, setTotalPage] = useState(1);
  const [filters, setFilters] = useState([]);
  const [filtersSelect, setFiltersSelect] = useState([]);
  const dataRef = useRef([])


  useEffect(() => {
    fetchData();
  }, [currentPage, filtersSelect]);

  
  useEffect(() => {
    getFilterData()
  }, []);


  useEffect(() => {
    const searchDataByTitle = dataRef.current?.filter((item) => {
      return item?.attributes?.title?.toLowerCase().includes(setOnSearch?.toLowerCase())
    })

    searchDataByTitle.length === 0 ? setFeatures(dataRef.current) : setFeatures(searchDataByTitle)

  }, [setOnSearch]);

  const fetchData = async () => {
    const data = await AxiosData.fetchUsgsData(currentPage, filtersSelect,dataPerPage);
    if (data) {
      dataRef.current = data.data
      setFeatures(data?.data);
      setTotalPage(data?.pagination?.total_page)
      setLoading(false);
    } else {
      setLoading(false); 
    }
  };

  const getFilterData = async () => {
    const data = await AxiosData.fetchFilter();
    if (data?.mag_types)  {
      setFilters(data?.mag_types)
    }
  };
  
  const onSelectFilter = (filter) => {
    setFiltersSelect(prevState => {
      const filterPrev = [...prevState]
      const index = filterPrev.indexOf(filter)

      if(index === -1) {
        filterPrev.push(filter)
      } else {
        filterPrev.splice(index, 1)
      }

      return filterPrev
    })
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="max-w-md mx-auto">   
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
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
      
    <div className="flex flex-wrap justify-center">
      {filters?.map((filter) => (
      <div key={filter} className="ml-5 mb-2 mt-2">
        <label className="text-black">
          <input
            className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5"
            type="checkbox"
            onChange={() => onSelectFilter(filter)}
          />
          <span className="ml-2">{filter}</span>
        </label>
      </div>
        ))}
    </div>
      <Pagination 
        dataPage={dataPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={total_page || 1}
      />
      {loading && <div>Loading </div>}           
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
          {features?.length > 0 ? (
            features?.map(({ id, attributes, links }) => (
              <tr key={id} className="border-b border-gray-200 dark:border-gray-700 text-center">
                <td className="px-6 py-4">{attributes.feature_id}</td>
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

export default FeatureTable;

