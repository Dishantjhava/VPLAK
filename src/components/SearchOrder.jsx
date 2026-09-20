import React, { useState } from 'react';

export default function SearchOrder({
  searchBy: controlledSearchBy,
  query: controlledQuery,
  onSearch,
  onSearchByChange,
  onQueryChange,
  initialSearchBy = 'name',
  initialQuery = '',
}) {
  const [internalSearchBy, setInternalSearchBy] = useState(initialSearchBy);
  const [internalQuery, setInternalQuery] = useState(initialQuery);

  const searchBy = controlledSearchBy !== undefined ? controlledSearchBy : internalSearchBy;
  const query = controlledQuery !== undefined ? controlledQuery : internalQuery;

  const handleSearchByChange = (newSearchBy) => {
    if (controlledSearchBy === undefined) setInternalSearchBy(newSearchBy);
    if (onSearchByChange) onSearchByChange(newSearchBy);
    if (onSearch) onSearch({ searchBy: newSearchBy, query });
  };

  const handleQueryChange = (newQuery) => {
    if (controlledQuery === undefined) setInternalQuery(newQuery);
    if (onQueryChange) onQueryChange(newQuery);
    if (onSearch) onSearch({ searchBy, query: newQuery });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSearch) {
      onSearch({ searchBy, query });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <section className="w-full max-w-3xl mb-6" data-purpose="search-container">
      <form onSubmit={handleSubmit} className="search-pill-container p-2">
        <fieldset className="search-fieldset flex flex-wrap items-center justify-between gap-2">
          <legend>Search Order</legend>

          {/* Radio Filters & Search Input Container */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-semibold text-gray-700">
            <span className="text-gray-600 font-normal mr-1">By</span>

            <label className="inline-flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="search_by"
                value="orderid"
                checked={searchBy === 'orderid'}
                onChange={(e) => handleSearchByChange(e.target.value)}
                className="text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-gray-400"
              />
              <span className="text-xs text-gray-700 font-normal">OrderId</span>
            </label>

            <label className="inline-flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="search_by"
                value="mobile"
                checked={searchBy === 'mobile'}
                onChange={(e) => handleSearchByChange(e.target.value)}
                className="text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-gray-400"
              />
              <span className="text-xs text-gray-700 font-normal">Mobile</span>
            </label>

            <label className="inline-flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="search_by"
                value="name"
                checked={searchBy === 'name'}
                onChange={(e) => handleSearchByChange(e.target.value)}
                className="text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-gray-400"
              />
              <span className="text-xs text-gray-700 font-normal">Name</span>
            </label>

            <label className="inline-flex items-center gap-1 cursor-pointer mr-2">
              <input
                type="radio"
                name="search_by"
                value="email"
                checked={searchBy === 'email'}
                onChange={(e) => handleSearchByChange(e.target.value)}
                className="text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-gray-400"
              />
              <span className="text-xs text-gray-700 font-normal">Email</span>
            </label>

            {/* Search Input Box */}
            <input
              type="text"
              name="query"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="search..."
              className="bg-[#adadad] text-gray-800 placeholder-gray-600 rounded-full px-4 py-1 text-xs border-none focus:ring-1 focus:ring-gray-400 w-44 md:w-56"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-search-glossy text-white font-bold text-xs uppercase px-5 py-1.5 rounded-full tracking-tight transition-transform active:scale-95 cursor-pointer"
          >
            Search Order
          </button>
        </fieldset>
      </form>
    </section>
  );
}
