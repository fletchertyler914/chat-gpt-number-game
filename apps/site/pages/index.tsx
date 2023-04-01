import { useCallback, useEffect, useState } from 'react';
import { MoodPalletResponse } from './api/mood-pallet';

import { useRef } from 'react';

import { Preview, ThemeColor, ThemeSwitcher } from '@chat-gpt-number-game/ui';
import { useTheme } from '@chat-gpt-number-game/context';
import {
  generateThemeFromColors,
  mapThemeColors,
  requestMoodPallet,
} from '@chat-gpt-number-game/utils';
import { EventSourceMessage } from '@chat-gpt-number-game/modals';

export const Index = () => {
  const [mood, setMood] = useState('');
  const [moodPallet, setMoodPallet] = useState<
    MoodPalletResponse | undefined
  >();
  const [loading, setLoading] = useState(false);

  const [serverMessages, setServerMessages] = useState<EventSourceMessage[]>(
    []
  );

  const { setDataTheme } = useTheme();

  const wrapper = useRef(null);

  const _generateThemeFromColors = useCallback(
    (themeColors: ThemeColor[]) => {
      if (themeColors.length === 0 || !wrapper) return;

      const { dataTheme, dataThemeKey } = generateThemeFromColors(
        mood,
        themeColors,
        moodPallet.colorScheme
      );

      // append the new theme stylesheet to the document
      const styleSheet = document.createElement('style');
      styleSheet.innerText = dataTheme;
      document.head.appendChild(styleSheet);

      // set the new theme
      setDataTheme(dataThemeKey);
      // setDataThemes((prev) => [...prev, dataThemeKey]);

      // TODO: save this theme to the user's account
      // dataTheme

      setLoading(false);
    },
    [mood, moodPallet?.colorScheme, setDataTheme]
  );

  useEffect(() => {
    if (moodPallet && wrapper) {
      const themeColors = mapThemeColors(moodPallet.theme);
      if (themeColors.length > 0) {
        console.log('gen theme colors from mood pallet', themeColors);
        _generateThemeFromColors(themeColors);
      }
    }
  }, [_generateThemeFromColors, moodPallet]);

  const submitPrompt = useCallback(async () => {
    setLoading(true);

    const onOpen = async (response: Response) => {
      if (response.ok && response.status === 200) {
        console.log('Connection made ', response);
      } else if (
        response.status >= 400 &&
        response.status < 500 &&
        response.status !== 429
      ) {
        console.log('Client side error ', response);
      }
    };

    const onclose = () => {
      console.log('Connection closed by the server');
    };

    const onmessage = async (event) => {
      const eventData: EventSourceMessage = JSON.parse(event.data);
      console.log('Message Recieved:', eventData);
      if (eventData.lastMessage) {
        const _moodPallet: MoodPalletResponse = JSON.parse(eventData.message);
        setMoodPallet(_moodPallet);
        setLoading(false);
      } else {
        setServerMessages((prev) => [...prev, eventData]);
      }
    };

    const onerror = (err) => {
      console.log('There was an error from server', err);
    };

    requestMoodPallet(mood, true, onOpen, onclose, onmessage, onerror);
  }, [mood]);

  return (
    <div ref={wrapper} className="max-w-5xl mx-auto my-0">
      <div className="flex flex-col items-center justify-center py-2">
        <h2 className="px-2 py-4 text-xl font-medium">mood(pallet)</h2>
      </div>

      <div className="bg-transparent">
        <hr className="mb-8" />
        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <h2 className="px-2 pb-2 text-md md:text-xl font-bold text-center">
              Generating mood...
            </h2>
            <progress className="progress w-56 mt-4"></progress>
          </div>
        ) : (
          <>
            <h2 className="px-2 pb-2 text-md md:text-xl font-bold text-center">
              {moodPallet
                ? `Your mood pallet has been generated:`
                : 'Type a mood to get started.'}
            </h2>
            <h3 className="px-2 pb-4 text-sm md:text-lg font-bold text-center">
              {moodPallet
                ? `"${mood}"`
                : 'We will magically convert the mood into a color pallet.'}
            </h3>
            {moodPallet && (
              <>
                <p className="py-4 text-center">Wanna try again?</p>
                <p className="text-center">⬇️</p>
              </>
            )}

            <div className="w-full flex flex-col md:flex-row items-center justify-center px-2 py-4">
              <input
                type="text"
                placeholder="Type here"
                className="input input-primary input-md md:input-lg	input-bordered w-full max-w-sm"
                onChange={(event) => {
                  if (event.target.value && !moodPallet) {
                    setMood(event.target.value);
                  } else {
                    // clear the mood
                    setMood('light');
                    setMoodPallet(undefined);
                  }
                }}
                onKeyDown={(evt) => {
                  if (evt.key === 'Enter' && !moodPallet) {
                    submitPrompt();
                  }
                }}
              />

              <button
                className="btn btn-outline btn-info glass mt-4 md:mt-0 md:ml-4"
                onClick={submitPrompt}
              >
                Submit
              </button>
            </div>

            <div className="w-full flex flex-col items-center justify-between px-2 py-4">
              <h2 className="px-2 pb-4 text-md md:text-xl font-bold text-center">
                Not feeling creative? <br className="block sm:hidden" />
                Try one of these:
              </h2>
              <ThemeSwitcher />
            </div>
          </>
        )}

        {!loading ? (
          <div className="glass">
            <hr className="my-8" />
            <Preview />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h2 className="px-2 pt-2 pb-8 text-md text-center">
              AI is generating your mood pallet...
            </h2>

            <div>
              {serverMessages.map((message, index) => (
                <div
                  key={index}
                  className="px-2 pb-2 text-sm text-center flex flex-col justify-center items-center"
                >
                  <h3 className="py-4 text-md">Thought:</h3>
                  <span className="text-sm text-gray-500">
                    {message.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
