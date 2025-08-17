import { SuggestMoreOptionsResult } from '../types/tools';

interface SuggestionsDisplayProps {
  result: SuggestMoreOptionsResult;
  onSuggestionClick?: (suggestion: string) => void;
}

export default function SuggestionsDisplay({ result, onSuggestionClick }: SuggestionsDisplayProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
        {result.message}
      </div>
      {result.suggestions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {result.suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick?.(suggestion)}
              className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-sm text-blue-700 dark:text-blue-300">
          {result.message}
        </div>
      )}
    </div>
  );
}
