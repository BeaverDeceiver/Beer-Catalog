import React from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { BeerList } from './BeerList/BeerList';
import { useDispatch, useSelector } from 'react-redux';
import {
  STATE_STATUS_BUSY,
  STATE_STATUS_IDLE,
} from '../../constants/stateConstants';
import { fetchMoreBeer, setStatus } from '../../store/actions/actions';
import {
  selectPage,
  selectQuery,
  selectReachedEnd,
  selectStatus,
} from '../../store/selectors/selectors';
import _ from 'lodash';
export function Home() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const query = useSelector(selectQuery);
  const page = useSelector(selectPage);
  const reachedEnd = useSelector(selectReachedEnd);

  function handleScroll(e) {
    let element = e.target;
    if (
      status === STATE_STATUS_IDLE &&
      !reachedEnd &&
      element.scrollHeight - element.scrollTop === element.clientHeight
    ) {
      dispatch(setStatus({ status: STATE_STATUS_BUSY }));
      dispatch(fetchMoreBeer({ query, page }));
    }
  }

  return (
    <main className="scroll-area" onScroll={_.throttle(handleScroll, 100)}>
      <SearchBar />
      <BeerList />
    </main>
  );
}
