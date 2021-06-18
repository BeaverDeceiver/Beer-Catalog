import React, { useState, useRef } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
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
import './Searchbar.css';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState({
    abv_gt: ALCOHOL_VOLUME_MIN,
    ebc_gt: EBC_COLOR_MIN,
    ibu_gt: IBU_MIN,
  });
  const [displayFilters, setDisplayFilters] = useState(false);
  const dispatch = useDispatch();
  const textInput = useRef(null);
  const favorites = useSelector(selectFavorites);

  function handleSearch() {
    batch(() => {
      dispatch(setStatus({ status: STATE_STATUS_BUSY }));
      dispatch(fetchBeer({ query, favorites }));
    });
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
        setFilter({ ...filter, abv_gt: newValue });
        console.log(filter);
        break;
      case 'ibu':
        setFilter({ ...filter, ibu_gt: newValue });
        break;
      case 'ebc':
        setFilter({ ...filter, ebc_gt: newValue });
        break;
      default:
        return;
    }
    batch(() => {
      dispatch(setFilters({ filters: filter }));
      dispatch(setFilterStatus({ filterStatus: displayFilters }));
    });
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
