import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Welcome to Chat Assistant
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your intelligent conversation partner. Ask questions, get help, or just chat about anything you&apos;d like.
          </p>
        </div>
        
        <Link 
          href="/chat"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Start Chatting →
        </Link>
        
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by AI • Secure • Fast</p>
        </div>
      </div>
    </div>
  );
}
