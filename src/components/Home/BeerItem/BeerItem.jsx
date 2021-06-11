import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../../../store/actions/actions';

export function BeerItem(props) {
  const { beer } = props;
  const dispatch = useDispatch();
  function handleToggleFavorite() {
    dispatch(toggleFavorite({ id: beer.id }));
  }

  return (
    <>
      <img
        className="beer-item__image image_small"
        src={beer.image_url}
        alt="beer_image"
      ></img>
      <section className="beer-item__details">
        <section>
          <h1 className="beer-item__name">{beer.name}</h1>
          <p className="beer-item__tagline">{beer.tagline}</p>
        </section>
        <section>
          <button className="beer-item__button button button_transparent">
            Open
          </button>
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
