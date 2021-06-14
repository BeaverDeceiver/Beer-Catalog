import React from 'react';
import {
  ALCOHOL_VOLUME_MAX,
  ALCOHOL_VOLUME_MIN,
  EBC_COLOR_MAX,
  EBC_COLOR_MIN,
  IBU_MAX,
  IBU_MIN,
} from '../../../constants/beerConstants';

import './filters.css';

export function Filters(props) {
  const { filter, handleSlider } = props;

  return (
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
  );
}
