import React from 'react';
import { hardLogOut } from '../../apis/Session';
import { Link } from 'react-router-dom';
import './SignedIn.css';

export function SignedIn() {
  function handleSignOut() {
    hardLogOut();
  }

  return (
    <section className="signed-in">
      <h1 className="form__header">You are signed in</h1>
      <section className="form__buttons-area">
        <Link to="/auth/signin">
          <button
            className="form__button button signed-in__button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </Link>
        <Link to="/">
          <button className="form__button button signed-in__button">
            Homepage
          </button>
        </Link>
      </section>
    </section>
  );
}
