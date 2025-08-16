import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import catalogData from '../../data/catalog.json';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const result = await generateText({
      model: 'gpt-4o-mini',
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
          content: message
        }
      ],
      temperature: 0.7,
    });

    const response = await result.text;
    
    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('AI SDK error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
