import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import {
  fetchBeer,
  setFilters,
  setFilterStatus,
} from '../../../store/actions/actions';
import {
  ALCOHOL_VOLUME_MAX,
  ALCOHOL_VOLUME_MIN,
  EBC_COLOR_MAX,
  EBC_COLOR_MIN,
  IBU_MAX,
  IBU_MIN,
} from '../../../constants/beerConstants';

export function SearchBar() {
  const [query, setQuery] = useState('punk');
  const [filter, setFilter] = useState({
    abv: ALCOHOL_VOLUME_MIN,
    ebc: EBC_COLOR_MIN,
    ibu: IBU_MIN,
  });
  const [displayFilters, setDisplayFilters] = useState(false);
  const dispatch = useDispatch();
  const textInput = useRef(null);

  function handleSearch(e) {
    dispatch(fetchBeer({ query }));
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
        <section className="filter-sliders">
          <h2 className="filter__header">Filter results</h2>

          <article className="filter-sliders__article">
            <p>Alcohol by volume</p>
            <section className="slider-section">
              <p>{filter.abv}</p>
              <input
                type="range"
                min={ALCOHOL_VOLUME_MIN}
                max={ALCOHOL_VOLUME_MAX}
                defaultValue={ALCOHOL_VOLUME_MIN}
                className="filter-slider"
                id="abv"
                step={0.1}
                onInput={(e) => handleSlider(e, 'abv')}
              ></input>
            </section>
          </article>

          <article className="filter-sliders__article">
            <p>International bitterness units</p>
            <section className="slider-section">
              <p>{filter.ibu}</p>
              <input
                type="range"
                min={IBU_MIN}
                max={IBU_MAX}
                defaultValue={IBU_MIN}
                className="filter-slider"
                id="ibu"
                onInput={(e) => handleSlider(e, 'ibu')}
              ></input>
            </section>
          </article>

          <article className="filter-sliders__article">
            <p>Color by EBC</p>
            <section className="slider-section">
              <p>{filter.ebc}</p>
              <input
                type="range"
                min={EBC_COLOR_MIN}
                max={EBC_COLOR_MAX}
                defaultValue={EBC_COLOR_MIN}
                className="filter-slider"
                id="ebc"
                onInput={(e) => handleSlider(e, 'ebc')}
              ></input>
            </section>
          </article>
        </section>
      ) : null}
    </section>
  );
}