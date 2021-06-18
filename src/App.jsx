import Header from './components/Header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Favorites } from './components//Favorites/Favorites';
import './App.css';
import { Details } from './components/Details/Details';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';

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
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
        </div>
      </Router>
    </>
  );
}

export default App;
