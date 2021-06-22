import Header from './components/Header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Favorites } from './components//Favorites/Favorites';
import './App.css';
import { Details } from './components/Details/Details';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { PrivateRoute } from './components/Auth/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <header>
            <Header />
          </header>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/favorites" component={Favorites} />
          <PrivateRoute path="/beer/:beerId" component={Details} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
        </div>
      </Router>
    </>
  );
}

export default App;
