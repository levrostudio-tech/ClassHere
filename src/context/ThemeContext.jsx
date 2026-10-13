import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Enforce Light Mode permanently across the entire application
  useEffect(() => {
    try {
      localStorage.removeItem('classhere_theme');
    } catch (e) {
      // Ignore
    }

    const root = document.documentElement;
    const body = document.body;

    root.classList.remove('dark');
    if (body) body.classList.remove('dark');
    root.setAttribute('data-theme', 'light');

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#0075FF');
    }
  }, []);

  const value = {
    theme: 'light',
    setTheme: () => {},
    isDark: false,
    toggleTheme: () => {},
    toggleDarkMode: () => {},
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'light',
      setTheme: () => {},
      isDark: false,
      toggleTheme: () => {},
      toggleDarkMode: () => {},
    };
  }
  return context;
}
