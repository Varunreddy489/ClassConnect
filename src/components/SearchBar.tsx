import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <form className="max-w-lg   mb-4 mx-auto">
      <Input type="search" placeholder="Search..." />
    </form>
  );
};

export default SearchBar;
