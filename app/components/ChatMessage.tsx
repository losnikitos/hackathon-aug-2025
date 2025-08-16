import { ChatMessage as ChatMessageType } from '../types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Components } from 'react-markdown';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
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
        <div className="text-sm prose prose-sm max-w-none">
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <p className={`text-xs mt-2 ${
          isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
