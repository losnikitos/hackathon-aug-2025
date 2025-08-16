import Link from 'next/link';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link 
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            >
              AI Shopping
            </Link>
            <Link 
              href="/chat"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Try Chat Mode
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Traditional Shop
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our catalog with a familiar e-commerce interface. 
              This is where the traditional shopping experience will be implemented.
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-emerald-200">
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Shop Interface Coming Soon
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                This will be where users can browse products, filter by categories, 
                search, and add items to their cart using a traditional e-commerce interface.
              </p>
              
              <div className="flex justify-center space-x-4 pt-4">
                <Link 
                  href="/"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
                >
                  Back to Home
                </Link>
                <Link 
                  href="/chat"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Try Chat Mode
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
