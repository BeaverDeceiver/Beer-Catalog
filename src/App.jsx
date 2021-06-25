import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Favorites } from './components//Favorites/Favorites';
import { Details } from './components/Details/Details';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { UserPage } from './components/UserPage/UserPage';
import { EditUserPage } from './components/UserPage/EditUserPage/EditUserPage';

import { PrivateRoute } from './components/Auth/PrivateRoute';
import { getAccessToken } from './apis/Session';
import { setAuthStatus } from './store/actions/actions';
import { AUTH_STATUS_LOGGED_IN } from './constants/authConstants';

import './App.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      if (getAccessToken()) {
        dispatch(setAuthStatus({ status: AUTH_STATUS_LOGGED_IN }));
      }
      setLoaded(true);
    }
  }, [dispatch, loaded]);

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
          <PrivateRoute exact path="/user/:userId" component={UserPage} />
          <PrivateRoute path="/user/edit/:userId" component={EditUserPage} />
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
        </div>
      </Router>
    </>
  );
}

export default App;
