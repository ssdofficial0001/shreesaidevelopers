import React, { createContext, useContext, useEffect } from 'react';

export type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    try {
      localStorage.setItem('ssd_theme', 'light');
    } catch {
      // ignore storage access restrictions
    }
  }, []);

  const toggleTheme = () => {
    // Light mode design
  };

  const setTheme = (newTheme: Theme) => {
    // Light mode design
  };

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return {
    theme: 'light',
    toggleTheme: () => {},
    setTheme: () => {},
  };
};

