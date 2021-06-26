import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { LinearProgress } from '@material-ui/core';

import { selectFavorites } from '../../../store/selectors/selectors';
import { FavoritesItem } from '../FavoritesItem/FavoritesItem';
import { FAVORITES_PER_PAGE } from '../../../constants/common';
import { fetchFavorites, toggleFavorite } from '../../../store/actions/actions';

import './FavoritesList.css';
import { useEffect } from 'react';

export function FavoritesList() {
  const favorites = useSelector(selectFavorites);
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
    setLoaded(true);
  }, [dispatch]);

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
    <>
      <main className="scroll-area scroll-area_favorites">
        <section className="load-placeholder">
          {loaded ? null : <LinearProgress />}
        </section>
        <h1 className="favorites__header">Your favorite beers</h1>

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
    </>
  );
}
