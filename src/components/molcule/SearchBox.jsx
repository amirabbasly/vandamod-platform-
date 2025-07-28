import SearchButton from "../atom/SearchButton";
import Input from "../atom/Input";
const SearchBox = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="bg-gray-200 pr-8 rounded-xl py-[1.5]">
      <Input text="جستجو کن..." padding="8px 12px 8px 20em" />
      <SearchButton color="black" size={20} />
    </div>
  );
};

export default SearchBox;