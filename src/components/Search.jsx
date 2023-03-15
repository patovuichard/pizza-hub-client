import { useState } from 'react';

function Search(props) {

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    props.selectedPizza(event.target.value);
    props.selectedPizzeria(event.target.value);
  };

  return (
    <>
      <form className="form-floating mb-3 mt-3">
        <input
          className="form-control"
          placeholder="Search"
          name="search"
          value={searchInput}
          type="text"
          onChange={handleSearch}
        />
        <label htmlFor="search">Search </label>
      </form>
    </>
  );
}

export default Search;
