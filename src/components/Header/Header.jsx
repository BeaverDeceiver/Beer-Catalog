import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DehazeIcon from '@material-ui/icons/Dehaze';
import StarIcon from '@material-ui/icons/Star';
import InboxIcon from '@material-ui/icons/Inbox';

import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthStatus } from '../../store/selectors/selectors';
import { hardLogOut } from '../../apis/Session';
import { setAuthStatus } from '../../store/actions/actions';
import { AUTH_STATUS_LOGGED_OUT } from '../../constants/authConstants';

export function Header() {
  const [state, setState] = useState({ isOpen: false });
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ isOpen: open });
  };

  const handleLogOut = () => {
    hardLogOut();
    dispatch(setAuthStatus({ status: AUTH_STATUS_LOGGED_OUT }));
  };

  return (
    <section className="header">
      <Fragment key={'left'}>
        <div>
          <Button onClick={toggleDrawer(true)}>
            <DehazeIcon className="drawer__button" />
          </Button>

          <h1 className="header__caption">Beer catalog</h1>
        </div>
        <Drawer
          anchor={'left'}
          open={state.isOpen}
          onClose={toggleDrawer(false)}
        >
          <div className="drawer__block">
            <h1 className="drawer__caption">Beer Catalog</h1>
          </div>

          <List
            className="drawer__list"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ListItem button key="Home" component={Link} to="/">
              <InboxIcon className="drawer__icon" />
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button key="Favorites" component={Link} to="/favorites">
              <StarIcon className="drawer__icon" />
              <ListItemText primary="Favorites" />
            </ListItem>
          </List>
        </Drawer>
      </Fragment>

      <article className="header__user-area">
        {authStatus ? (
          <>
            <Link to="/auth/signin">
              <button className="header__button button" onClick={handleLogOut}>
                Sign Out
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/auth/signin">
              <button className="header__button button">Sign In</button>
            </Link>

            <Link to="/auth/signup">
              <button className="header__button button">Sign Up</button>
            </Link>
          </>
        )}
      </article>
    </section>
  );
}
