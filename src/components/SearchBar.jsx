export default function SearchBar({ value, onChange, cuisines = [], selectedCuisine, onCuisineChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search restaurants by name..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <select value={selectedCuisine || ""} onChange={e => onCuisineChange(e.target.value)}>
        <option value="">All cuisines</option>
        {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}

// import React from "react";

// export default function SearchBar({ query, setQuery, cuisineOptions, selectedCuisine, setSelectedCuisine }) {
//   return (
//     <div className="searchbar">
//       <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search restaurants..." />
//       <select value={selectedCuisine} onChange={e => setSelectedCuisine(e.target.value)}>
//         <option value="">All cuisines</option>
//         {cuisineOptions.map(c => <option key={c} value={c}>{c}</option>)}
//       </select>
//     </div>
//   );
// }
