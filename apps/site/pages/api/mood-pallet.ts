import { ChatOpenAI } from 'langchain/chat_models';
import { initializeAgentExecutor } from 'langchain/agents';
import { BufferMemory } from 'langchain/memory';
import { NextApiRequest, NextApiResponse } from 'next';
import { SerpAPI } from 'langchain/tools';
import { sanitizeString } from '@chat-gpt-number-game/utils';
import { EventSourceMessage } from '@chat-gpt-number-game/modals';

export interface MoodPalletResponse {
  moodPallet: { [key: string]: MoodPallet };
  theme: { [key: string]: string };
  colorScheme?: string;
}

export interface MoodPallet {
  [key: string]: {
    value: string;
    reason: string;
  };
}

export interface AgentExecutorRequestBody {
  colorKeys: string[];
  mood: string;
  verbose?: boolean;
}

export interface AgentExecutorRequest extends NextApiRequest {
  body: AgentExecutorRequestBody;
}

const emitSSE = (res, id, data) => {
  res.write('id: ' + id + '\n');
  res.write('data: ' + data + '\n\n');
  res.flush();
};

// export default async function handleSSE(req, res) {
//   res.writeHead(200, {
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     Connection: 'keep-alive',
//   });
//   const id = new Date().toLocaleTimeString();
//   // Sends a SSE every 3 seconds on a single connection.
//   setInterval(function () {
//     emitSSE(res, id, new Date().toLocaleTimeString());
//   }, 3000);

//   emitSSE(res, id, new Date().toLocaleTimeString());
// }

export default async function handler(
  req: AgentExecutorRequest,
  res: NextApiResponse
) {
  // method not allowed
  if (req.method === 'GET') {
    return res.status(405).end();
  }

  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  const { colorKeys, mood, verbose } = req.body;
  const model = new ChatOpenAI({
    temperature: 0.33,
  });
  const tools = [
    // new SerpAPI()
  ];

  const outputFormat = `
{
  "{colorKey}": {
      "value": "{hex-color}",
      "reason": "I chose this color for {colorKey} because {reason}. "
  },
  "colorScheme": {
      "value": 'light' | 'dark',
      "reason": "I chose this color schema because {reason}. "
  }
}
`;

  const inputs = [
    // `You have access to the following tools:
    // ${tools.map(
    //   (t, i) => `${i}. ${t.name}\n`
    // )}.\n\n
    // You may use any tool or resource you feel is necessary to parse each word and phrase into a corresponding mood.\n
    `
    Even though it may not make sense to you, your job is to convert the mood string "${mood}" into a a very detailed paragraph, describing it as a environment that invokes that mood, as best as you can. If you get confused, dont worry, you don't need to apologize. Always focus on generating a color pallet based on the mood.\nAfter you have a detailed paragraph describing the mood, you will then select the emotional keywords out. Format the response as markdown.`,
    'Using an emotion wheel, map each of the emotional keywords to a corresponding hex color. The hex color values should be in the format "#000000", and should match the mood and depth of the keyword to a color. Format the response as markdown.',
    `Using those colors to inspire a selection of hex codes, return a javascript object in the following format: ${outputFormat}. There should be ${
      colorKeys.length
    } entries in the object, and the keys are: ${colorKeys.join(
      ','
    )}. At the end of the colorKey's, add a property named 'colorScheme' with a value of 'light' or 'dark', along with the reason for picking the value.  If the colors or mood are more dark, use 'dark', otherwise, use 'light'. Be sure all of the hex colors are accessible, have good contrast, and are appropriate for web use. The response must always be a valid JSON object in the format: ${outputFormat}. The response should not be a string.`,
  ];

  // const results = [];

  const executor = await initializeAgentExecutor(
    tools,
    model,
    'chat-conversational-react-description',
    true
  );

  executor.memory = new BufferMemory({
    returnMessages: true,
    memoryKey: 'chat_history',
  });

  try {
    let index = 0;
    for (const input of inputs) {
      index++;
      const lastMessage = inputs[index] === inputs[inputs.length];
      const result = await executor.call({ input });

      if (lastMessage) {
        console.log('last input: ', lastMessage, result);
        const moodPallet: MoodPallet = result.output;

        console.log('mood pallet: ', moodPallet, result);

        const theme = Object.entries(moodPallet).reduce(
          (acc, [colorKey, { value }]) => {
            if (colorKey && colorKeys.includes(colorKey)) acc[colorKey] = value;
            return acc;
          },
          {}
        );

        const message = JSON.stringify({
          moodPallet: {
            [sanitizeString(mood.toLowerCase())]: moodPallet,
          },
          theme,
          colorScheme: moodPallet.colorScheme.value,
        } as MoodPalletResponse);
        emitSSE(
          res,
          index,
          JSON.stringify({
            message,
            lastMessage,
            id: index,
          } as EventSourceMessage)
        );
        res.end();
      } else {
        emitSSE(
          res,
          index,
          JSON.stringify({
            message: result.output,
            id: index,
            lastMessage: false,
          } as EventSourceMessage)
        );
      }
      // });
    }
  } catch (e) {
    console.log('error: ', e);
    res.write('data: ' + e + '\n\n');
    res.status(500).end();
  }

  // res.status(200).send(results);
  // const moodPallet: MoodPallet = results[results.length - 1].output;

  // const theme = Object.entries(moodPallet).reduce(
  //   (acc, [colorKey, { value }]) => {
  //     if (colorKey && colorKeys.includes(colorKey)) acc[colorKey] = value;
  //     return acc;
  //   },
  //   {}
  // );

  // const response: MoodPalletResponse = {
  //   moodPallet: {
  //     [sanitizeString(mood.toLowerCase())]: moodPallet,
  //   },
  //   theme,
  //   colorScheme: moodPallet.colorSchema.value,
  // };

  // console.log('Got new theme ', moodPallet, theme, mood);

  // // res.status(200).send(response);

  // res.end(JSON.stringify(response));
}
