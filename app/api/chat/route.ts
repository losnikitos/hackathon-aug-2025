import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // Sample responses for now - will be replaced with AI SDK later
    const responses = [
      "That's an interesting question! I'd be happy to help you with that.",
      "I understand what you're asking. Let me think about this...",
      "Great question! Here's what I can tell you about that topic.",
      "I'm processing your request. This is a sample response for now.",
      "Thanks for your message! I'm here to help with any questions you have."
    ];
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return a random response
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return NextResponse.json({ 
      response: randomResponse,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
