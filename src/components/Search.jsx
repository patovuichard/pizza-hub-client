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
      <form>
        <label htmlFor="search">Search </label>
        <input
          name="search"
          value={searchInput}
          type="text"
          onChange={handleSearch}
        />
      </form>
    </>
  );
}

export default Search;
