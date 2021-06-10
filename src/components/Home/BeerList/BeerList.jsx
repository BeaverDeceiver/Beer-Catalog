import React from 'react';
import { useSelector } from 'react-redux';
import { selectBeer } from '../../../store/selectors/selectors';
import { BeerItem } from '../BeerItem/BeerItem';

export function BeerList() {
  const beerItems = useSelector(selectBeer);

  return (
    <section className="beer-display">
      <section className="beer-list">
        {beerItems.map((item) => (
          <article key={item.id}>
            <BeerItem beer={item} />
          </article>
        ))}
      </section>
    </section>
  );
}
