# Grocery Store Chatbot with Cart Integration

A Next.js application featuring an AI-powered chatbot that can help customers with grocery shopping and manage their shopping cart.

## Features

- **AI Chatbot**: Powered by OpenAI GPT-4o-mini with streaming responses
- **Shopping Cart Management**: Full cart functionality with add, remove, update, and view operations
- **Product Catalog**: 50+ grocery items with detailed information
- **Real-time Cart Updates**: Live cart state management with React Context
- **Tool Integration**: AI assistant can perform cart operations using client-side tools

## Chatbot Tools

The AI assistant can perform the following cart operations:

### 1. Add to Cart (`addToCart`)
- **Description**: Add a product to the shopping cart
- **Parameters**: 
  - `itemId` (number): The ID of the product to add
  - `quantity` (optional, number): Quantity to add (defaults to 1)

### 2. Remove from Cart (`removeFromCart`)
- **Description**: Remove a product from the shopping cart
- **Parameters**:
  - `itemId` (number): The ID of the product to remove

### 3. Update Cart Quantity (`updateCartQuantity`)
- **Description**: Update the quantity of a product in the cart
- **Parameters**:
  - `itemId` (number): The ID of the product to update
  - `quantity` (number): The new quantity (use 0 to remove the item)

### 4. Get Cart Info (`getCartInfo`)
- **Description**: Get detailed information about the current cart
- **Parameters**: None
- **Returns**: JSON with cart summary including items, quantities, unique items count, and total price

### 5. Show Products (`showProducts`)
- **Description**: Show product options without adding them to cart. Use when user asks about options, alternatives, or wants to browse products without committing to purchase.
- **Parameters**:
  - `category` (optional, string): Product category to show (e.g., "fruits", "dairy", "baking")
  - `searchTerm` (optional, string): Search term to filter products
  - `limit` (optional, number): Maximum number of products to show (defaults to 10)
- **Returns**: JSON with filtered products, total count, and search criteria

## Example Conversations

Users can interact with the chatbot using natural language:

- "Add 2 apples to my cart"
- "Show me what's in my cart"
- "Remove the eggs from my cart"
- "Change the quantity of flour to 3"
- "What's the total price of my cart?"
- "I want to buy some bread and milk"
- "Show me some fruit options"
- "What dairy products do you have?"
- "I'm looking for baking ingredients"
- "Show me alternatives to white sugar"

## Technical Implementation

### AI SDK Integration
- Uses `@ai-sdk/react` for client-side chat functionality
- Implements `useChat` hook with `onToolCall` for tool execution
- Automatic tool result submission with `lastAssistantMessageIsCompleteWithToolCalls`

### Type Safety
- Shared TypeScript types between client and server (`app/types/tools.ts`)
- Zod schemas for runtime validation of tool inputs
- Proper typing for all tool call parameters and responses
- Type-safe cart operations with inferred types

### Cart Context
- React Context for global cart state management
- Persistent cart state across chat sessions
- Real-time updates and calculations

### Tool Execution Flow
1. User sends message to chatbot
2. AI model generates tool calls based on user intent
3. Client-side tools execute using CartContext methods with type-safe inputs
4. Tool results are added to the chat conversation
5. AI continues conversation with updated cart information

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── api/chat/route.ts          # AI chat API with tool definitions
├── components/
│   ├── Chat.tsx              # Main chat component with tool handling
│   ├── ChatMessage.tsx       # Message rendering with tool part support
│   └── ...                   # Other UI components
├── contexts/
│   └── CartContext.tsx       # Cart state management
├── types/
│   └── tools.ts              # Shared tool types and schemas
└── data/
    └── catalog.json          # Product catalog data
```

## Technologies Used

- **Next.js 15** - React framework
- **AI SDK** - OpenAI integration and tool calling
- **React Context** - State management
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zod** - Schema validation for tool inputs
