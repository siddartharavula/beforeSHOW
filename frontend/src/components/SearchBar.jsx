const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex w-full items-center rounded-full border border-gray-700 bg-gray-900 px-2 py-1 transition focus-within:border-green-500">
      <span className="mr-3 text-lg text-gray-500">
        ⌕
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies..."
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
      />
    </div>
  );
};

export default SearchBar;