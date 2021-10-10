import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useOnScreen from '../../hooks/useOnScreen';

import './styles.scss';

const Card = ({ id, img, name, population, region, capital }) => {
  const cardRef = useRef(null);
  const isVisible = useOnScreen(cardRef);

  return (
    <div className="Card" ref={cardRef}>
      {isVisible && (
        <Link to={`/country/${id}`}>
          <div className="Card__img">
            <img src={img} alt="" aria-hidden="true" />
          </div>
          <div className="Card__details">
            <h2>{name}</h2>
            <ul>
              <li>
                Population:{' '}
                <span>
                  {new Intl.NumberFormat('en-US', {
                    maximumSignificantDigits: 3,
                  }).format(population)}
                </span>
              </li>
              <li>
                Region: <span>{region}</span>
              </li>
              {capital && (
                <li>
                  Capital: <span>{capital}</span>
                </li>
              )}
            </ul>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Card;
