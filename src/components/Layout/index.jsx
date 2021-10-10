import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMoon } from 'react-icons/fa';

import './styles.scss';

const Layout = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const handleSwitchTheme = () => {
    document.documentElement.setAttribute(
      'data-theme',
      darkTheme ? 'light' : 'dark'
    );
    setDarkTheme(!darkTheme);
  };

  return (
    <>
      <header className="Layout">
        <Link to="/">
          <h1 className="Layout__title">Where in the world?</h1>
        </Link>
        <div className="Layout__theme-switch">
          <button type="button" onClick={handleSwitchTheme}>
            <FaMoon className="icon" />
            <span>Dark Mode</span>
          </button>
        </div>
      </header>
      {children}
    </>
  );
};

export default Layout;
