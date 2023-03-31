/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useCallback, useEffect, useState } from 'react';
import {
  AgentExecutorRequestBody,
  MoodPalletResponse,
} from './api/mood-pallet';

import { useRef } from 'react';

import { default as Color } from 'color';
import { default as randomColor } from 'randomcolor';

export const Index = () => {
  const [colors, setColors] = useState([]);
  const [customTheme, setCustomTheme] = useState({
    primary: '#00A85A',
    secondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#17a2b8',
    dark: '#343a40',
    light: '#f8f9fa',
  });

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

  const wrapper = useRef(null);

  function getColorValueFromTheme(variable) {
    const colorValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(variable);
    if (window && getComputedStyle && colorValue) {
      return Color(`hsl(${colorValue})`).hex();
    }
  }

  const darken = useCallback(
    (name, variable, source, percentage = 0.2) => {
      if (colors.length === 0) return;
      return {
        name: name,
        variable: variable,
        value: Color(colors.find((item) => item.name === source)?.value)
          .darken(percentage)
          .hex(),
      };
    },
    [colors]
  );

  const contrastMaker = useCallback(
    (name, variable, source, percentage = 0.8) => {
      if (colors.length === 0) return;
      if (Color(colors.find((item) => item.name === source)?.value).isDark()) {
        return {
          name: name,
          variable: variable,
          value: Color(colors.find((item) => item.name === source)?.value)
            .mix(Color('white'), percentage)
            .saturate(10),
        };
      } else {
        return {
          name: name,
          variable: variable,
          value: Color(colors.find((item) => item.name === source).value)
            .mix(Color('black'), percentage)
            .saturate(10),
        };
      }
    },
    [colors]
  );

  const generateOptionalColors = useCallback(
    (colors) => {
      if (colors.length === 0) return;
      const optionalColors = [];
      optionalColors.push(darken('primary-focus', '--pf', 'primary'));
      optionalColors.push(darken('secondary-focus', '--sf', 'secondary'));
      optionalColors.push(darken('accent-focus', '--af', 'accent'));
      optionalColors.push(darken('neutral-focus', '--nf', 'neutral'));
      optionalColors.push(darken('base-200', '--b2', 'base-100', 0.1));
      optionalColors.push(darken('base-300', '--b3', 'base-100', 0.2));
      optionalColors.push(contrastMaker('base-content', '--bc', 'base-100'));
      optionalColors.push(contrastMaker('primary-content', '--pc', 'primary'));
      optionalColors.push(
        contrastMaker('secondary-content', '--sc', 'secondary')
      );
      optionalColors.push(contrastMaker('accent-content', '--ac', 'accent'));
      optionalColors.push(contrastMaker('neutral-content', '--nc', 'neutral'));
      optionalColors.push(contrastMaker('info-content', '--inc', 'info'));
      optionalColors.push(contrastMaker('success-content', '--suc', 'success'));
      optionalColors.push(contrastMaker('warning-content', '--wac', 'warning'));
      optionalColors.push(contrastMaker('error-content', '--erc', 'error'));
      return optionalColors;
    },
    [contrastMaker, darken]
  );

  const updateColorTheme = useCallback(() => {
    setColors([
      {
        name: 'primary',
        variable: '--p',
        value: getColorValueFromTheme('--p'),
      },
      {
        name: 'primary-focus',
        variable: '--pf',
        value: getColorValueFromTheme('--pf'),
      },
      {
        name: 'primary-content',
        variable: '--pc',
        value: getColorValueFromTheme('--pc'),
      },
      {
        name: 'secondary',
        variable: '--s',
        value: getColorValueFromTheme('--s'),
      },
      {
        name: 'secondary-focus',
        variable: '--sf',
        value: getColorValueFromTheme('--sf'),
      },
      {
        name: 'secondary-content',
        variable: '--sc',
        value: getColorValueFromTheme('--sc'),
      },
      {
        name: 'accent',
        variable: '--a',
        value: getColorValueFromTheme('--a'),
      },
      {
        name: 'accent-focus',
        variable: '--af',
        value: getColorValueFromTheme('--af'),
      },
      {
        name: 'accent-content',
        variable: '--ac',
        value: getColorValueFromTheme('--ac'),
      },
      {
        name: 'neutral',
        variable: '--n',
        value: getColorValueFromTheme('--n'),
      },
      {
        name: 'neutral-focus',
        variable: '--nf',
        value: getColorValueFromTheme('--nf'),
      },
      {
        name: 'neutral-content',
        variable: '--nc',
        value: getColorValueFromTheme('--nc'),
      },
      {
        name: 'base-100',
        variable: '--b1',
        value: getColorValueFromTheme('--b1'),
      },
      {
        name: 'base-200',
        variable: '--b2',
        value: getColorValueFromTheme('--b2'),
      },
      {
        name: 'base-300',
        variable: '--b3',
        value: getColorValueFromTheme('--b3'),
      },
      {
        name: 'base-content',
        variable: '--bc',
        value: getColorValueFromTheme('--bc'),
      },
      {
        name: 'info',
        variable: '--in',
        value: getColorValueFromTheme('--in'),
      },
      {
        name: 'info-content',
        variable: '--inc',
        value: getColorValueFromTheme('--inc'),
      },
      {
        name: 'success',
        variable: '--su',
        value: getColorValueFromTheme('--su'),
      },
      {
        name: 'success-content',
        variable: '--suc',
        value: getColorValueFromTheme('--suc'),
      },
      {
        name: 'warning',
        variable: '--wa',
        value: getColorValueFromTheme('--wa'),
      },
      {
        name: 'warning-content',
        variable: '--wac',
        value: getColorValueFromTheme('--wac'),
      },
      {
        name: 'error',
        variable: '--er',
        value: getColorValueFromTheme('--er'),
      },
      {
        name: 'error-content',
        variable: '--erc',
        value: getColorValueFromTheme('--erc'),
      },
    ]);
  }, []);

  const generateColors = useCallback(
    (newColorToCheck = 'transparent') => {
      console.log('generateColors', colors, wrapper);
      if (colors.length === 0 || !wrapper) return;
      if (CSS.supports('color', newColorToCheck)) {
        colors
          .filter((item) => requiredColorNames.includes(item.name))
          .forEach((color) => {
            const hslValue = Color(color.value).hsl().round().array();
            wrapper.current.style.setProperty(
              color.variable,
              hslValue[0] + ' ' + hslValue[1] + '% ' + hslValue[2] + '%'
            );
          });
        generateOptionalColors(colors).forEach((color) => {
          const hslValue = Color(color.value).hsl().round().array();
          wrapper.current.style.setProperty(
            color.variable,
            hslValue[0] + ' ' + hslValue[1] + '% ' + hslValue[2] + '%'
          );
        });
        localStorage.setItem(
          'daisyui-theme-generator-colors',
          JSON.stringify(colors)
        );

        console.log('colors generated', colors);
        updateColorTheme();
      } else {
        console.log(`${newColorToCheck} is not a valid color`);
      }
    },
    [
      colors,
      generateOptionalColors,
      requiredColorNames,
      updateColorTheme,
      wrapper,
    ]
  );

  const resetColors = () => {
    if (localStorage.getItem('daisyui-theme-generator-colors')) {
      localStorage.removeItem('daisyui-theme-generator-colors');
      setColors(
        JSON.parse(
          localStorage.getItem('daisyui-theme-generator-default-colors')
        )
      );
      generateColors();
    }
  };

  const randomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const randomize = () => {
    localStorage.removeItem('daisyui-theme-generator-colors');
    ['primary', 'secondary', 'accent'].forEach((element) => {
      colors[0].value = randomColor(); //primary
      colors[3].value = randomColor(); //secondary
      colors[6].value = randomColor(); //accent
      colors[9].value = Color(
        `hsl(${randomBetween(200, 300)} ${randomBetween(
          10,
          30
        )}% ${randomBetween(10, 20)}%)`
      ).hex(); //neutral
      colors[12].value = Color(
        `hsl(${randomBetween(200, 300)} ${randomBetween(0, 40)}% ${
          [randomBetween(20, 30), randomBetween(90, 100)][
            Math.round(Math.random())
          ]
        }%)`
      ).hex(); //base-100
      colors[16].value = Color(
        `hsl(${randomBetween(190, 230)} ${randomBetween(
          50,
          90
        )}% ${randomBetween(50, 80)}%)`
      ).hex(); //info
      colors[18].value = Color(
        `hsl(${randomBetween(142, 175)} ${randomBetween(
          60,
          80
        )}% ${randomBetween(20, 70)}%)`
      ).hex(); //success
      colors[20].value = Color(
        `hsl(${randomBetween(30, 50)} ${randomBetween(80, 97)}% ${randomBetween(
          30,
          70
        )}%)`
      ).hex(); //warning
      colors[22].value = Color(
        `hsl(${randomBetween(340, 370)} ${randomBetween(
          70,
          97
        )}% ${randomBetween(50, 70)}%)`
      ).hex(); //error
    });
    generateColors();
  };

  const mapThemeColors = useCallback(
    (theme) => {
      const themeColors = [];
      Object.keys(theme).forEach((key) => {
        if (requiredColorNames.includes(key)) {
          themeColors.push({
            name: key,
            variable: `--${key}`,
            value: theme[key],
          });
        }
      });
      console.log('theme colors', themeColors);
      return themeColors;
    },
    [requiredColorNames]
  );

  // useEffect(() => {
  //   const colors = mapThemeColors(customTheme);

  //   setColors(colors);

  //   localStorage.setItem(
  //     'daisyui-theme-generator-colors',
  //     JSON.stringify(colors)
  //   );
  //   // if (localStorage.getItem('daisyui-theme-generator-colors')) {
  //   //   setColors(
  //   //     JSON.parse(localStorage.getItem('daisyui-theme-generator-colors'))
  //   //   );
  //   // }
  //   // generateColors();
  // }, [colors, customTheme, generateColors, mapThemeColors]);

  useEffect(() => {
    const defaultThemeColors = JSON.parse(
      localStorage.getItem('daisyui-theme-default-colors')
    );
    if (!defaultThemeColors || defaultThemeColors?.length === 0) {
      console.log(
        'set defaultThemeColors',
        defaultThemeColors,
        JSON.stringify(mapThemeColors(customTheme))
      );
      localStorage.setItem(
        'daisyui-theme-default-colors',
        JSON.stringify(mapThemeColors(customTheme))
      );

      setColors(mapThemeColors(customTheme));

      generateColors();
    } else if (defaultThemeColors && !colors) {
      console.log('defaultThemeColors', defaultThemeColors);
      // setColors(defaultThemeColors);
      setColors(mapThemeColors(customTheme));
      generateColors();
    }
  }, [colors, customTheme, generateColors, mapThemeColors]);

  const [mood, setMood] = useState(
    'rainy day vibes with a side of coffee and sunflowers'
  );
  const [loading, setLoading] = useState(false);

  const [moodPallet, setMoodPallet] = useState<MoodPalletResponse>();

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
      verbose: false,
    };

    await fetch('api/mood-pallet', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json() as Promise<MoodPalletResponse>)
      .then((moodPallet: MoodPalletResponse) => {
        setMoodPallet(moodPallet);
        setMood('');
        setLoading(false);
      });
  }, [mood]);

  return (
    <div>
      <div className="p-8">
        <>
          {' '}
          Colors: <br />
          {JSON.stringify(
            colors.filter((item) => requiredColorNames.includes(item.name))
          )}
        </>
      </div>

      <h2 className="px-2 pb-4 text-xl font-bold">Preview</h2>
      <div data-theme="light" className="bg-transparent">
        <div
          className="rounded-box bg-base-100 border-base-content/5 text-base-content not-prose grid gap-3 border p-6"
          data-theme="mytheme"
          ref={wrapper}
          // bind:this={wrapper}
        >
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
              <div className="md:w-1/2">
                <div className="tabs">
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
                  // style={{ value: 60, "--value": "60", '--size': '3.5rem' }}
                >
                  60%
                </div>
                <div
                  className="radial-progress"
                  // style="--value:75;--size:3.5rem"
                >
                  75%
                </div>
                <div
                  className="radial-progress"
                  // style="--value:90;--size:3.5rem"
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
    // <div className="text-base-content glass xl:rounded-box grid gap-4 bg-opacity-60 p-0 m-0 w-full">
    //   <div className="px-2 pt-2">
    //     <div className="navbar text-primary-content rounded-box space-x-1">
    //       <div className="hidden flex-none md:flex">
    //         <div className="dropdown">
    //           <div tabIndex={0}>
    //             <button
    //               aria-label="drawer component"
    //               className="btn btn-ghost mask mask-squircle btn-square focus:bg-base-content border-none focus:bg-opacity-50"
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 className="inline-block h-6 w-6 stroke-current"
    //               >
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   stroke-width="2"
    //                   d="M4 6h16M4 12h16M4 18h16"
    //                 />
    //               </svg>
    //             </button>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   drawer component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Drawer component is useful for opening a sidebar menu
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/drawer"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="mx-2 flex-1 justify-center px-2 md:flex md:justify-start">
    //         <span className="text-2xl font-bold">
    //           {/* {$t('components-preview-title')} */}
    //           Components Preview
    //         </span>
    //       </div>
    //       <div className="hidden flex-1 md:flex md:flex-none">
    //         <div className="form-control">
    //           <div className="dropdown">
    //             <div tabIndex={0}>
    //               <input
    //                 placeholder="Text Input"
    //                 className="input input-ghost input-bordered text-primary-content placeholder-primary-content focus:text-primary-content rounded-full focus:bg-transparent"
    //               />
    //             </div>
    //             <div tabIndex={0} className="dropdown-content py-2">
    //               <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //                 <div className="card-body">
    //                   <h2 className="card-title font-extrabold capitalize">
    //                     text input component
    //                   </h2>
    //                   <p className="text-neutral-content text-sm text-opacity-80">
    //                     Text input comes in various sizes and styles
    //                   </p>
    //                   <div className="mt-4 flex justify-end">
    //                     <a
    //                       href="/components/input"
    //                       className="btn btn-primary btn-sm xl:btn-md"
    //                     >
    //                       See component
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="dropdown dropdown-left">
    //         <div tabIndex={0}>
    //           <button
    //             aria-label="button component"
    //             className="btn btn-ghost mask mask-squircle btn-square focus:bg-base-content hidden border-none focus:bg-opacity-50 md:flex"
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               className="inline-block h-6 w-6 stroke-current"
    //             >
    //               <path
    //                 stroke-linecap="round"
    //                 stroke-linejoin="round"
    //                 stroke-width="2"
    //                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    //               />
    //             </svg>
    //           </button>
    //         </div>
    //         <div tabIndex={0} className="dropdown-content py-2">
    //           <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //             <div className="card-body">
    //               <h2 className="card-title font-extrabold capitalize">
    //                 navbar component
    //               </h2>
    //               <p className="text-neutral-content text-sm text-opacity-80">
    //                 You'll need a navbar on top of your page
    //               </p>
    //               <div className="mt-4 flex justify-end">
    //                 <a
    //                   href="/components/navbar"
    //                   className="btn btn-primary btn-sm xl:btn-md"
    //                 >
    //                   See component
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="dropdown dropdown-left">
    //         <div tabIndex={0}>
    //           <button
    //             aria-label="button component"
    //             className="btn btn-ghost mask mask-squircle btn-square focus:bg-base-content hidden border-none focus:bg-opacity-50 md:flex"
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               className="inline-block h-6 w-6 stroke-current"
    //             >
    //               <path
    //                 stroke-linecap="round"
    //                 stroke-linejoin="round"
    //                 stroke-width="2"
    //                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    //               />
    //             </svg>
    //           </button>
    //         </div>
    //         <div tabIndex={0} className="dropdown-content py-2">
    //           <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //             <div className="card-body">
    //               <h2 className="card-title font-extrabold capitalize">
    //                 navbar component
    //               </h2>
    //               <p className="text-neutral-content text-sm text-opacity-80">
    //                 You'll need a navbar on top of your page
    //               </p>
    //               <div className="mt-4 flex justify-end">
    //                 <a
    //                   href="/components/navbar"
    //                   className="btn btn-primary btn-sm xl:btn-md"
    //                 >
    //                   See component
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="dropdown dropdown-left">
    //         <div tabIndex={0}>
    //           <button
    //             aria-label="navbar component"
    //             className="btn btn-ghost mask mask-squircle btn-square focus:bg-base-content hidden border-none focus:bg-opacity-50 md:flex"
    //           >
    //             <div className="avatar">
    //               <div className="mask mask-squircle h-10 w-10">
    //                 <img
    //                   src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=1380&t=st=1680277112~exp=1680277712~hmac=a3eeb74643a9a7aa6b470b49073cab9d2d44fcc6786c4812a6312b9ab7da6aa9"
    //                   alt="Avatar Tailwind CSS Component"
    //                 />
    //               </div>
    //             </div>
    //           </button>
    //         </div>
    //         <div tabIndex={0} className="dropdown-content py-2">
    //           <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //             <div className="card-body">
    //               <h2 className="card-title font-extrabold capitalize">
    //                 avatar component
    //               </h2>
    //               <p className="text-neutral-content text-sm text-opacity-80">
    //                 Use avatar component with any size
    //               </p>
    //               <div className="mt-4 flex justify-end">
    //                 <a
    //                   href="/components/avatar"
    //                   className="btn btn-primary btn-sm xl:btn-md"
    //                 >
    //                   See component
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div
    //     id="component-demo"
    //     className="flex flex-wrap w-full items-center gap-4 overflow-y-hidden overflow-x-scroll px-10 pb-10"
    //   >
    //     <div className="bg-base-100 rounded-box col-span-3 row-span-3 mx-2 grid w-72 flex-shrink-0 place-items-center items-center gap-4 p-4 py-8 shadow-xl xl:mx-0 xl:w-full">
    //       <div className="dropdown">
    //         <div tabIndex={0}>
    //           <div className="online avatar">
    //             <div className="mask mask-squircle bg-base-content h-24 w-24 bg-opacity-10 p-px">
    //               <img
    //                 src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=1380&t=st=1680277112~exp=1680277712~hmac=a3eeb74643a9a7aa6b470b49073cab9d2d44fcc6786c4812a6312b9ab7da6aa9"
    //                 width="94"
    //                 height="94"
    //                 alt="Avatar Tailwind CSS Component"
    //                 className="mask mask-squircle"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //         <div tabIndex={0} className="dropdown-content py-2">
    //           <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //             <div className="card-body">
    //               <h2 className="card-title font-extrabold capitalize">
    //                 avatar component
    //               </h2>
    //               <p className="text-neutral-content text-sm text-opacity-80">
    //                 Use avatar component with any size
    //               </p>
    //               <div className="mt-4 flex justify-end">
    //                 <a
    //                   href="/components/avatar"
    //                   className="btn btn-primary btn-sm xl:btn-md"
    //                 >
    //                   See component
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div>
    //         <div className="dropdown w-full">
    //           <div tabIndex={0}>
    //             <div className="text-center">
    //               <div className="text-lg font-extrabold">Betsy Braddock</div>
    //               <div className="text-base-content/70 my-3 text-sm">
    //                 Strategic Art Manager
    //                 <br />
    //                 Global Illustration Observer
    //                 <br />
    //                 Business Alignment Developer
    //               </div>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   card component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Card component is used to show products, features and
    //                   more.
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/card"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="dropdown w-full">
    //           <div tabIndex={0}>
    //             <div className="mt-2 text-center">
    //               <div className="badge badge-ghost">Design</div>
    //               <div className="badge badge-ghost">Art</div>
    //               <div className="badge badge-ghost">Illustration</div>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   badge component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Use badge component to highlight small inline items
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/badge"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="dropdown dropdown-top">
    //         <div tabIndex={0}>
    //           <div className="btn-group">
    //             <button className="btn btn-accent btn-sm">Follow</button>
    //             <button
    //               aria-label="button component"
    //               className="btn btn-accent btn-square btn-sm"
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 className="h-6 w-6 stroke-current"
    //               >
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   stroke-width="2"
    //                   d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
    //                 />
    //               </svg>
    //             </button>
    //           </div>
    //         </div>
    //         <div tabIndex={0} className="dropdown-content py-2">
    //           <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //             <div className="card-body">
    //               <h2 className="card-title font-extrabold capitalize">
    //                 button group component
    //               </h2>
    //               <p className="text-neutral-content text-sm text-opacity-80">
    //                 Use it to group multiple buttons together
    //               </p>
    //               <div className="mt-4 flex justify-end">
    //                 <a
    //                   href="/components/button-group"
    //                   className="btn btn-primary btn-sm xl:btn-md"
    //                 >
    //                   See component
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="bg-base-100 rounded-box col-span-3 row-span-3 mx-2 flex w-72 flex-shrink-0 flex-col justify-center gap-4 p-4 shadow-xl xl:mx-0 xl:w-full">
    //       <div className="px-6 pt-6">
    //         <div className="text-xl font-extrabold">Superpower settings</div>
    //         <div className="text-base-content/70 my-4 text-xs">
    //           Enable your favorite superpowers. Terms and conditions apply
    //         </div>
    //         <div className="dropdown w-full flex-1">
    //           <div tabIndex={0}>
    //             <div className="form-control">
    //               <label className="label cursor-pointer">
    //                 <span className="label-text">Enable teleportation</span>
    //                 <input
    //                   type="checkbox"
    //                   checked
    //                   className="toggle toggle-primary"
    //                 />
    //               </label>
    //             </div>
    //             <div className="form-control">
    //               <label className="label cursor-pointer">
    //                 <span className="label-text">Enable time travel</span>
    //                 <input
    //                   type="checkbox"
    //                   checked
    //                   className="toggle toggle-secondary"
    //                 />
    //               </label>
    //             </div>
    //             <div className="form-control">
    //               <label className="label cursor-pointer">
    //                 <span className="label-text">Enable laser eyes</span>
    //                 <input
    //                   type="checkbox"
    //                   checked
    //                   className="toggle toggle-accent"
    //                 />
    //               </label>
    //             </div>
    //             <div className="form-control">
    //               <label className="label cursor-pointer">
    //                 <span className="label-text">Enable immortality</span>
    //                 <input type="checkbox" checked className="toggle" />
    //               </label>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   toggle component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Use toggle to switch between two states
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/toggle"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="form-control">
    //         <div className="dropdown dropdown-top dropdown-end">
    //           <div tabIndex={0}>
    //             <button className="btn btn-secondary btn-block space-x-2">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 className="h-6 w-6 stroke-current"
    //               >
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   stroke-width="2"
    //                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    //                 />
    //               </svg>
    //               <span>Apply settings</span>
    //             </button>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   button component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Buttons come in various shapes, colors and sizes
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/button"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="card card-compact xl:card-normal bg-base-100 col-span-3 row-span-4 mx-2 w-72 flex-shrink-0 overflow-visible shadow-xl xl:mx-0 xl:w-auto">
    //       <div className="dropdown">
    //         <div tabIndex={0}>
    //           <figure>
    //             <img
    //               src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=1380&t=st=1680277112~exp=1680277712~hmac=a3eeb74643a9a7aa6b470b49073cab9d2d44fcc6786c4812a6312b9ab7da6aa9"
    //               width="300"
    //               height="187"
    //               alt="Card Tailwind CSS Component"
    //               className="rounded-t-box"
    //             />
    //           </figure>
    //         </div>
    //         <div tabIndex={0} className="dropdown-content py-2">
    //           <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //             <div className="card-body">
    //               <h2 className="card-title font-extrabold capitalize">
    //                 card component
    //               </h2>
    //               <p className="text-neutral-content text-sm text-opacity-80">
    //                 Card component is used to show products, features and more.
    //               </p>
    //               <div className="mt-4 flex justify-end">
    //                 <a
    //                   href="/components/card"
    //                   className="btn btn-primary btn-sm xl:btn-md"
    //                 >
    //                   See component
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="card-body">
    //         <div className="card-title flex items-center font-extrabold">
    //           Card Component
    //           <div className="dropdown dropdown-top dropdown-end">
    //             <div tabIndex={0}>
    //               <div
    //                 tabIndex={0}
    //                 className="btn btn-ghost text-info btn-xs btn-circle mx-1 inline-block"
    //               >
    //                 <svg
    //                   width="20"
    //                   height="20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   className="inline h-5 w-5 stroke-current"
    //                 >
    //                   <path
    //                     stroke-linecap="round"
    //                     stroke-linejoin="round"
    //                     stroke-width="2"
    //                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //                   />
    //                 </svg>
    //               </div>
    //             </div>
    //             <div tabIndex={0} className="dropdown-content py-2">
    //               <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //                 <div className="card-body">
    //                   <h2 className="card-title font-extrabold capitalize">
    //                     dropdown component
    //                   </h2>
    //                   <p className="text-neutral-content text-sm text-opacity-80">
    //                     helper dropdown can show an element when focused.
    //                   </p>
    //                   <div className="mt-4 flex justify-end">
    //                     <a
    //                       href="/components/dropdown"
    //                       className="btn btn-primary btn-sm xl:btn-md"
    //                     >
    //                       See component
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="dropdown w-full">
    //           <div tabIndex={0}>
    //             <div className="mb-2">
    //               <div className="badge badge-ghost">May 14th</div>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   badge component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Use badge component to highlight small inline items
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/badge"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <p className="text-base-content text-sm text-opacity-80">
    //           Use card component to easily show blog posts, products, features,
    //           items and more.
    //         </p>
    //         <div className="card-actions justify-end">
    //           <div className="dropdown dropdown-top dropdown-end">
    //             <div tabIndex={0}>
    //               <button className="btn btn-primary">Get Started</button>
    //             </div>
    //             <div tabIndex={0} className="dropdown-content py-2">
    //               <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //                 <div className="card-body">
    //                   <h2 className="card-title font-extrabold capitalize">
    //                     button component
    //                   </h2>
    //                   <p className="text-neutral-content text-sm text-opacity-80">
    //                     Buttons come in various shapes, colors and sizes
    //                   </p>
    //                   <div className="mt-4 flex justify-end">
    //                     <a
    //                       href="/components/button"
    //                       className="btn btn-primary btn-sm xl:btn-md"
    //                     >
    //                       See component
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-span-3 row-span-3 mx-2 flex w-72 flex-shrink-0 flex-col xl:mx-0 xl:w-full">
    //       <div className="dropdown">
    //         <div tabIndex={0} className="bg-opacity-100">
    //           <div className="tabs w-full flex-grow-0">
    //             <button className="tab tab-lifted tab-active tab-border-none tab-lg flex-1">
    //               Stats
    //             </button>
    //             <button className="tab tab-lifted tab-border-none tab-lg flex-1">
    //               Info
    //             </button>
    //             <button className="tab tab-lifted tab-border-none tab-lg flex-1">
    //               Options
    //             </button>
    //           </div>
    //         </div>
    //         <div tabIndex={0} className="dropdown-content py-2">
    //           <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //             <div className="card-body">
    //               <h2 className="card-title font-extrabold capitalize">
    //                 tab component
    //               </h2>
    //               <p className="text-neutral-content text-sm text-opacity-80">
    //                 Beautiful tabs to switch between sections
    //               </p>
    //               <div className="mt-4 flex justify-end">
    //                 <a
    //                   href="/components/tab"
    //                   className="btn btn-primary btn-sm xl:btn-md"
    //                 >
    //                   See component
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="bg-base-100 grid w-full flex-grow gap-3 rounded-xl rounded-tl-none p-6 shadow-xl">
    //         <div className="flex items-center space-x-2">
    //           <div className="dropdown">
    //             <div tabIndex={0}>
    //               <div className="online avatar">
    //                 <div className="mask mask-hexagon bg-base-content h-16 w-16 bg-opacity-10 p-px">
    //                   <img
    //                     src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=1380&t=st=1680277112~exp=1680277712~hmac=a3eeb74643a9a7aa6b470b49073cab9d2d44fcc6786c4812a6312b9ab7da6aa9"
    //                     alt="Avatar Tailwind CSS Component"
    //                     className="mask mask-hexagon"
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //             <div tabIndex={0} className="dropdown-content py-2">
    //               <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //                 <div className="card-body">
    //                   <h2 className="card-title font-extrabold capitalize">
    //                     avatar component
    //                   </h2>
    //                   <p className="text-neutral-content text-sm text-opacity-80">
    //                     Use avatar component with any size
    //                   </p>
    //                   <div className="mt-4 flex justify-end">
    //                     <a
    //                       href="/components/avatar"
    //                       className="btn btn-primary btn-sm xl:btn-md"
    //                     >
    //                       See component
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div>
    //             <div className="text-lg font-extrabold">Beatrice Thurman</div>
    //             <div className="text-base-content/70 text-sm">
    //               220 Followers
    //             </div>
    //           </div>
    //         </div>
    //         <div className="dropdown">
    //           <div tabIndex={0}>
    //             <div className="divider text-base-content/60 m-0">Reports</div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   divider component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   User divider component to visually separate items
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/divider"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="text-lg font-extrabold">Audience Report</div>
    //         <div className="grid gap-3">
    //           <div className="dropdown dropdown-top">
    //             <div tabIndex={0}>
    //               <div className="flex items-center p-1">
    //                 <span className="text-base-content/70 w-48 text-xs">
    //                   Search Engines
    //                 </span>
    //                 <progress
    //                   max="100"
    //                   value="50"
    //                   className="progress progress-success"
    //                 />
    //               </div>
    //               <div className="flex items-center p-1">
    //                 <span className="text-base-content/70 w-48 text-xs">
    //                   Direct
    //                 </span>
    //                 <progress
    //                   max="100"
    //                   value="30"
    //                   className="progress progress-primary"
    //                 />
    //               </div>
    //               <div className="flex items-center p-1">
    //                 <span className="text-base-content/70 w-48 text-xs">
    //                   Social Media
    //                 </span>
    //                 <progress
    //                   max="100"
    //                   value="70"
    //                   className="progress progress-secondary"
    //                 />
    //               </div>
    //               <div className="flex items-center p-1">
    //                 <span className="text-base-content/70 w-48 text-xs">
    //                   Emails
    //                 </span>
    //                 <progress
    //                   max="100"
    //                   value="90"
    //                   className="progress progress-accent"
    //                 />
    //               </div>
    //               <div className="flex items-center p-1">
    //                 <span className="text-base-content/70 w-48 text-xs">
    //                   Ad campaigns
    //                 </span>
    //                 <progress
    //                   max="100"
    //                   value="65"
    //                   className="progress progress-warning"
    //                 />
    //               </div>
    //             </div>
    //             <div tabIndex={0} className="dropdown-content py-2">
    //               <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //                 <div className="card-body">
    //                   <h2 className="card-title font-extrabold capitalize">
    //                     progress component
    //                   </h2>
    //                   <p className="text-neutral-content text-sm text-opacity-80">
    //                     Show progressbar, loadings or simple bar charts using
    //                     progress component
    //                   </p>
    //                   <div className="mt-4 flex justify-end">
    //                     <a
    //                       href="/components/progress"
    //                       className="btn btn-primary btn-sm xl:btn-md"
    //                     >
    //                       See component
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-span-3 row-span-1 mx-2 flex w-72 flex-shrink-0 flex-col justify-center xl:mx-0 xl:w-auto">
    //       <div className="dropdown dropdown-end w-full">
    //         <div tabIndex={0}>
    //           <div className="flex items-center justify-between">
    //             <div className="online avatar">
    //               <div className="mask mask-squircle bg-base-100 h-16 w-16 p-1">
    //                 <img
    //                   src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=1380&t=st=1680277112~exp=1680277712~hmac=a3eeb74643a9a7aa6b470b49073cab9d2d44fcc6786c4812a6312b9ab7da6aa9"
    //                   alt="Avatar Tailwind CSS Component"
    //                   className="mask mask-squircle"
    //                 />
    //               </div>
    //             </div>
    //             <div className="online avatar">
    //               <div className="mask mask-squircle bg-base-100 h-16 w-16 p-1">
    //                 <img
    //                   src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=1380&t=st=1680277112~exp=1680277712~hmac=a3eeb74643a9a7aa6b470b49073cab9d2d44fcc6786c4812a6312b9ab7da6aa9"
    //                   alt="Avatar Tailwind CSS Component"
    //                   className="mask mask-squircle"
    //                 />
    //               </div>
    //             </div>
    //             <div className="avatar offline">
    //               <div className="mask mask-squircle bg-base-100 h-16 w-16 p-1">
    //                 <img
    //                   src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=1380&t=st=1680277112~exp=1680277712~hmac=a3eeb74643a9a7aa6b470b49073cab9d2d44fcc6786c4812a6312b9ab7da6aa9"
    //                   alt="Avatar Tailwind CSS Component"
    //                   className="mask mask-squircle"
    //                 />
    //               </div>
    //             </div>
    //             <div className="avatar">
    //               <div className="mask mask-squircle bg-base-100 h-16 w-16 p-1">
    //                 <img
    //                   src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=1380&t=st=1680277112~exp=1680277712~hmac=a3eeb74643a9a7aa6b470b49073cab9d2d44fcc6786c4812a6312b9ab7da6aa9"
    //                   alt="Avatar Tailwind CSS Component"
    //                   className="mask mask-squircle"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div tabIndex={0} className="dropdown-content py-2">
    //           <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //             <div className="card-body">
    //               <h2 className="card-title font-extrabold capitalize">
    //                 avatar component
    //               </h2>
    //               <p className="text-neutral-content text-sm text-opacity-80">
    //                 Use avatar component with any size
    //               </p>
    //               <div className="mt-4 flex justify-end">
    //                 <a
    //                   href="/components/avatar"
    //                   className="btn btn-primary btn-sm xl:btn-md"
    //                 >
    //                   See component
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="bg-base-100 text-base-content rounded-box col-span-3 row-span-4 mx-2 grid w-72 flex-shrink-0 shadow-xl xl:mx-0 xl:w-auto xl:place-self-stretch">
    //       <div className="grid w-full grid-cols-1 gap-4 p-4">
    //         <div className="dropdown">
    //           <div tabIndex={0}>
    //             <div className="grid w-full grid-cols-2 gap-4">
    //               <button className="btn btn-block">Neutral</button>
    //               <button className="btn btn-primary btn-block">primary</button>
    //               <button className="btn btn-secondary btn-block">
    //                 secondary
    //               </button>
    //               <button className="btn btn-accent btn-block">accent</button>
    //               <button className="btn btn-info btn-block">info</button>
    //               <button className="btn btn-success btn-block">success</button>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   button component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Buttons come in various shapes, colors and sizes
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/button"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="dropdown dropdown-top">
    //           <div tabIndex={0}>
    //             <div className="grid w-full grid-cols-2 gap-4">
    //               <button className="btn btn-warning btn-block">warning</button>
    //               <button className="btn btn-error btn-block">error</button>
    //               <button className="btn btn-outline btn-block">outline</button>
    //               <button className="btn btn-outline btn-primary btn-block">
    //                 primary
    //               </button>
    //               <button className="btn btn-outline btn-secondary btn-block">
    //                 secondary
    //               </button>
    //               <button className="btn btn-outline btn-accent btn-block">
    //                 accent
    //               </button>
    //               <button className="btn btn-ghost btn-block">ghost</button>
    //               <button className="btn btn-link btn-block">link</button>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   button component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Buttons come in various shapes, colors and sizes
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/button"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-span-3 row-span-2 mx-2 grid w-72 flex-shrink-0 gap-4 xl:mx-0 xl:w-auto">
    //       <div className="dropdown dropdown-end dropdown-top">
    //         <div tabIndex={0}>
    //           <div className="grid gap-4">
    //             <div className="btn-group flex">
    //               <button className="btn flex-1">1</button>
    //               <button className="btn btn-active flex-1">2</button>
    //               <button className="btn flex-1">3</button>
    //               <button className="btn flex-1">4</button>
    //               <button className="btn flex-1">5</button>
    //             </div>
    //             <div className="btn-group flex">
    //               <button className="btn btn-outline flex-1">1</button>
    //               <button className="btn btn-outline flex-1">2</button>
    //               <button className="btn btn-outline flex-1">3</button>
    //               <button className="btn btn-outline flex-1">4</button>
    //               <button className="btn btn-outline flex-1">5</button>
    //             </div>
    //           </div>
    //         </div>
    //         <div tabIndex={0} className="dropdown-content py-2">
    //           <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //             <div className="card-body">
    //               <h2 className="card-title font-extrabold capitalize">
    //                 pagination component
    //               </h2>
    //               <p className="text-neutral-content text-sm text-opacity-80">
    //                 Pagination buttons in many colors and sizes!
    //               </p>
    //               <div className="mt-4 flex justify-end">
    //                 <a
    //                   href="/components/pagination"
    //                   className="btn btn-primary btn-sm xl:btn-md"
    //                 >
    //                   See component
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="dropdown dropdown-end dropdown-top">
    //         <div tabIndex={0}>
    //           <div className="tabs tabs-boxed items-center">
    //             <button className="tab flex-1">Tab 1</button>
    //             <button className="tab tab-active flex-1">Tab 2</button>
    //             <button className="tab flex-1">Tab 3</button>
    //           </div>
    //         </div>
    //         <div tabIndex={0} className="dropdown-content py-2">
    //           <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //             <div className="card-body">
    //               <h2 className="card-title font-extrabold capitalize">
    //                 tab component
    //               </h2>
    //               <p className="text-neutral-content text-sm text-opacity-80">
    //                 Tab component with several sizes and styles
    //               </p>
    //               <div className="mt-4 flex justify-end">
    //                 <a
    //                   href="/components/tab"
    //                   className="btn btn-primary btn-sm xl:btn-md"
    //                 >
    //                   See component
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="bg-base-100 text-base-content rounded-box col-span-3 row-span-3 mx-2 grid w-72 flex-shrink-0 items-stretch shadow-xl xl:mx-0 xl:w-auto xl:place-self-stretch">
    //       <div className="grid place-content-center gap-4 p-4">
    //         <div className="dropdown dropdown-end">
    //           <div tabIndex={0}>
    //             <div className="alert flex-col space-y-2">
    //               <div className="flex-1">
    //                 <span className="mx-3 text-sm">
    //                   Lorem ipsum dolor sit amet, consectetur adip!
    //                 </span>
    //               </div>
    //               <div className="flex-none">
    //                 <button className="btn btn-primary btn-outline btn-sm mr-2">
    //                   Cancel
    //                 </button>
    //                 <button className="btn btn-primary btn-sm">Apply</button>
    //               </div>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   alert component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Show alerts, warnings, notification or other info
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/alert"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="dropdown dropdown-end dropdown-top">
    //           <div tabIndex={0}>
    //             <div className="alert alert-info">
    //               <div className="flex-1">
    //                 <svg
    //                   width="20"
    //                   height="20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   className="mx-2 h-6 w-6 stroke-current"
    //                 >
    //                   <path
    //                     stroke-linecap="round"
    //                     stroke-linejoin="round"
    //                     stroke-width="2"
    //                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //                   />
    //                 </svg>
    //                 <span className="text-sm">
    //                   Lorem ipsum dolor sit amet, consectetur adip!
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   alert component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Show alerts, warnings, notification or other info
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/alert"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="dropdown dropdown-end dropdown-top">
    //           <div tabIndex={0}>
    //             <div className="alert alert-success">
    //               <div className="flex-1">
    //                 <svg
    //                   width="20"
    //                   height="20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   className="mx-2 h-6 w-6 stroke-current"
    //                 >
    //                   <path
    //                     stroke-linecap="round"
    //                     stroke-linejoin="round"
    //                     stroke-width="2"
    //                     d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    //                   />
    //                 </svg>
    //                 <span className="text-sm">
    //                   Lorem ipsum dolor sit amet, consectetur adip!
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   alert component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Show alerts, warnings, notification or other info
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/alert"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-span-3 row-span-2 mx-2 grid w-72 flex-shrink-0 gap-4 xl:mx-0 xl:w-auto xl:place-self-stretch">
    //       <div className="bg-base-100 text-base-content rounded-box shadow-xl">
    //         <div className="dropdown dropdown-end w-full">
    //           <div tabIndex={0}>
    //             <ul className="menu overflow-visible p-3">
    //               <li className="menu-title">
    //                 <span>Menu Title</span>
    //               </li>
    //               <li>
    //                 <button>
    //                   <svg
    //                     width="20"
    //                     height="20"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     className="mr-2 inline-block h-5 w-5 stroke-current"
    //                   >
    //                     <path
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                       stroke-width="2"
    //                       d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    //                     />
    //                   </svg>
    //                   Menu Item 1
    //                 </button>
    //               </li>
    //               <li>
    //                 <button>
    //                   <svg
    //                     width="20"
    //                     height="20"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     className="mr-2 inline-block h-5 w-5 stroke-current"
    //                   >
    //                     <path
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                       stroke-width="2"
    //                       d="M13 10V3L4 14h7v7l9-11h-7z"
    //                     />
    //                   </svg>
    //                   Menu Item 2
    //                 </button>
    //               </li>
    //               <li>
    //                 <button>
    //                   <svg
    //                     width="20"
    //                     height="20"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     className="mr-2 inline-block h-5 w-5 stroke-current"
    //                   >
    //                     <path
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                       stroke-width="2"
    //                       d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    //                     />
    //                   </svg>
    //                   Menu Item 3<div className="badge badge-success">new</div>
    //                 </button>
    //               </li>
    //             </ul>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   menu component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Use it for sidebar or any other list of items
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/menu"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-span-3 row-span-1 mx-2 grid w-72 flex-shrink-0 gap-4 xl:mx-0 xl:w-auto">
    //       <div className="bg-base-100 text-base-content rounded-box shadow-xl">
    //         <div className="dropdown dropdown-end dropdown-top w-full">
    //           <div tabIndex={0}>
    //             <div className="flex justify-center gap-8 p-4">
    //               <label aria-label="checkbox CSS component">
    //                 <input type="checkbox" checked className="checkbox" />
    //               </label>
    //               <label aria-label="checkbox CSS component">
    //                 <input
    //                   type="checkbox"
    //                   checked
    //                   className="checkbox checkbox-primary"
    //                 />
    //               </label>
    //               <label aria-label="checkbox CSS component">
    //                 <input
    //                   type="checkbox"
    //                   checked
    //                   className="checkbox checkbox-secondary"
    //                 />
    //               </label>
    //               <label aria-label="checkbox CSS component">
    //                 <input
    //                   type="checkbox"
    //                   checked
    //                   className="checkbox checkbox-accent"
    //                 />
    //               </label>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   checkbox component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Colorful, animated and accessible
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/checkbox"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="dropdown dropdown-end w-full">
    //           <div tabIndex={0}>
    //             <div className="rating rating-lg rating-half w-full justify-center px-4 pb-4">
    //               <input
    //                 type="radio"
    //                 aria-label="Rating reset"
    //                 name="rating-10"
    //                 className="rating-hidden"
    //               />
    //               <input
    //                 type="radio"
    //                 aria-label="Rating half star"
    //                 name="rating-10"
    //                 className="mask mask-star-2 mask-half-1 bg-green-500"
    //               />
    //               <input
    //                 type="radio"
    //                 aria-label="Rating 1 star"
    //                 name="rating-10"
    //                 className="mask mask-star-2 mask-half-2 bg-green-500"
    //               />
    //               <div className="w-1" />
    //               <input
    //                 type="radio"
    //                 aria-label="Rating 1 and half star"
    //                 name="rating-10"
    //                 className="mask mask-star-2 mask-half-1 bg-green-500"
    //                 checked
    //               />
    //               <input
    //                 type="radio"
    //                 aria-label="Rating 2 star"
    //                 name="rating-10"
    //                 className="mask mask-star-2 mask-half-2 bg-green-500"
    //               />
    //               <div className="w-1" />
    //               <input
    //                 type="radio"
    //                 aria-label="Rating 2 and half star"
    //                 name="rating-10"
    //                 className="mask mask-star-2 mask-half-1 bg-green-500"
    //               />
    //               <input
    //                 type="radio"
    //                 aria-label="Rating 3 star"
    //                 name="rating-10"
    //                 className="mask mask-star-2 mask-half-2 bg-green-500"
    //               />
    //               <div className="w-1" />
    //               <input
    //                 type="radio"
    //                 aria-label="Rating 3 and half star"
    //                 name="rating-10"
    //                 className="mask mask-star-2 mask-half-1 bg-green-500"
    //               />
    //               <input
    //                 type="radio"
    //                 aria-label="Rating 4 star"
    //                 name="rating-10"
    //                 className="mask mask-star-2 mask-half-2 bg-green-500"
    //               />
    //               <div className="w-1" />
    //               <input
    //                 type="radio"
    //                 aria-label="Rating 4 and half star"
    //                 name="rating-10"
    //                 className="mask mask-star-2 mask-half-1 bg-green-500"
    //               />
    //               <input
    //                 type="radio"
    //                 aria-label="Rating 5 star"
    //                 name="rating-10"
    //                 className="mask mask-star-2 mask-half-2 bg-green-500"
    //               />
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   Rating component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Styled radio buttons
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/rating"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-span-3 row-span-1 mx-2 grid w-72 flex-shrink-0 gap-4 xl:mx-0 xl:w-auto">
    //       <div className="bg-neutral text-neutral-content rounded-box flex items-center shadow-xl">
    //         <div className="dropdown dropdown-top">
    //           <div tabIndex={0}>
    //             <div className="breadcrumbs px-4 text-sm">
    //               <ul>
    //                 <li>
    //                   <a href="/">
    //                     <svg
    //                       width="20"
    //                       height="20"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       className="mr-2 h-4 w-4 stroke-current"
    //                     >
    //                       <path
    //                         stroke-linecap="round"
    //                         stroke-linejoin="round"
    //                         stroke-width="2"
    //                         d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    //                       />
    //                     </svg>
    //                     Documents
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="/">
    //                     <svg
    //                       width="20"
    //                       height="20"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       className="mr-2 h-4 w-4 stroke-current"
    //                     >
    //                       <path
    //                         stroke-linecap="round"
    //                         stroke-linejoin="round"
    //                         stroke-width="2"
    //                         d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    //                       />
    //                     </svg>
    //                     Add Document
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //           <div tabIndex={0} className="dropdown-content py-2">
    //             <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //               <div className="card-body">
    //                 <h2 className="card-title font-extrabold capitalize">
    //                   breadcrumbs component
    //                 </h2>
    //                 <p className="text-neutral-content text-sm text-opacity-80">
    //                   Make a better navigation with breadcrumbs!
    //                 </p>
    //                 <div className="mt-4 flex justify-end">
    //                   <a
    //                     href="/components/breadcrumbs"
    //                     className="btn btn-primary btn-sm xl:btn-md"
    //                   >
    //                     See component
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="bg-accent text-accent-content rounded-box flex items-center p-4 shadow-xl">
    //         <div className="flex-1 px-2">
    //           <h2 className="text-3xl font-extrabold">4,600</h2>
    //           <p className="text-sm text-opacity-80">Page views</p>
    //         </div>
    //         <div className="flex-0">
    //           <div className="dropdown dropdown-top dropdown-end">
    //             <div tabIndex={0}>
    //               <div className="flex space-x-1">
    //                 <button
    //                   aria-label="button component"
    //                   className="btn btn-ghost btn-square"
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     className="inline-block h-6 w-6 stroke-current"
    //                   >
    //                     <path
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                       stroke-width="2"
    //                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    //                     />
    //                     <path
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                       stroke-width="2"
    //                       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    //                     />
    //                   </svg>
    //                 </button>
    //                 <button
    //                   aria-label="button component"
    //                   className="btn btn-ghost btn-square"
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     className="inline-block h-6 w-6 stroke-current"
    //                   >
    //                     <path
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                       stroke-width="2"
    //                       d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
    //                     />
    //                   </svg>
    //                 </button>
    //               </div>
    //             </div>
    //             <div tabIndex={0} className="dropdown-content py-2">
    //               <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //                 <div className="card-body">
    //                   <h2 className="card-title font-extrabold capitalize">
    //                     button component
    //                   </h2>
    //                   <p className="text-neutral-content text-sm text-opacity-80">
    //                     Buttons come in various shapes, colors and sizes
    //                   </p>
    //                   <div className="mt-4 flex justify-end">
    //                     <a
    //                       href="/components/button"
    //                       className="btn btn-primary btn-sm xl:btn-md"
    //                     >
    //                       See component
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="card bg-base-100 col-span-3 row-span-1 mx-2 w-72 flex-shrink-0 overflow-visible shadow-lg xl:mx-0 xl:w-auto xl:place-self-stretch">
    //       <div className="card-body flex-row items-center space-x-4 px-4">
    //         <div className="flex-1">
    //           <h2 className="card-title mb-0 flex">
    //             <div className="dropdown dropdown-top">
    //               <div tabIndex={0}>
    //                 <button
    //                   aria-label="loading button"
    //                   className="btn btn-ghost loading btn-sm btn-circle"
    //                 />
    //               </div>
    //               <div tabIndex={0} className="dropdown-content py-2">
    //                 <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //                   <div className="card-body">
    //                     <h2 className="card-title font-extrabold capitalize">
    //                       loading button component
    //                     </h2>
    //                     <p className="text-neutral-content text-sm text-opacity-80">
    //                       Buttons can get loadings state using a simple class
    //                     </p>
    //                     <div className="mt-4 flex justify-end">
    //                       <a
    //                         href="/components/button"
    //                         className="btn btn-primary btn-sm xl:btn-md"
    //                       >
    //                         See component
    //                       </a>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             Downloading...
    //           </h2>
    //           <div className="dropdown dropdown-top w-full">
    //             <div tabIndex={0}>
    //               <progress
    //                 value="70"
    //                 max="100"
    //                 className="progress progress-secondary"
    //               />
    //             </div>
    //             <div tabIndex={0} className="dropdown-content py-2">
    //               <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //                 <div className="card-body">
    //                   <h2 className="card-title font-extrabold capitalize">
    //                     progress component
    //                   </h2>
    //                   <p className="text-neutral-content text-sm text-opacity-80">
    //                     Show progressbar, loadings or simple bar charts using
    //                     progress component
    //                   </p>
    //                   <div className="mt-4 flex justify-end">
    //                     <a
    //                       href="/components/progress"
    //                       className="btn btn-primary btn-sm xl:btn-md"
    //                     >
    //                       See component
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex-0">
    //           <div className="dropdown dropdown-top dropdown-end">
    //             <div tabIndex={0}>
    //               <button
    //                 aria-label="circle button component"
    //                 className="btn btn-circle"
    //               >
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   className="inline-block h-6 w-6 stroke-current"
    //                 >
    //                   <path
    //                     stroke-linecap="round"
    //                     stroke-linejoin="round"
    //                     stroke-width="2"
    //                     d="M6 18L18 6M6 6l12 12"
    //                   />
    //                 </svg>
    //               </button>
    //             </div>
    //             <div tabIndex={0} className="dropdown-content py-2">
    //               <div className="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl">
    //                 <div className="card-body">
    //                   <h2 className="card-title font-extrabold capitalize">
    //                     button component
    //                   </h2>
    //                   <p className="text-neutral-content text-sm text-opacity-80">
    //                     Buttons come in various shapes, colors and sizes
    //                   </p>
    //                   <div className="mt-4 flex justify-end">
    //                     <a
    //                       href="/components/button"
    //                       className="btn btn-primary btn-sm xl:btn-md"
    //                     >
    //                       See component
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Index;
