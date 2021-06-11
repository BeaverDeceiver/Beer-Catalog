import React from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { BeerList } from './BeerList/BeerList';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_STATUS_BUSY } from '../../constants/stateConstants';
import { setStatus } from '../../store/actions/actions';
import { selectStatus } from '../../store/selectors/selectors';
import _ from 'lodash';
export function Home() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  function handleScroll(e) {
    let element = e.target;
    console.log('dispatch');
    if (
      status === 'idle' &&
      element.scrollHeight - element.scrollTop === element.clientHeight
    ) {
      dispatch(setStatus({ status: STATE_STATUS_BUSY }));
      // dispatch(fetchMoreVideos({ query, nextPageToken }));
    }
  }

  return (
    <main className="scroll-area" onScroll={_.throttle(handleScroll, 100)}>
      <SearchBar />
      <BeerList />
    </main>
  );
}
