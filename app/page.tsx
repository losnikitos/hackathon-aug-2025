import Link from 'next/link';
import { ArrowRight, MessageCircle, ShoppingCart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background wavy shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Top-left light blue wavy shape */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full opacity-80 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-400 rounded-full opacity-60 blur-3xl transform -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute top-40 left-40 w-64 h-64 bg-blue-500 rounded-full opacity-40 blur-3xl transform -translate-x-1/4 -translate-y-1/4"></div>
        
        {/* Bottom darker blue wavy shape */}
        <div className="absolute bottom-0 right-0 w-full h-96 bg-blue-200 opacity-80 blur-3xl transform translate-x-1/4 translate-y-1/4 rounded-tl-full"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 opacity-60 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400 opacity-50 blur-3xl rounded-full"></div>
        
        {/* Additional depth layers */}
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-200 opacity-70 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-300 opacity-60 blur-3xl rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-start p-8">
          {/* Logo and slogan */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img src="/logo.svg" alt="shop&cook" className="h-20 w-auto" />
            </div>
            <div className="ml-6">
              <p className="text-sm leading-relaxed">
                Your new way to shop is here ❤️
              </p>
              <p className="text-sm leading-relaxed">
                Be the first to try it and help us turn this early version into something great.
              </p>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Orange figure and call to action */}
            <div className="relative">
              {/* Cook figure */}
              <div className="relative">
                <img 
                  src="/cook-2.png" 
                  alt="Chef cooking" 
                  className="w-64 h-auto object-contain"
                />
              </div>
            </div>

            {/* Right side - Shopping options */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-light text-gray-900">Choose Your Shopping Experience</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Discover products your way - browse traditionally or chat with AI
                </p>
              </div>
              
              {/* Shopping options */}
              <div className="space-y-6">
                {/* Traditional Shop Button */}
                <Link 
                  href="/shop"
                  className="block w-full bg-white hover:border-blue-300 rounded-2xl p-6 transition-all duration-300 shadow-lg group relative overflow-hidden"
                >
                  {/* Blue shine animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-shine-blue"></div>
                  <div className="flex items-center space-x-4 relative z-10">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-gray-700">Traditional Shop</h3>
                      <p className="text-gray-400 text-sm">Browse our catalog with familiar e-commerce interface</p>
                    </div>
                    <div className="text-blue-500 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>

                {/* AI Chat Button */}
                <Link 
                  href="/chat"
                  className="block w-full bg-white hover:border-orange-300 rounded-2xl p-6 transition-all duration-300 shadow-lg group relative overflow-hidden"
                >
                  <div className="flex items-center space-x-4 relative z-10">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <MessageCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-gray-700">AI Chat Assistant</h3>
                      <p className="text-gray-400 text-sm">Chat with AI to discover products and get recommendations</p>
                    </div>
                    <div className="text-orange-500 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Shopping basket illustration */}
        <div className="absolute bottom-8 right-8 w-40 h-40">
          <img 
            src="/basket.png" 
            alt="Shopping basket with fruits" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Footer */}
        <footer className="absolute bottom-4 left-8">
          <p className="text-gray-400 text-xs">© All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}
