import { useRef, useState, useMemo } from 'react';
import useFetchData from '../../hooks/useFetchData';

import { FaSearch } from 'react-icons/fa';
import { BiChevronLeft } from 'react-icons/bi';

import Search from '../../components/Search';
import CardGrid from '../../components/CardGrid';
import Card from '../../components/Card';

import './styles.scss';

const Home = () => {
  const searchRef = useRef(null);
  const [search, setSearch] = useState('');
  const [filterKey, setFilterKey] = useState('name');
  const { loading, error, data } = useFetchData(
    'https://restcountries.com/v2/all'
  );

  const filteredCountries = useMemo(
    () =>
      data.filter((country) =>
        country[filterKey].toLowerCase().includes(search.toLowerCase())
      ),
    [data, filterKey, search]
  );

  const handleSearch = () => {
    const { value } = searchRef.current;
    setFilterKey('name');
    setSearch(value);
  };

  const handleFilter = (e) => {
    const { value } = e.target;

    if (value) {
      setFilterKey('region');
      setSearch(value);
    }
  };

  return (
    <main className="Home">
      <Search>
        <div className="Search__bar">
          <FaSearch className="icon" />
          <input
            type="search"
            placeholder="Search for a country..."
            ref={searchRef}
            disabled={loading}
            onChange={handleSearch}
          />
        </div>
        <details
          className="Search__filter"
          onClick={(e) => loading && e.preventDefault()}
        >
          <summary>
            <span>Filter by Region</span>
            <BiChevronLeft className="icon" />
          </summary>
          <div onClick={handleFilter}>
            <button type="button" value="Africa">
              Africa
            </button>
            <button type="button" value="America">
              America
            </button>
            <button type="button" value="Asia">
              Asia
            </button>
            <button type="button" value="Europe">
              Europe
            </button>
            <button type="button" value="Oceania">
              Oceania
            </button>
          </div>
        </details>
      </Search>
      <CardGrid
        loading={loading}
        error={error}
        countries={filteredCountries}
        render={(countries) =>
          countries.length > 0 ? (
            countries.map((country) => (
              <Card
                key={country.alpha3Code}
                id={country.alpha3Code}
                img={country.flag}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
              />
            ))
          ) : (
            <p>No results found for: {search}</p>
          )
        }
      />
    </main>
  );
};

export default Home;
