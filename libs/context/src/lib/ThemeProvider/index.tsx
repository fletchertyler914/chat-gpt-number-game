import { useState, createContext, useContext } from 'react';

export const DEFAULT_DATA_THEMES = ['light', 'dark', 'synthwave', 'cupcake'];
// export type DataTheme = typeof DEFAULT_DATA_THEMES[number];

export interface ThemeContextState {
  dataTheme: string;
  setDataTheme?: React.Dispatch<React.SetStateAction<string>>;
  dataThemes: string[];
  setDataThemes?: React.Dispatch<React.SetStateAction<string[]>>;
}

const DEFAULT_CONTEXT: ThemeContextState = {
  dataTheme: 'light',
  dataThemes: DEFAULT_DATA_THEMES,
};

export const ThemeContext = createContext<ThemeContextState>(DEFAULT_CONTEXT);

export const useTheme = (): ThemeContextState => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataTheme, setDataTheme] = useState<string>(DEFAULT_CONTEXT.dataTheme);
  const [dataThemes, setDataThemes] = useState<string[]>(DEFAULT_DATA_THEMES);

  return (
    <ThemeContext.Provider
      value={{
        dataTheme,
        setDataTheme,
        dataThemes,
        setDataThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
