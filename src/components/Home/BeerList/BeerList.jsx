import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectBeer,
  selectFilters,
  selectFilterStatus,
} from '../../../store/selectors/selectors';
import { BeerItem } from '../BeerItem/BeerItem';

export function BeerList() {
  const beerItems = useSelector(selectBeer);
  const shouldFilter = useSelector(selectFilterStatus);
  const filters = useSelector(selectFilters);

  const shownItems = !shouldFilter
    ? beerItems
    : beerItems.filter((item) => {
        return (
          filters.abv >= item.abv &&
          filters.ibu >= item.ibu &&
          filters.ebc >= item.ebc
        );
      });

  return (
    <section className="beer-display">
      <section className="beer-list">
        {shownItems.map((item) => (
          <article key={item.id}>
            <BeerItem beer={item} />
          </article>
        ))}
      </section>
    </section>
  );
}
