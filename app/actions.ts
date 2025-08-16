'use server';

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from '@ai-sdk/rsc';
import catalogData from './data/catalog.json';

export async function generateStream(input: string) {
  const stream = createStreamableValue('');

  (async () => {
    const { textStream } = streamText({
      model: openai('gpt-4o-mini'),
      system: `You are a helpful AI assistant for an online grocery store. You have access to the following product catalog:

${JSON.stringify(catalogData, null, 2)}

You can help customers with:
- Product information and descriptions
- Pricing information
- Product availability
- Recommendations based on their needs
- Answering questions about specific products

When asked about prices, always provide the price in EUR. When asked about products, provide relevant details like weight/count, description, and price. Be helpful and friendly in your responses.`,
      messages: [
        {
          role: 'user',
          content: input
        }
      ],
      temperature: 0.7,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
