import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import {
  fetchBeer,
  setFilters,
  setFilterStatus,
  setStatus,
} from '../../../store/actions/actions';
import {
  ALCOHOL_VOLUME_MIN,
  EBC_COLOR_MIN,
  IBU_MIN,
} from '../../../constants/beerConstants';
import { STATE_STATUS_BUSY } from '../../../constants/stateConstants';
import { selectFavorites } from '../../../store/selectors/selectors';
import { Filters } from '../Filters/Filters';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState({
    abv: ALCOHOL_VOLUME_MIN,
    ebc: EBC_COLOR_MIN,
    ibu: IBU_MIN,
  });
  const [displayFilters, setDisplayFilters] = useState(false);
  const dispatch = useDispatch();
  const textInput = useRef(null);
  const favorites = useSelector(selectFavorites);

  function handleSearch() {
    dispatch(setStatus({ status: STATE_STATUS_BUSY }));
    dispatch(fetchBeer({ query, favorites }));
    textInput.current.blur();
    setDisplayFilters(true);
  }

  function handleKeyboard(e) {
    setQuery(e.target.value);
  }

  function handleSlider(e, type) {
    const newValue = Number(e.target.value);
    switch (type) {
      case 'abv':
        setFilter({ ...filter, abv: newValue });
        break;
      case 'ibu':
        setFilter({ ...filter, ibu: newValue });
        break;
      case 'ebc':
        setFilter({ ...filter, ebc: newValue });
        break;
      default:
        return;
    }
    dispatch(setFilters({ filters: filter }));
    dispatch(setFilterStatus({ filterStatus: displayFilters }));
    e.target.title = e.target.value;
  }

  return (
    <section className="searchbar">
      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={textInput}
          className="search__input"
          value={query}
          onChange={handleKeyboard}
          placeholder="Search beers..."
        />
        <button
          className="search__button button button_transparent"
          onClick={handleSearch}
        >
          <SearchIcon />
        </button>
      </form>

      {displayFilters ? (
        <Filters filter={filter} handleSlider={handleSlider} />
      ) : null}
    </section>
  );
}
