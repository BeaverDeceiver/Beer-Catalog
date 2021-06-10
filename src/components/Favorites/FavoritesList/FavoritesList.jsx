import React from 'react';
import { selectBeer } from '../../../store/selectors/selectors';
import { useSelector } from 'react-redux';
import { FavoritesItem } from '../FavoritesItem/FavoritesItem';

export function FavoritesList() {
  const beerItems = useSelector(selectBeer);

  return (
    <>
      <section className="favorites-list">
        {beerItems.map((item) => (
          <article className="favorites-list__item" key={item.id}>
            <FavoritesItem beer={item} />
          </article>
        ))}
      </section>
    </>
  );
}
