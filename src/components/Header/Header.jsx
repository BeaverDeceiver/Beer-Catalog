import React, { useState, Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DehazeIcon from '@material-ui/icons/Dehaze';
import StarIcon from '@material-ui/icons/Star';
import InboxIcon from '@material-ui/icons/Inbox';

import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function TemporaryDrawer() {
  const [state, setState] = useState({ isOpen: false });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ isOpen: open });
  };

  return (
    <section className="header">
      <Fragment key={'left'}>
        <Button onClick={toggleDrawer(true)}>
          <DehazeIcon className="drawer__button" />
        </Button>
        <h1 className="header__caption">Beer catalog</h1>
        <Drawer
          anchor={'left'}
          open={state.isOpen}
          onClose={toggleDrawer(false)}
        >
          <div className="drawer__block">
            <h1 className="drawer__caption">Beer Catalog</h1>
          </div>

          <Router>
            <List
              className="drawer__list"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <Link to="/Home">
                <ListItem button key="Home">
                  <InboxIcon className="drawer__icon" />
                  <ListItemText primary="Home" />
                </ListItem>
              </Link>

              <Link to="/Favorites">
                <ListItem button key="Favorites">
                  <StarIcon className="drawer__icon" />
                  <ListItemText primary="Favorites" />
                </ListItem>
              </Link>
            </List>
          </Router>
        </Drawer>
      </Fragment>
    </section>
  );
}
