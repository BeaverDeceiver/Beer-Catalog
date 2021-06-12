import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { STATE_STATUS_BUSY } from '../../../constants/stateConstants';

import {
  selectBeer,
  selectFilters,
  selectFilterStatus,
  selectStatus,
} from '../../../store/selectors/selectors';
import { BeerItem } from '../BeerItem/BeerItem';

export function BeerList() {
  const beerItems = useSelector(selectBeer);
  const shouldFilter = useSelector(selectFilterStatus);
  const filters = useSelector(selectFilters);
  const status = useSelector(selectStatus);

  const shownItems = shouldFilter
    ? beerItems.filter((item) => {
        return (
          filters.abv <= item.abv &&
          filters.ibu <= item.ibu &&
          filters.ebc <= item.ebc
        );
      })
    : beerItems;

  return (
    <section className="beer-display">
      <section className="beer-list">
        {shownItems.map((item) => (
          <article key={item.id}>
            <BeerItem beer={item} />
          </article>
        ))}
      </section>
      <section className="load-spinner">
        {status === STATE_STATUS_BUSY ? <CircularProgress /> : null}
      </section>
    </section>
  );
}
