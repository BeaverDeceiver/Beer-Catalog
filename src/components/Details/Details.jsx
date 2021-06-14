import React from 'react';
import { fetchSingleBeer } from '../../apis/Fetch';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectFavorites } from '../../store/selectors/selectors';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import './Details.css';

export function Details() {
  const { beerId } = useParams();

  // const favorites = useSelector(selectFavorites);

  const [beer, setBeer] = useState({});
  // const [isFavorite, setIsFavorite] = useState(true);
  useEffect(() => {
    fetchSingleBeer(beerId).then((data) => setBeer(data));
    // console.log(favorites);
    // if (
    //   favorites.find((f_item) => {
    //     return f_item.id === beerId;
    //   })
    // ) {
    //   setBeer({ ...beer, isFavorite: true });
    // } else {
    //   setBeer({ ...beer, isFavorite: false });
    // }
    // console.log(beer);
  }, [beerId]);

  return (
    <>
      <section className="details scroll-area">
        <section className="details__upper">
          <article className="details__general-info">
            <h1 className="details__name">{beer.name}</h1>
            <h2 className="details__tagline">{beer.tagline}</h2>
            <button className="details__button button">
              {/* {isFavorite ? 'Remove from Favorites' : 'Add To Favorites'} */}
            </button>
            <p className="details__description">{beer.description}</p>
          </article>

          <article className="details__image-container">
            <img
              className="details__image image_medium"
              src={beer.image_url}
              alt={`'${beer.name}`}
            ></img>
          </article>
        </section>

        <section className="details__middle table-section">
          <article className="properties">
            <h1 className="properties__header">Properties</h1>

            <section className="properties__table">
              <article className="properties__row">
                <div className="properties__abbreviation">
                  <p>ABV</p>
                  <Tooltip
                    enterDelay={20}
                    placement="top"
                    title="Alcohol by Volume"
                  >
                    <InfoOutlinedIcon className="properties__tooltip-icon" />
                  </Tooltip>
                </div>
                <p className="properties__value">{beer.abv}</p>
              </article>

              <article className="properties__row">
                <div className="properties__abbreviation">
                  <p>IBU</p>
                  <Tooltip
                    enterDelay={20}
                    placement="top"
                    title="International Bitterness Units"
                  >
                    <InfoOutlinedIcon className="properties__tooltip-icon" />
                  </Tooltip>
                </div>

                <p className="properties__value">{beer.ibu}</p>
              </article>
              <article className="properties__row">
                <div className="properties__abbreviation">
                  <p>EBC</p>
                  <Tooltip enterDelay={20} placement="top" title="Color by EBC">
                    <InfoOutlinedIcon className="properties__tooltip-icon" />
                  </Tooltip>
                </div>
                <p className="properties__value">{beer.ebc}</p>
              </article>
            </section>
          </article>

          <article className="food-pairing">
            <h1 className="food-pairing__header">Food Pairing</h1>

            <section className="food-pairing__table">
              {beer.food_pairing.map((item) => (
                <article className="food-pairing__row">{item}</article>
              ))}
            </section>
          </article>
        </section>

        <section className="details__bottom">
          <article className="brewing">
            <h1 className="brewing__header">Brewing</h1>
            <p className="brewing__tips">{beer.brewers_tips}</p>
          </article>

          <section className="table-section">
            <article className="ingredients">
              <h1 className="ingredients__header">Ingredients</h1>
            </article>

            <article className="method">
              <h1 className="method__header">Method</h1>
            </article>
          </section>
        </section>
      </section>
    </>
  );
}
