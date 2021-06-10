import React from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { BeerList } from './BeerList/BeerList';

export function Home() {
  return (
    <main>
      <SearchBar />
      <BeerList />
    </main>
  );
}
