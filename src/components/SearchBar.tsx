import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <form className="max-w-lg w-72 mb-4 mx-auto">
      <div className="flex">
        <button
          id="dropdown-button"
          onClick={toggleDropdown}
          data-dropdown-toggle="dropdown"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
        >
          {selectedCategory}
          <ChevronDown className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" />
        </button>
        {isDropdownOpen && (
          <div
            id="dropdown"
            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-gray-700 absolute mt-10"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {[
                "All",
                "Technical",
                "Discipline",
                "Art",
                "Photography",
                "Fashion Design",
              ].map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className="inline-flex w-full px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search..."
            required
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
