import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../../store/actions/actions';
import { selectFavorites } from '../../../store/selectors/selectors';
import './BeerItem.css';

import { Link } from 'react-router-dom';

export function BeerItem(props) {
  const { beer } = props;
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  function handleToggleFavorite() {
    dispatch(toggleFavorite({ id: beer.id, favorites }));
  }

  return (
    <>
      <section className="beer-item__image">
        <img
          className="image_small"
          src={beer.image_url}
          alt={`'${beer.name}'`}
        ></img>
      </section>
      <section className="beer-item__details">
        <section>
          <h1 className="beer-item__name">{beer.name}</h1>
          <p className="beer-item__tagline">{beer.tagline}</p>
        </section>
        <section>
          <Link to={`/beer/${beer.id}`}>
            <button className="beer-item__button button button_transparent">
              Open
            </button>
          </Link>
          <button
            className="beer-item__button button button_transparent"
            onClick={handleToggleFavorite}
          >
            {!beer.isFavorite ? 'Favorite' : 'Remove Favorite'}
          </button>
        </section>
      </section>
    </>
  );
}
