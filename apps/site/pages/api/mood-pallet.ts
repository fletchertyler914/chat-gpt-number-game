import { ChatOpenAI } from 'langchain/chat_models';
import { initializeAgentExecutor } from 'langchain/agents';
import { BufferMemory } from 'langchain/memory';
import { NextApiRequest, NextApiResponse } from 'next';

export interface MoodPalletResponse {
  moodPallet: MoodPallet;
  theme: { [key: string]: string };
}

export interface MoodPallet {
  [key: string]: {
    [key: string]: {
      value: string;
      reason: string;
    };
  };
}

export interface AgentExecutorRequest extends NextApiRequest {
  body: {
    colorKeys: string[];
    mood: string;
    verbose?: boolean;
  };
}
export default async function handler(
  req: AgentExecutorRequest,
  res: NextApiResponse
) {
  const { colorKeys, mood, verbose } = req.body;
  const model = new ChatOpenAI();
  const tools = [];

  const outputFormat = `
{
    [mood]: {
        "{colorKey}": {
            "value": "{hex-color}",
            "reason": "I chose this color for {color-key} because {reason}. "
        },
    },
}
  `;

  // prompts to convert a mood string into a detailed description of the mood, and then to convert that into a daisyUI theme.
  const inputs = [
    `Even though it may not make sense, translate the the following text into a a very detailed paragraph describing it as a mood: ${mood}.`,
    'What are the mood descriptors in the last output?',
    `Return a javascript object in the following format: ${outputFormat}. The object's mood key is ${mood}. The hex color values should be in the format '#000000'. There should be ${
      colorKeys.length
    } entries in the object, and the keys are ${colorKeys.join(',')}.`,
  ];

  const results = [];

  const executor = await initializeAgentExecutor(
    tools,
    model,
    'chat-conversational-react-description',
    verbose ?? false
  );

  executor.memory = new BufferMemory({
    returnMessages: true,
    memoryKey: 'chat_history',
    inputKey: 'input',
  });

  for (const input of inputs) results.push(await executor.call({ input }));

  const moodPallet: MoodPallet = results[results.length - 1].output;

  const theme = Object.entries(moodPallet[mood]).reduce(
    (acc, [colorKey, { value }]) => {
      if (colorKey && colorKeys.includes(colorKey)) acc[colorKey] = value;
      return acc;
    },
    {}
  );

  console.log('Got new theme ', { moodPallet, theme });

  res.status(200).send({ moodPallet, theme } as MoodPalletResponse);
}
