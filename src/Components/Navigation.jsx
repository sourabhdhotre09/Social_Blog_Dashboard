import React from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../features/searchSlice";

const Navigation = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="bg-gray-800 p-4 sticky top-0">
      <div className="container mx-auto">
        <nav className=" text-white flex justify-between items-center">
          <h1 className="font-bold m-0">Social Blog Dashboard</h1>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded text-black w-50" // Added text-black here
            onChange={handleSearchChange}
          />
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
