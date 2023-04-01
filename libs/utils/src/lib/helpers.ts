import {
  AgentExecutorRequestBody,
  MoodPalletResponse,
} from '@chat-gpt-number-game/modals';
import { ThemeColor } from '@chat-gpt-number-game/ui';
import { COLOR_MAP, REQUIRED_COLOR_KEYS } from './constants';
import { default as Color } from 'color';
import {
  EventSourceMessage,
  fetchEventSource,
} from '@microsoft/fetch-event-source';

export const mapThemeColors = (theme: { [key: string]: string }) => {
  const themeColors: ThemeColor[] = [];
  Object.keys(theme).forEach((key) => {
    if (REQUIRED_COLOR_KEYS.includes(key)) {
      themeColors.push({
        name: key,
        variable:
          COLOR_MAP.find((item) => item.name === key)?.variable ?? `--${key}`,
        value: theme[key],
      });
    }
  });
  return themeColors;
};

export const sanitizeString = (str: string) =>
  str.replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, '-');

export const requestMoodPallet = async (
  mood: string,
  verbose?: boolean,
  onopen?: (response: Response) => Promise<void>,
  onclose?: (() => void) | undefined,
  onmessage?: ((ev: EventSourceMessage) => void) | undefined,
  onerror?: ((ev: EventSourceMessage) => void) | undefined
) => {
  const body: AgentExecutorRequestBody = {
    colorKeys: REQUIRED_COLOR_KEYS,
    mood,
    verbose: verbose ?? false,
  };

  const ctrl = new AbortController();

  await fetchEventSource('api/mood-pallet', {
    method: 'POST',
    headers: {
      Accept: 'text/event-stream',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    onopen,
    onclose,
    onmessage,
    onerror,
    signal: ctrl.signal,
  });
};
/*
    COLOR HELPERS
*/
export const generateOptionalColors = (colors: ThemeColor[]) => {
  const darken = (
    name: string,
    variable: string,
    source: string,
    percentage = 0.2
  ) => {
    const color = colors.find((item) => item.name === source);
    if (colors.length === 0 || !color) return [];
    return {
      name: name,
      variable: variable,
      value: Color(color.value).darken(percentage).hex(),
    };
  };

  const contrastMaker = (
    name: string,
    variable: string,
    source: string,
    percentage = 0.8
  ) => {
    const color = colors.find((item) => item.name === source);
    if (colors.length === 0 || !color) return;
    if (Color(color.value).isDark()) {
      return {
        name: name,
        variable: variable,
        value: Color(color.value)
          .mix(Color('white'), percentage)
          .saturate(10)
          .hex(),
      };
    } else {
      return {
        name: name,
        variable: variable,
        value: Color(color.value)
          .mix(Color('black'), percentage)
          .saturate(10)
          .hex(),
      };
    }
  };

  return [
    darken('primary-focus', '--pf', 'primary'),
    darken('secondary-focus', '--sf', 'secondary'),
    darken('accent-focus', '--af', 'accent'),
    darken('neutral-focus', '--nf', 'neutral'),
    darken('base-200', '--b2', 'base-100', 0.1),
    darken('base-300', '--b3', 'base-100', 0.2),
    contrastMaker('base-content', '--bc', 'base-100'),
    contrastMaker('primary-content', '--pc', 'primary'),
    contrastMaker('secondary-content', '--sc', 'secondary'),
    contrastMaker('accent-content', '--ac', 'accent'),
    contrastMaker('neutral-content', '--nc', 'neutral'),
    contrastMaker('info-content', '--inc', 'info'),
    contrastMaker('success-content', '--suc', 'success'),
    contrastMaker('warning-content', '--wac', 'warning'),
    contrastMaker('error-content', '--erc', 'error'),
  ] as ThemeColor[];
};

export const generateThemeFromColors = (
  mood: string,
  themeColors: ThemeColor[],
  colorScheme: string
) => {
  // convert the theme colors to HSL
  const themeColorsToHSL = [
    ...themeColors,
    ...generateOptionalColors(themeColors),
  ]
    .filter((item) => (item ? REQUIRED_COLOR_KEYS.includes(item.name) : false))
    .map((color: ThemeColor) => {
      const hslValue = Color(color.value).hsl().array();
      // todo: account for dark mode
      return {
        ...color,
        value: `${hslValue[0]} ${hslValue[1]}% ${hslValue[2]}%`,
      };
    });

  // convert the theme colors to a string
  const themeString = themeColorsToHSL.reduce(
    (acc, color) => `${acc}${color.variable}:${color.value};`,
    ''
  );

  // cleanup the theme name and create a custom theme
  const dataThemeKey = mood.split(' ').join('-').trim();
  const dataTheme = `[data-theme=${dataThemeKey}] { color-scheme: ${colorScheme}; ${themeString} }`;

  return { dataThemeKey, dataTheme };
};
