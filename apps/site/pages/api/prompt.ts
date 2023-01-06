import { NextApiRequest, NextApiResponse } from 'next';

import { Configuration, OpenAIApi } from 'openai';
import { DEFAULT_PROMPT } from '@chat-gpt-number-game/utils';

export type PromptRequestProps = {
  messages: { [key: string]: any }[];
  prompt: any;
  init?: boolean;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Supported');
  }
  const {
    messages = [],
    prompt,
    init = false,
  } = req.body as PromptRequestProps;
  const isUser = (Object.keys(prompt)[0] as string) === 'User';

  if (isUser) {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(config);

    const _messages = init ? [prompt] : [...messages, prompt];

    const _prompt = DEFAULT_PROMPT.concat(
      `\n\n${_messages.map((message) => JSON.stringify(message)).join('\n\n')}`
    );

    console.log('Prompt: ', messages, messages.join('\n\n'), _prompt);

    try {
      await openai
        .createCompletion({
          model: 'text-davinci-003',
          prompt: _prompt,
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: ['User: ', '}  { "User"', '{ "User"'],
        })
        .then(
          (_res) => {
            const stripped = _res.data.choices;
            const message = JSON.parse(stripped[0].text);
            res.status(200).send(_messages.concat(message));
          },
          (err) => res.status(500).send(err)
        );
    } catch (err) {
      console.error('Err calling completion: ', err, _prompt);
      res.status(500).send({ ...err, _prompt });
    }
  } else {
    res.status(500).send(
      JSON.stringify({
        message: 'You must be an alien. Please use the website :) ',
      })
    );
  }
}

export default handler;
