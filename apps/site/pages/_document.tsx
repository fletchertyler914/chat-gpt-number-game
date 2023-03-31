import { useTheme } from '@chat-gpt-number-game/context';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const { dataTheme } = useTheme();
  return (
    <Html data-theme={dataTheme}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
