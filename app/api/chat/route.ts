import { NextRequest, NextResponse } from 'next/server';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { openai } from '@ai-sdk/openai';
import catalogData from '../../data/catalog.json';

function getSystemPrompt() {
  return `You are a helpful AI assistant for an online grocery store. You have access to the following product catalog:

  ${JSON.stringify(catalogData, null, 2)}
  
  You can help customers with:
  - Product information and descriptions
  - Pricing information
  - Product availability
  - Recommendations based on their needs
  - Answering questions about specific products
  
  When asked about prices, always provide the price in EUR. When asked about products, provide relevant details like weight/count, description, and price. Be helpful and friendly in your responses.`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: getSystemPrompt(),
      messages: convertToModelMessages(messages),
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
    
  } catch (error) {
    console.error('AI SDK error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
