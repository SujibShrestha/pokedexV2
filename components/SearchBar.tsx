"use client";

import { SearchIcon } from "lucide-react";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

function Search ({searchTerm,setSearchTerm}:SearchProps){
  const icon = <SearchIcon className="absolute top-2 left-2 text-primary flex items-center  "/>
 return (
  <div className="min-w-screen flex justify-center  ">
      <div className="relative  ">
        {icon }
        <input type="text" className="ml-10 w-[65vw] px-4 py-2 rounded-lg"
        placeholder="Enter Pokemon name" 
        value={searchTerm}
        onChange={(e)=> setSearchTerm(e.target.value)}/>
      </div>
    </div>
 )
 
};

export default Search;