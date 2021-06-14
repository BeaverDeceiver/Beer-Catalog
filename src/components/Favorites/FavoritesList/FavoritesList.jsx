import React from 'react';
import { selectFavorites } from '../../../store/selectors/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { FavoritesItem } from '../FavoritesItem/FavoritesItem';
import Pagination from '@material-ui/lab/Pagination';
import { FAVORITES_PER_PAGE } from '../../../constants/common';
import { useState } from 'react';
import { toggleFavorite } from '../../../store/actions/actions';

import './FavoritesList.css';

export function FavoritesList() {
  const favorites = useSelector(selectFavorites);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  let countPages = Math.floor((favorites.length - 1) / FAVORITES_PER_PAGE) + 1;

  function handlePagination(e, page) {
    setPage(page);
  }

  function handleToggleFavorite(beer) {
    dispatch(toggleFavorite({ id: beer.id, favorites }));
    if ((favorites.length - 1) % 5 === 0 && page === countPages) {
      setPage(page - 1);
    }
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
              <FavoritesItem
                beer={item}
                handleToggleFavorite={handleToggleFavorite}
              />
            </article>
          ))}
        {countPages > 1 ? (
          <section className="pagination">
            <Pagination
              count={countPages}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handlePagination}
            />
          </section>
        ) : null}
      </section>
    </main>
  );
}
