import { ChatOpenAI } from 'langchain/chat_models';
import { initializeAgentExecutor } from 'langchain/agents';
import { BufferMemory } from 'langchain/memory';
import { NextApiRequest, NextApiResponse } from 'next';
import { SerpAPI } from 'langchain/tools';

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

export default async function handler(
  req: AgentExecutorRequest,
  res: NextApiResponse
) {
  const { colorKeys, mood, verbose } = req.body;
  const model = new ChatOpenAI({
    temperature: 0.33,
  });
  const tools = [new SerpAPI()];

  const outputFormat = `
{
  "{colorKey}": {
      "value": "{hex-color}",
      "reason": "I chose this color for {colorKey} because {reason}. "
  },
  "colorSchema": {
      "value": 'light' | 'dark',
      "reason": "I chose this color schema because {reason}. "
  }
}
`;

  const inputs = [
    `You have access to the following tools: 
    ${tools.map(
      (t, i) => `${i}. ${t.name}\n`
    )}.\n\nEven though it may not make sense to you, your job is to convert the mood string "${mood}" into a a very detailed paragraph, describing it as a environment that invokes that mood, as best as you can. If you get confused, dont worry, you don't need to apologize. Always focus on generating a color pallet based on the mood.\n You may use any tool or resource you feel is necessary to parse each word and phrase into a corresponding mood.\nAfter you have a detailed paragraph describing the mood, you will then select the emotional keywords out.`,
    'Using an emotion wheel, map each of the emotional keywords to a corresponding hex color. The hex color values should be in the format "#000000", and should match the mood and depth of the keyword to a color.',
    `Using those colors to inspire a selection of hex codes, return a javascript object in the following format: ${outputFormat}. There should be ${
      colorKeys.length
    } entries in the object, and the keys are: ${colorKeys.join(
      ','
    )}. At the end of the colorKey's, add a property named 'colorSchema' with a value of 'light' or 'dark', along with the reason for picking the value.  If the colors or mood are more dark, use 'dark', otherwise, use 'light'. Be sure all of the hex colors are accessible, have good contrast, and are appropriate for web use. The response must always be a valid JSON object in the format: ${outputFormat}. The response should not be a string.`,
  ];

  const results = [];

  const executor = await initializeAgentExecutor(
    tools,
    model,
    // 'chat-zero-shot-react-description',
    'chat-conversational-react-description',
    true
  );

  executor.memory = new BufferMemory({
    returnMessages: true,
    memoryKey: 'chat_history',
  });

  for (const input of inputs) {
    const result = await executor.call({ input });
    if (verbose) console.log(result);
    results.push(result);
  }

  // res.status(200).send(results);
  const moodPallet: MoodPallet = results[results.length - 1].output;

  const theme = Object.entries(moodPallet).reduce(
    (acc, [colorKey, { value }]) => {
      if (colorKey && colorKeys.includes(colorKey)) acc[colorKey] = value;
      return acc;
    },
    {}
  );

  const response: MoodPalletResponse = {
    moodPallet: {
      [mood]: moodPallet,
    },
    theme,
    colorScheme: moodPallet.colorSchema.value,
  };

  console.log('Got new theme ', moodPallet, theme, mood);

  res.status(200).send(response);
}
