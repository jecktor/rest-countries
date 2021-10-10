import './styles.scss';

const Fatal = ({ error }) => (
  <article className="Fatal">
    <header>Failed to fetch:</header>
    <pre>{error}</pre>
  </article>
);

export default Fatal;
