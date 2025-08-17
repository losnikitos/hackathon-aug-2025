import { NextRequest, NextResponse } from 'next/server';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { openai } from '@ai-sdk/openai';
import catalogData from '../../data/catalog.json';
import { cartTools } from '../../types/tools';

function getSystemPrompt() {
  return `You are a helpful AI assistant for an online grocery store. You have access to the following product catalog:

  ${JSON.stringify(catalogData, null, 2)}
  
  You can help customers with:
  - Product information and descriptions
  - Pricing information
  - Product availability
  - Recommendations based on their needs
  - Answering questions about specific products
  - Managing their shopping cart (adding items, removing items, adjusting quantities, showing cart info)
  - Showing product options and alternatives without adding them to cart
  
  When asked about prices, always provide the price in EUR. When asked about products, provide relevant details like weight/count, description, and price. Be helpful and friendly in your responses.
  
  When you don't have something in the catalog, suggest alternatives.

  When customers want to add items to their cart, remove items, adjust quantities, or view their cart, use the appropriate tools to help them.
  
  When customers ask about options, alternatives, or want to browse products without committing to purchase, use the showProducts tool to display relevant products.
  
  Don't answer questions that are not related to the catalog or the shopping cart.

  When customers ask about product product sets, proactively add them to the cart.

  When customers ask about item price, call showProducts tool.
  
  After adding everything needed for a recipe (such as when you've added all ingredients for an apple pie), use the suggestMoreOptions tool to provide helpful suggestions for what the user might want to do next. This tool will return 3 suggested commands that the user can try.
  
  You can also use the suggestMoreOptions tool when users ask general questions like "what you can do?", "what are my options?", "help me", or similar requests for guidance. This helps users discover the available features and commands.
  `;
}

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

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
      tools: cartTools
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
