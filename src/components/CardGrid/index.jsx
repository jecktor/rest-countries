import Loading from '../Loading';
import Fatal from '../Fatal';

import './styles.scss';

const CardGrid = ({ loading, error, countries, render }) => (
  <div className="CardGrid">
    {loading && <Loading />}
    {error && <Fatal error={error} />}
    {!loading && !error && render(countries)}
  </div>
);

export default CardGrid;
