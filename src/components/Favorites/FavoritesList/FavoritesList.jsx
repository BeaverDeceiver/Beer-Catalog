import React from 'react';
import { selectFavorites } from '../../../store/selectors/selectors';
import { useSelector } from 'react-redux';
import { FavoritesItem } from '../FavoritesItem/FavoritesItem';

export function FavoritesList() {
  const favorites = useSelector(selectFavorites);

  return (
    <>
      <section className="favorites-list">
        {favorites.map((item) => (
          <article className="favorites-list__item" key={item.id}>
            <FavoritesItem beer={item} />
          </article>
        ))}
      </section>
    </>
  );
}
