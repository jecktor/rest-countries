import { useParams, Link } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';

import { BsArrowLeft } from 'react-icons/bs';

import Loading from '../../components/Loading';
import Fatal from '../../components/Fatal';

import './styles.scss';

const CountryDetails = () => {
  const { countryId } = useParams();
  const { loading, error, data } = useFetchData(
    `https://restcountries.com/v2/alpha/${countryId}`
  );

  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = data;

  return (
    <main className="CountryDetails">
      <Link className="CountryDetails__back" to="/">
        <BsArrowLeft />
        <span>Back</span>
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Fatal error={error} />
      ) : (
        <div className="container">
          <div className="container__img">
            <img src={flag} alt="" aria-hidden="true" />
          </div>
          <div className="container__details">
            <div className="container__details-info">
              <h1>{name}</h1>
              <div>
                <ul>
                  <li>
                    Native Name:<span>{nativeName}</span>
                  </li>
                  <li>
                    Population:
                    <span>
                      {new Intl.NumberFormat('en-US', {
                        maximumSignificantDigits: 3,
                      }).format(population)}
                    </span>
                  </li>
                  <li>
                    Region:<span>{region}</span>
                  </li>
                  <li>
                    Sub Region:<span>{subregion}</span>
                  </li>
                  {capital && (
                    <li>
                      Capital:<span>{capital}</span>
                    </li>
                  )}
                </ul>
                <ul>
                  <li>
                    Top Level Domain:<span>{topLevelDomain[0]}</span>
                  </li>
                  {currencies && (
                    <li>
                      Currencies:
                      {currencies.map((currency, idx) => (
                        <span key={idx}>{currency.name}</span>
                      ))}
                    </li>
                  )}
                  <li>
                    Languages:
                    {languages.map((language, idx) => (
                      <span key={idx}>{language.name}</span>
                    ))}
                  </li>
                </ul>
              </div>
            </div>
            {borders && (
              <div className="container__details-borders">
                <h2>Border Countries:</h2>
                <ul>
                  {borders.map((border, idx) => (
                    <Link key={idx} to={`/country/${border}`}>
                      <li>{border}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default CountryDetails;
