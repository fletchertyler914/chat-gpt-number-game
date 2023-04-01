import { NextApiRequest } from 'next';

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

export interface EventSourceMessage {
  message: string;
  id: number;
  lastMessage: boolean;
}
