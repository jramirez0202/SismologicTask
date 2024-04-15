import React, { useState, useEffect, useRef } from "react";
import AxiosData from "../../../../api/AxiosData.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import FeatureComments from "../../components/FeatureComments/FeatureComments.jsx";

const FeatureCard = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setOnSearch, setSetOnSearch] = useState("");
  const [dataPerPage, setDataPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [total_page, setTotalPage] = useState(1);
  const [filters, setFilters] = useState([]);
  const [filtersSelect, setFiltersSelect] = useState([]);
  const dataRef = useRef([]);

  useEffect(() => {
    fetchData();
  }, [currentPage, filtersSelect]);

  useEffect(() => {
    getFilterData();
  }, []);

  useEffect(() => {
    const searchDataByTitle = dataRef.current?.filter((item) => {
      return item?.attributes?.title
        ?.toLowerCase()
        .includes(setOnSearch?.toLowerCase());
    });

    searchDataByTitle.length === 0
      ? setFeatures(dataRef.current)
      : setFeatures(searchDataByTitle);
  }, [setOnSearch]);

  const fetchData = async () => {
    const data = await AxiosData.fetchUsgsData(
      currentPage,
      filtersSelect,
      dataPerPage
    );
    if (data) {
      dataRef.current = data.data;
      setFeatures(data?.data);
      setTotalPage(data?.pagination?.total_page);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getFilterData = async () => {
    const data = await AxiosData.fetchFilter();
    if (data?.mag_types) {
      setFilters(data?.mag_types);
    }
  };

  const onSelectFilter = (filter) => {
    setFiltersSelect((prevState) => {
      const filterPrev = [...prevState];
      const index = filterPrev.indexOf(filter);

      if (index === -1) {
        filterPrev.push(filter);
      } else {
        filterPrev.splice(index, 1);
      }

      return filterPrev;
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="bg-[#ffff] mb-2 shadow-lg p-5">
        <div className="w-3l">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              onChange={(e) => setSetOnSearch(e.target.value)}
              value={setOnSearch}
              id="default-search"
              className="block m-22 w-full p-4 ps-10 text-sm text-gray-900 border border-[#10768488] rounded-lg   "
              placeholder="Search Country"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap ">
          {filters?.map((filter) => (
            <div key={filter} className="ml-5 mb-5 mt-5 ">
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
      </div>
      {loading && <div>Loading </div>}
      <div className="">
        {features?.length > 0 ? (
          <div className="grid grid-cols-3 gap-2  ">
            {features?.map(({ id, attributes, links, comments }) => (
              <div
                key={id}
                className="p-5 mb-1shadow-md rounded-md border-gray-200 dark:border-gray-700 bg-white"
              >
                <h2 className="text-xl font-semibold mb-2 text-[#10768488]">
                  {attributes.title}
                </h2>
                <p className="text-gray-600 mb-2">
                  Magnitude: {attributes.magnitude}
                </p>
                <p className="text-gray-600 mb-2">Place: {attributes.place}</p>
                <p className="text-gray-600 mb-2">Time: {attributes.time}</p>
                <p className="text-gray-600 mb-2">
                  Tsunami: {attributes.tsunami ? "Yes" : "No"}
                </p>
                <p className="text-gray-600 mb-2">
                  Mag Type: {attributes.mag_type}
                </p>
                <p className="text-gray-600 mb-2">
                  Coordinates:{" "}
                  {attributes.coordinates
                    ? `Long: ${attributes.coordinates.longitude}, Lat: ${attributes.coordinates.latitude}`
                    : "N/A"}
                </p>
                <a
                  href={links.external_url}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver la URL
                </a>
                <div className="flex justify-between  items-center">
                  <div>
                    {" "}
                    <FeatureComments featureId={id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
