import React, { useEffect, useCallback } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { BeerList } from './BeerList/BeerList';
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  STATE_STATUS_BUSY,
  STATE_STATUS_IDLE,
} from '../../constants/stateConstants';
import {
  clearBeer,
  clearFilters,
  fetchMoreBeer,
  setStatus,
} from '../../store/actions/actions';
import {
  selectFavorites,
  selectPage,
  selectQuery,
  selectReachedEnd,
  selectStatus,
} from '../../store/selectors/selectors';

import _ from 'lodash';

export function Home() {
  const status = useSelector(selectStatus);
  const query = useSelector(selectQuery);
  const page = useSelector(selectPage);
  const reachedEnd = useSelector(selectReachedEnd);
  const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();

  const throttledScrollHandle = _.throttle((e) => {
    let element = e.target;
    if (
      status === STATE_STATUS_IDLE &&
      !reachedEnd &&
      element.scrollHeight - element.scrollTop === element.clientHeight
    ) {
      batch(() => {
        dispatch(setStatus({ status: STATE_STATUS_BUSY }));
        dispatch(fetchMoreBeer({ query, page, favorites }));
      });
    }
  }, 100);

  const throttledScroll = useCallback(throttledScrollHandle, [
    throttledScrollHandle,
  ]);

  // clean up on page change
  useEffect(() => {
    return () => {
      batch(() => {
        dispatch(clearBeer());
        dispatch(clearFilters());
      });
    };
  }, [dispatch]);

  return (
    <main className="scroll-area scroll-area_home" onScroll={throttledScroll}>
      <SearchBar />
      <BeerList />
    </main>
  );
}
