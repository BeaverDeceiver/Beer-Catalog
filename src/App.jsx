import { BeerList } from './components/BeerList/BeerList';
import Header from './components/Header/Header';
import { SearchBar } from './components/Searchbar/Searchbar';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <header>
        <Header />
      </header>
      <main>
        <SearchBar />
        <BeerList />
      </main>
    </div>
  );
}

export default App;
