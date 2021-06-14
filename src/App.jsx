import Header from './components/Header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Favorites } from './components//Favorites/Favorites';
import './App.css';
import { Details } from './components/Details/Details';
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
          <Route path="/beer/:beerId" component={Details} />
        </div>
      </Router>
    </>
  );
}

export default App;
