import React from 'react';

import Photo from '../../common/Photo';
import './Advert.css';

const Advert = ({ name, sale, price, tags, photo }) => {
  return (
    <article className="advert bordered">
      <div className="left">
        {
          photo === null ? (
            <Photo className="advert-photo" />
          ) : (
            <Photo className="advert-photo" src={photo} />
          )
        }
      </div>

      <div className="advert-header">
        <ul>
          <li className="advert-name" key="1">
            NAME: {name}
          </li>
          <li className="advert-name" key="2">
            SALE: {String(sale)}
          </li>
          <li className="advert-name" key="3">
            TAGS: {tags}
          </li>
          <li className="advert-name" key="4">
            PRICE: {price}€
          </li>
        </ul>
      </div>
    </article>
  );
};

export default Advert;
