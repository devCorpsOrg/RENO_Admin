import React, { useState } from "react";
import search from "./Assets/search.png";

function Table({
  columns,
  data,
  pageSize,
  greenButtonText,
  blackButtonText,
  blackClicked,
  greenClicked,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const pageCount = Math.ceil(data.length / pageSize);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <>
      <div className="p-5 table-container">
        <div className="flex justify-between items-center mb-5">
          <div className="w-1/3 relative">
            <input
              type="text"
              placeholder="Search"
              className="shadow-md border-gray-100 border-2 rounded-md py-3 pl-5 pr-10 w-full"
              onChange={handleSearchChange}
            />
            <img
              src={search}
              alt="search"
              className="absolute top-3 right-3 pointer-events-auto"
            />
          </div>
          <div className="flex flex-row gap-6">
            {blackButtonText && (
              <div>
                <button
                  onClick={blackClicked}
                  className="bg-[#2B2B2B] rounded hover:bg-gray-600 w-auto text-white font-bold py-3 px-8 rounded-sm">
                  {blackButtonText}
                </button>
              </div>
            )}
            {greenButtonText && (
              <div>
                <button
                  onClick={greenClicked}
                  className="bg-[#8FC743] rounded hover:bg-lime-700 text-white w-auto font-bold py-3 px-8 rounded-sm">
                  {greenButtonText}
                </button>
              </div>
            )}
          </div>
        </div>
        <table className="table w-full table-auto text-left">
          <thead className="h-10">
            <tr className="bg-[#2B2B2B] text-white">
              {columns.map((column) => (
                <th key={column.accessor} className="px-5 py-5 border-b ">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={`bg-${index % 2 === 0 ? "white" : "gray-100"}`}>
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className="px-5 py-5 border-b border-gray-300">
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination absolute bottom-0 left-0 right-0 flex justify-end p-5 gap-3">
        <button
          className={`px-4 border-2 rounded-md ${
            currentPage === 0
              ? "bg-[#DDDEF9] text-gray-500 cursor-default"
              : "bg-white text-gray-700 "
          }`}
          disabled={currentPage === 0}
          onClick={handlePreviousPage}>
          {"<"} Prev
        </button>
        <span className="px-4 py-2">{`${currentPage + 1} - ${pageCount}`}</span>
        <button
          className={`px-4 border-2 rounded-md ${
            currentPage === pageCount - 1
              ? "bg-[#DDDEF9] text-gray-500 cursor-default"
              : "bg-white text-gray-700"
          }`}
          disabled={currentPage === pageCount - 1}
          onClick={handleNextPage}>
          Next {">"}
        </button>
      </div>
    </>
  );
}

export default Table;

// At the time of API :
// 1 . Save the API data in a useState function.
// 2 . Then use the data from the state variable.
// 3 . Make the columns object in the component you want to call the "Table UI".
