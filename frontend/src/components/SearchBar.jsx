const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex items-center rounded-full border border-gray-700 bg-gray-900 px-4 py-3">
      <span className="mr-3 text-gray-500">⌕</span>

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