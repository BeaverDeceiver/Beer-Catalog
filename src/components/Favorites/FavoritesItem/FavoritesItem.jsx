import React from 'react';
import { Link } from 'react-router-dom';

import './FavoritesItem.css';
export function FavoritesItem(props) {
  const { beer, handleToggleFavorite } = props;

  return (
    <>
      <section className="favorite-item__details">
        <section>
          <h1 className="favorite-item__name">{beer.name}</h1>
          <h2 className="favorite-item__tagline">{beer.tagline}</h2>
          <p className="favorite-item__description">{beer.description}</p>
        </section>
        <section className="favorite-item__buttons">
          <Link to={`/beer/${beer.id}`}>
            <button className="favorite-item__button button button_transparent">
              Open
            </button>
          </Link>
          <button
            className="favorite-item__button button button_transparent"
            onClick={() => handleToggleFavorite(beer)}
          >
            Remove Favorite
          </button>
        </section>
      </section>
      <section className="favorite-item__image-container">
        <img
          className="favorite-item__image image_small"
          src={beer.image_url}
          alt={`'${beer.name}`}
        ></img>
      </section>
    </>
  );
}
