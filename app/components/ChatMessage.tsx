import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Components } from 'react-markdown';
import { CartToolName, CartOperationResult, ShowProductsResult } from '../types/tools';
import { UIMessage } from 'ai';
import CartOperationResultComponent from './CartOperationResult';
import CartInfoDisplay from './CartInfoDisplay';
import ProductOptionsDisplay from './ProductOptionsDisplay';

interface ChatMessageProps {
  message: UIMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  const renderPart = (part: UIMessage['parts'][0], index: number) => {
    switch (part.type) {
      case 'text':
        return (
          <div key={index} className="text-sm prose prose-sm max-w-none">
            {isUser ? (
              <p className="whitespace-pre-wrap">{part.text}</p>
            ) : (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {part.text}
              </ReactMarkdown>
            )}
          </div>
        );
      
      case 'tool-addToCart':
      case 'tool-removeFromCart':
      case 'tool-updateCartQuantity':
      case 'tool-getCartInfo':
      case 'tool-showProducts': {
        const toolName = part.type.replace('tool-', '') as CartToolName;
        const callId = part.toolCallId;
        
        switch (part.state) {
          case 'input-streaming':
            return (
              <div key={index} className="text-sm text-gray-500 dark:text-gray-400 italic">
                Processing {toolName}...
              </div>
            );
          
          case 'input-available':
            return (
              <div key={index} className="text-sm text-gray-500 dark:text-gray-400 italic">
                Executing {toolName}...
              </div>
            );
          
          case 'output-available':
            return (
              <div key={index}>
                {toolName === 'getCartInfo' ? (
                  <CartInfoDisplay />
                ) : toolName === 'showProducts' ? (
                  <ProductOptionsDisplay result={part.output as ShowProductsResult} />
                ) : (
                  <CartOperationResultComponent 
                    result={part.output as CartOperationResult}
                  />
                )}
              </div>
            );
          
          case 'output-error':
            return (
              <div key={index} className="text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2">
                <div className="font-medium text-red-800 dark:text-red-200">Error:</div>
                <div className="text-red-700 dark:text-red-300 mt-1">{String(part.errorText)}</div>
              </div>
            );
          
          default:
            return null;
        }
      }
      
      default:
        return null;
    }
  };
  
  const markdownComponents: Components = {
    // Customize code blocks
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !match;
      
      return (
        <code
          className={`${className} ${
            isInline 
              ? 'bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm' 
              : 'block bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm overflow-x-auto'
          }`}
          {...props}
        >
          {children}
        </code>
      );
    },
    // Customize links
    a({ children, href, ...props }) {
      return (
        <a
          href={href}
          className={`text-blue-600 dark:text-blue-400 hover:underline ${
            isUser ? 'text-blue-200' : ''
          }`}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    },
    // Customize lists
    ul({ children, ...props }) {
      return (
        <ul className="list-disc list-inside space-y-1" {...props}>
          {children}
        </ul>
      );
    },
    ol({ children, ...props }) {
      return (
        <ol className="list-decimal list-inside space-y-1" {...props}>
          {children}
        </ol>
      );
    },
    // Customize blockquotes
    blockquote({ children, ...props }) {
      return (
        <blockquote 
          className={`border-l-4 pl-4 italic ${
            isUser 
              ? 'border-blue-300 text-blue-100' 
              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
          }`}
          {...props}
        >
          {children}
        </blockquote>
      );
    },
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
        }`}
      >
        <div className="space-y-2">
          {message.parts.map((part, index) => renderPart(part, index))}
        </div>
      </div>
    </div>
  );
}
