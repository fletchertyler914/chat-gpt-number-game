import { useTheme } from '@chat-gpt-number-game/context';
import { useEffect } from 'react';

export interface ThemeColor {
  name: string;
  variable: string;
  value: string;
}

export const ThemeSwitcher = () => {
  const { dataTheme, dataThemes, setDataTheme } = useTheme();

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', dataTheme);
  }, [dataTheme]);

  return (
    <select
      className="select select-secondary w-full max-w-xs"
      value={dataTheme}
      onChange={(e) => setDataTheme?.(e.target.value)}
    >
      {dataThemes.map((theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
};

export default ThemeSwitcher;
