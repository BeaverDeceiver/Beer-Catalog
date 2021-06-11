import React from 'react';
import { selectFavorites } from '../../../store/selectors/selectors';
import { useSelector } from 'react-redux';
import { FavoritesItem } from '../FavoritesItem/FavoritesItem';
import Pagination from '@material-ui/lab/Pagination';
import { FAVORITES_PER_PAGE } from '../../../constants/common';
import { useState } from 'react';

export function FavoritesList() {
  const favorites = useSelector(selectFavorites);
  const [page, setPage] = useState(1);
  function handlePagination(e, page) {
    setPage(page);
  }

  return (
    <main className="scroll-area scroll-area_favorites">
      <section className="favorites-list">
        {favorites
          .filter(
            (item, index) =>
              index < FAVORITES_PER_PAGE * page &&
              index > FAVORITES_PER_PAGE * (page - 1) - 1
          )
          .map((item) => (
            <article className="favorites-list__item" key={item.id}>
              <FavoritesItem beer={item} />
            </article>
          ))}
        {Math.floor((favorites.length - 1) / FAVORITES_PER_PAGE) > 0 ? (
          <Pagination
            count={Math.floor((favorites.length - 1) / FAVORITES_PER_PAGE) + 1}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handlePagination}
          />
        ) : null}
      </section>
    </main>
  );
}
