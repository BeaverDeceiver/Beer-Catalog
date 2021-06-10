import React from 'react';
import { FavoritesList } from './FavoritesList/FavoritesList';

export function Favorites() {
  return (
    <>
      <h1 className="favorites__header">Your favorite beers</h1>
      <FavoritesList />
    </>
  );
}
