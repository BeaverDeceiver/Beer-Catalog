import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { STATE_STATUS_BUSY } from '../../../constants/stateConstants';
import { fetchBeer, setStatus } from '../../../store/actions/actions';
import {
  selectBeer,
  selectFilters,
  selectFilterStatus,
  selectStatus,
  selectFavorites,
} from '../../../store/selectors/selectors';
import { BeerItem } from '../BeerItem/BeerItem';
import './BeerList.css';

export function BeerList() {
  const beerItems = useSelector(selectBeer);
  const shouldFilter = useSelector(selectFilterStatus);
  const filters = useSelector(selectFilters);
  const status = useSelector(selectStatus);
  const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();

  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    if (!didLoad) {
      setDidLoad(true);
      batch(() => {
        dispatch(setStatus({ status: STATE_STATUS_BUSY }));
        dispatch(fetchBeer({ query: '' }));
      });
    }
  }, [didLoad, dispatch, favorites]);

  const shownItems = shouldFilter
    ? beerItems.filter((item) => {
        return (
          filters.abv_gt <= item.abv &&
          filters.ibu_gt <= item.ibu &&
          filters.ebc_gt <= item.ebc
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
