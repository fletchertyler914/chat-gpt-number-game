import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AgentExecutorRequestBody,
  MoodPalletResponse,
} from './api/mood-pallet';

import { useRef } from 'react';

import { default as Color } from 'color';
import { ThemeColor, ThemeSwitcher } from '@chat-gpt-number-game/ui';
import { useTheme } from '@chat-gpt-number-game/context';

export const Index = () => {
  const [mood, setMood] = useState(
    'rainy day vibes with a side of coffee and sunflowers'
  );
  const [moodPallet, setMoodPallet] = useState<MoodPalletResponse>();
  const [loading, setLoading] = useState(false);

  const { setDataTheme, setDataThemes, dataTheme, dataThemes } = useTheme();

  const wrapper = useRef(null);

  const [requiredColorNames, setRequiredColorNames] = useState([
    'primary',
    'secondary',
    'accent',
    'neutral',
    'base-100',
    'info',
    'success',
    'warning',
    'error',
  ]);

  const defaultTheme = useMemo(
    () => ({
      primary: '#3260b5',
      secondary: '#21d193',
      accent: '#54a9bf',
      neutral: '#1F222E',
      'base-100': '#3D2942',
      info: '#7399D4',
      success: '#41D2B3',
      warning: '#EDC61D',
      error: '#E63D4B',
    }),
    []
  );

  const generateOptionalColors = useCallback((colors: ThemeColor[]) => {
    const darken = (name, variable, source, percentage = 0.2) => {
      return {
        name: name,
        variable: variable,
        value: Color(colors.find((item) => item.name === source).value)
          .darken(percentage)
          .hex(),
      };
    };

    const contrastMaker = (name, variable, source, percentage = 0.8) => {
      if (colors.length === 0) return;
      if (Color(colors.find((item) => item.name === source).value).isDark()) {
        return {
          name: name,
          variable: variable,
          value: Color(colors.find((item) => item.name === source).value)
            .mix(Color('white'), percentage)
            .saturate(10)
            .hex(),
        };
      } else {
        return {
          name: name,
          variable: variable,
          value: Color(colors.find((item) => item.name === source).value)
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
    ];
  }, []);

  const generateThemeFromColors = useCallback(
    (themeColors: ThemeColor[]) => {
      if (themeColors.length === 0 || !wrapper) return;

      // filter out the required colors
      const sanitizedThemeColors = themeColors.filter((item) =>
        requiredColorNames.includes(item.name)
      );

      // generate the optional colors
      const optionalThemeColors = generateOptionalColors(sanitizedThemeColors);

      // convert the theme colors to HSL
      const themeColorsToHSL = [...sanitizedThemeColors, ...optionalThemeColors]
        .filter((item) => requiredColorNames.includes(item.name))
        .map((color) => {
          const hslValue = Color(color.value).hsl().round().array();
          return {
            name: color.name,
            variable: color.variable,
            value: `${hslValue[0]} ${hslValue[1]}% ${hslValue[2]}%`,
          };
        });

      // convert the theme colors to a string
      const themeString = themeColorsToHSL.reduce(
        (acc, color) => `${acc}${color.variable}:${color.value};`,
        ''
      );

      // cleanup the theme name and create a custom theme
      const customMoodThemeName = mood.split(' ').join('-').trim();
      const colorScheme = moodPallet ? moodPallet.colorScheme : 'light';
      const customTheme = `[data-theme=${customMoodThemeName}] { color-scheme: ${colorScheme}; ${themeString} }`;

      // append the new theme stylesheet to the document
      const styleSheet = document.createElement('style');
      styleSheet.innerText = customTheme;
      document.head.appendChild(styleSheet);

      // set the new theme
      setDataTheme(customMoodThemeName);
      setDataThemes((prev) => [...prev, customMoodThemeName]);
      setLoading(false);
    },
    [
      generateOptionalColors,
      mood,
      moodPallet,
      requiredColorNames,
      setDataTheme,
      setDataThemes,
    ]
  );

  const mapThemeColors = useCallback(
    (theme: { [key: string]: string }) => {
      const colorMap = [
        {
          name: 'primary',
          variable: '--p',
        },
        {
          name: 'primary-focus',
          variable: '--pf',
        },
        {
          name: 'primary-content',
          variable: '--pc',
        },
        {
          name: 'secondary',
          variable: '--s',
        },
        {
          name: 'secondary-focus',
          variable: '--sf',
        },
        {
          name: 'secondary-content',
          variable: '--sc',
        },
        {
          name: 'accent',
          variable: '--a',
        },
        {
          name: 'accent-focus',
          variable: '--af',
        },
        {
          name: 'accent-content',
          variable: '--ac',
        },
        {
          name: 'neutral',
          variable: '--n',
        },
        {
          name: 'neutral-focus',
          variable: '--nf',
        },
        {
          name: 'neutral-content',
          variable: '--nc',
        },
        {
          name: 'base-100',
          variable: '--b1',
        },
        {
          name: 'base-200',
          variable: '--b2',
        },
        {
          name: 'base-300',
          variable: '--b3',
        },
        {
          name: 'base-content',
          variable: '--bc',
        },
        {
          name: 'info',
          variable: '--in',
        },
        {
          name: 'info-content',
          variable: '--inc',
        },
        {
          name: 'success',
          variable: '--su',
        },
        {
          name: 'success-content',
          variable: '--suc',
        },
        {
          name: 'warning',
          variable: '--wa',
        },
        {
          name: 'warning-content',
          variable: '--wac',
        },
        {
          name: 'error',
          variable: '--er',
        },
        {
          name: 'error-content',
          variable: '--erc',
        },
      ];

      const themeColors: ThemeColor[] = [];
      Object.keys(theme).forEach((key) => {
        if (requiredColorNames.includes(key)) {
          themeColors.push({
            name: key,
            variable:
              colorMap.find((item) => item.name === key)?.variable ??
              `--${key}`,
            value: theme[key],
          });
        }
      });
      return themeColors;
    },
    [requiredColorNames]
  );

  useEffect(() => {
    if (moodPallet) {
      const themeColors = mapThemeColors(moodPallet.theme);
      console.log('gen theme colors from mood pallet', themeColors);
      generateThemeFromColors(themeColors);
    }
  }, [generateThemeFromColors, mapThemeColors, moodPallet]);

  const submitPrompt = useCallback(async () => {
    setLoading(true);

    const body: AgentExecutorRequestBody = {
      colorKeys: [
        'primary',
        'secondary',
        'accent',
        'neutral',
        'base-100',
        'info',
        'success',
        'warning',
        'error',
      ],
      mood,
      verbose: true,
    };

    await fetch('api/mood-pallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json() as Promise<MoodPalletResponse>)
      .then((moodPallet: MoodPalletResponse) => {
        setMoodPallet(moodPallet);
      });
  }, [mood]);

  return (
    <div ref={wrapper} className="max-w-5xl mx-auto my-0">
      <div className="flex flex-col items-center justify-center py-2">
        <h2 className="px-2 py-4 text-xl font-medium">mood(pallet)</h2>
      </div>

      <div className="bg-transparent">
        <hr className="mb-8" />
        {loading ? (
          <>Generating mood...</>
        ) : (
          <>
            <h2 className="px-2 pb-4 text-xl font-bold text-center">
              Type out a phrase to convert it to a mood.
              <br /> We will magically convert the mood into a color pallet.
            </h2>

            <div className="h-20 w-full flex items-center justify-center px-2 py-4">
              <input
                type="text"
                placeholder="Type here"
                value={mood}
                className="input input-primary input-lg	input-bordered w-full max-w-sm"
                onChange={(event) => setMood(event.target.value)}
                onKeyDown={(evt) => {
                  if (evt.key === 'Enter') {
                    submitPrompt();
                  }
                }}
              />

              <button type="button" className="w-20" onClick={submitPrompt}>
                Submit
              </button>
            </div>

            <div className="w-full flex flex-col items-center justify-between px-2 py-4">
              <h2 className="px-2 pb-4 text-xl font-bold text-center">
                Not feeling creative? Try one of these:
              </h2>
              <ThemeSwitcher />
            </div>
          </>
        )}

        <hr className="my-8" />

        <h2 className="px-2 pb-4 text-xl font-bold">Preview</h2>

        <div className="rounded-box bg-base-100 border-base-content/5 text-base-content not-prose grid gap-3 border p-6 m-8">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <button className="btn">Default</button>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-accent">Accent</button>
            <button className="btn btn-info">Info</button>
            <button className="btn btn-success">Success</button>
            <button className="btn btn-warning">Warning</button>
            <button className="btn btn-error">Error</button>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4">
            <span className="badge">Default</span>
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-secondary">Secondary</span>
            <span className="badge badge-accent">Accent</span>
            <span className="badge badge-info">Info</span>
            <span className="badge badge-success">Success</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-error">Error</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="md:w-1/2 w-full">
                <div className="tabs w-full">
                  <button className="tab tab-lifted">Tab</button>
                  <button className="tab tab-lifted tab-active">Tab</button>
                  <button className="tab tab-lifted">Tab</button>
                </div>
                <div className="flex flex-col">
                  <span className="link">I'm a simple link</span>
                  <span className="link link-primary">I'm a simple link</span>
                  <span className="link link-secondary">I'm a simple link</span>
                  <span className="link link-accent">I'm a simple link</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 md:w-1/2">
                <progress value="20" max="100" className="progress">
                  Default
                </progress>
                <progress
                  value="25"
                  max="100"
                  className="progress progress-primary"
                >
                  Primary
                </progress>
                <progress
                  value="30"
                  max="100"
                  className="progress progress-secondary"
                >
                  Secondary
                </progress>
                <progress
                  value="40"
                  max="100"
                  className="progress progress-accent"
                >
                  Accent
                </progress>
                <progress
                  value="45"
                  max="100"
                  className="progress progress-info"
                >
                  Info
                </progress>
                <progress
                  value="55"
                  max="100"
                  className="progress progress-success"
                >
                  Success
                </progress>
                <progress
                  value="70"
                  max="100"
                  className="progress progress-warning"
                >
                  Warning
                </progress>
                <progress
                  value="90"
                  max="100"
                  className="progress progress-error"
                >
                  Error
                </progress>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="stats bg-base-300 border-base-300 border md:w-1/2">
                <div className="stat">
                  <div className="stat-title">Total Page Views</div>
                  <div className="stat-value">89,400</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 md:w-1/2">
                <div
                  className="radial-progress"
                  style={{ '--value': 70, '--size': '3.5rem' } as any}
                >
                  60%
                </div>
                <div
                  className="radial-progress"
                  style={{ '--value': 75, '--size': '3.5rem' } as any}
                >
                  75%
                </div>
                <div
                  className="radial-progress"
                  style={{ '--value': 90, '--size': '3.5rem' } as any}
                >
                  90%
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="md:w-1/2">
                <div>
                  <input type="checkbox" className="toggle" checked />
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked
                  />
                  <input
                    type="checkbox"
                    className="toggle toggle-secondary"
                    checked
                  />
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    checked
                  />
                </div>
                <div>
                  <input type="checkbox" className="checkbox" checked />
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked
                  />
                  <input
                    type="checkbox"
                    className="checkbox checkbox-secondary"
                    checked
                  />
                  <input
                    type="checkbox"
                    className="checkbox checkbox-accent"
                    checked
                  />
                </div>
                <div>
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio"
                    checked
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio radio-primary"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio radio-secondary"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio radio-accent"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value="90"
                  className="range range-xs"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value="70"
                  className="range range-xs range-primary"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value="50"
                  className="range range-xs range-secondary"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value="40"
                  className="range range-xs range-accent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex flex-col gap-3 md:w-1/2">
                <input
                  type="text"
                  placeholder="Default"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Primary"
                  className="input input-primary input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Secondary"
                  className="input input-secondary input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Accent"
                  className="input input-accent input-bordered w-full"
                />
              </div>
              <div className="flex flex-col gap-3 md:w-1/2">
                <input
                  type="text"
                  placeholder="Info"
                  className="input input-info input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Success"
                  className="input input-success input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Warning"
                  className="input input-warning input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Error"
                  className="input input-error input-bordered w-full"
                />
              </div>
            </div>
            <div className="navbar bg-neutral text-neutral-content rounded-box">
              <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1">
                <button className="btn btn-ghost text-xl normal-case">
                  daisyUI
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-grow flex-col gap-3">
                <div className="text-4xl font-bold">Text Size 1</div>
                <div className="text-3xl font-bold">Text Size 2</div>
                <div className="text-2xl font-bold">Text Size 3</div>
                <div className="text-xl font-bold">Text Size 4</div>
                <div className="text-lg font-bold">Text Size 5</div>
                <div className="text-sm font-bold">Text Size 6</div>
                <div className="text-xs font-bold">Text Size 7</div>
              </div>
              <ul className="steps steps-vertical">
                <li className="step step-primary">Step 1</li>
                <li className="step step-primary">Step 2</li>
                <li className="step">Step 3</li>
                <li className="step">Step 4</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="alert">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info h-6 w-6 flex-shrink-0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>12 unread messages. Tap to see.</span>
              </div>
            </div>
            <div className="alert alert-info">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>New software update available.</span>
              </div>
            </div>
            <div className="alert alert-success">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Your purchase has been confirmed!</span>
              </div>
            </div>
            <div className="alert alert-warning">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Warning: Invalid email address!</span>
              </div>
            </div>
            <div className="alert alert-error">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Error! Task failed successfully.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
