'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    process.env.GEMINI_API_KEY ? googleAI() : null,
  ].filter(Boolean) as any,
  model: 'googleai/gemini-2.5-flash',
});
