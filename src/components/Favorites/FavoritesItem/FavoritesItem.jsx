import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../../../store/actions/actions';

export function FavoritesItem(props) {
  const { beer } = props;
  const dispatch = useDispatch();
  function handleToggleFavorite() {
    dispatch(toggleFavorite({ id: beer.id }));
  }
  return (
    <>
      <section className="favorite-item__details">
        <section>
          <h1 className="favorite-item__name">{beer.name}</h1>
          <h2 className="favorite-item__tagline">{beer.tagline}</h2>
          <p className="favorite-item__description">{beer.description}</p>
        </section>
        <section className="favorite-item__buttons">
          <button className="favorite-item__button button button_transparent">
            Open
          </button>
          <button
            className="favorite-item__button button button_transparent"
            onClick={handleToggleFavorite}
          >
            Remove Favorite
          </button>
        </section>
      </section>
      <section className="favorite-item__image-container">
        <img
          className="favorite-item__image image_small"
          src={beer.image_url}
          alt="beer_image"
        ></img>
      </section>
    </>
  );
}
