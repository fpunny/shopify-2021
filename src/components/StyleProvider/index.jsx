import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/core.scss';

export const ThemeContext = createContext({
  setDarkMode: () => {},
  darkMode: false,
});

const root = document.body;
export default function StyleProvider({ children }) {
  const [theme, setTheme] = useState({ darkMode: false });
  const setDarkMode = useCallback((mode) => {
    setTheme((_theme) => ({
      ..._theme,
      darkMode: mode ?? !_theme.darkMode,
    }));
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      // Ideally I want to use helmet to also preload this, but this is as good as it gets for CRA
      // (I tried parcel which can let me do this, but its super finicky since v2 is beta)
      import('../../styles/deferred.scss');
      root.classList.add(`animate`);
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        setDarkMode,
        ...theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

StyleProvider.propTypes = {
  children: PropTypes.node,
};
