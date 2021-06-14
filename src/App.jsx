import Header from './components/Header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Favorites } from './components//Favorites/Favorites';
import './App.css';
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <header>
            <Header />
          </header>
          <Route exact path="/" component={Home} />
          <Route path="/favorites" component={Favorites} />
        </div>
      </Router>
    </>
  );
}

export default App;
