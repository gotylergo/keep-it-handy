'use server';
/**
 * @fileOverview A flow to search Google Keep notes using AI to surface the most relevant notes.
 *
 * - searchKeepNotesWithAI - A function that searches Keep notes using AI.
 * - SearchKeepNotesWithAIInput - The input type for the searchKeepNotesWithAI function.
 * - SearchKeepNotesWithAIOutput - The return type for the searchKeepNotesWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchKeepNotesWithAIInputSchema = z.object({
  query: z.string().describe('The search query.'),
  notes: z.array(z.string()).describe('The list of Google Keep notes to search through.'),
});
export type SearchKeepNotesWithAIInput = z.infer<typeof SearchKeepNotesWithAIInputSchema>;

const SearchKeepNotesWithAIOutputSchema = z.array(z.string()).describe('The list of relevant Google Keep notes.');
export type SearchKeepNotesWithAIOutput = z.infer<typeof SearchKeepNotesWithAIOutputSchema>;

export async function searchKeepNotesWithAI(input: SearchKeepNotesWithAIInput): Promise<SearchKeepNotesWithAIOutput> {
  return searchKeepNotesWithAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchKeepNotesWithAIPrompt',
  input: {schema: SearchKeepNotesWithAIInputSchema},
  output: {schema: SearchKeepNotesWithAIOutputSchema},
  prompt: `You are an AI assistant helping a user search their Google Keep notes.

The user has provided the following search query:
{{query}}

You have access to the following notes:
{{#each notes}}
- {{{this}}}
{{/each}}

Based on the search query, identify the notes that are most relevant to the query. Return only the relevant notes in a JSON array.
If none of the notes are relevant, return an empty array.
`,
});

const searchKeepNotesWithAIFlow = ai.defineFlow(
  {
    name: 'searchKeepNotesWithAIFlow',
    inputSchema: SearchKeepNotesWithAIInputSchema,
    outputSchema: SearchKeepNotesWithAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
