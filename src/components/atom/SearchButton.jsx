import { FaSearch } from "react-icons/fa";

const SearchButton = ({ color = "black", size = 24 }) => {
  return <FaSearch size={size} color={color} />;
};

export default SearchButton;  