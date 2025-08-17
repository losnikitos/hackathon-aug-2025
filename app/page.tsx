import Link from 'next/link';
import { ArrowRight, MessageCircle, ShoppingCart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-teal-500 to-lime-300 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Logo */}
        <div className="p-8 -mb-20">
          <img src="/logo.svg" alt="shop&cook" className="h-30 w-30 flex-shrink-0" />
        </div>

        {/* Main content area with blue blob */}
        <main className="flex-1 flex items-center justify-center px-8 relative">
          {/* Decorative images around the blob */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Top left - Apple */}
            <div className="absolute top-15 left-10 w-24 h-24 md:w-48 md:h-48 transform -rotate-12">
              <img src="/decor/apple.png" alt="Apple" className="w-full h-full object-contain" />
            </div>
            
            {/* Top right - Grape */}
            <div className="absolute top-8 right-16 w-32 h-32 md:w-64 md:h-64 transform rotate-6">
              <img src="/decor/grape.png" alt="Grape" className="w-full h-full object-contain" />
            </div>
            
            {/* Bottom left - Avocado */}
            <div className="absolute bottom-12 left-8 w-28 h-28 md:w-56 md:h-56 transform -rotate-8">
              <img src="/decor/avocado.png" alt="Avocado" className="w-full h-full object-contain" />
            </div>
            
            {/* Bottom right - Broccoli */}
            <div className="absolute bottom-8 right-12 w-30 h-30 md:w-60 md:h-60 transform rotate-12">
              <img src="/decor/brocoli.png" alt="Broccoli" className="w-full h-full object-contain" />
            </div>
            
            {/* Left middle - Carrot */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-15 w-20 h-20 md:w-40 md:h-40">
              <img src="/decor/carrot.png" alt="Carrot" className="w-full h-full object-contain" />
            </div>
            
            {/* Right middle - Lemon */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 rotate-15 w-18 h-18 md:w-36 md:h-36">
              <img src="/decor/lemon.png" alt="Lemon" className="w-full h-full object-contain" />
            </div>
            
            {/* Top middle - Pear */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -rotate-6 w-26 h-26 md:w-52 md:h-52">
              <img src="/decor/pear.png" alt="Pear" className="w-full h-full object-contain" />
            </div>
            
            {/* Bottom middle - Plum */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rotate-8 w-24 h-24 md:w-48 md:h-48">
              <img src="/decor/plum.png" alt="Plum" className="w-full h-full object-contain" />
            </div>
            
            {/* Additional smaller items */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 md:w-32 md:h-32 transform rotate-45">
              <img src="/decor/milkbottle.png" alt="Milk bottle" className="w-full h-full object-contain" />
            </div>
            
            <div className="absolute top-1/4 right-1/4 w-14 h-14 md:w-28 md:h-28 transform -rotate-30">
              <img src="/decor/bottle.png" alt="Bottle" className="w-full h-full object-contain" />
            </div>
            
            <div className="absolute bottom-1/4 left-1/3 w-12 h-12 md:w-24 md:h-24 transform rotate-20">
              <img src="/decor/bottle water.png" alt="Water bottle" className="w-full h-full object-contain" />
            </div>
            
            <div className="absolute bottom-1/4 right-1/3 w-16 h-16 md:w-32 md:h-32 transform -rotate-25">
              <img src="/decor/cold drink.png" alt="Cold drink" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Blue blob SVG background */}
          <div className="absolute inset-0 flex items-center justify-center -rotate-20">
            <svg width="1203" height="862" viewBox="0 0 1203 862" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-4xl h-auto opacity-90">
              <path d="M1202.44 396.851C1202.44 469.658 1191.13 532.557 1168.52 587.646C1145.98 642.704 1116.55 689.935 1080.25 728.791C1043.9 767.582 1002.01 798.338 954.424 819.638C906.838 840.89 858.122 853.347 808.261 856.026C665.454 863.723 522.309 863.448 379.519 855.17C261.756 848.296 169.214 804.567 101.7 735.778C34.1373 666.44 0.541527 576.69 0.525391 461.751C0.525391 388.992 11.8047 326.383 34.3955 271.956C57.0025 217.657 86.4512 170.959 122.726 132.49C159.048 94.0528 200.954 63.4907 248.557 42.1907C296.11 20.9554 344.487 8.53038 393.606 5.86789C536.412 -1.87754 679.574 -1.63547 822.364 6.59405C941.547 13.5327 1034.59 57.1975 1101.8 125.567C1168.97 194.518 1202.44 283.332 1202.44 396.851Z"
                className="fill-sky-600"/>
            </svg>
          </div>

          {/* Content overlay on the blob */}
          <div className="relative z-20 max-w-4xl w-full text-center">
            {/* Main heading and description */}
            <div className="mb-12 text-white">
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-shadow-lg">
              Your new way<br/>to shop is here ❤️
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto tracking-tight">
              Be the first to try it and help us turn this early version into something great.
              </p>
            </div>

            {/* Shopping options */}
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Traditional Shop Button */}
              <Link 
                href="/shop"
                className="block w-full bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl p-6 transition-all duration-300 shadow-xl group relative overflow-hidden border border-white/20"
              >
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="size-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <ShoppingCart className="size-8 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-medium text-gray-900">Traditional Shop</h3>
                    <p className="text-gray-600 text-sm">Browse our catalog with familiar e-commerce interface</p>
                  </div>
                  <div className="text-blue-500 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-10 h-10" />
                  </div>
                </div>
              </Link>

              {/* AI Chat Button */}
              <Link 
                href="/chat"
                className="block w-full bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl p-6 transition-all duration-300 shadow-xl group relative overflow-hidden border border-white/20"
              >
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="size-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <MessageCircle className="size-8 text-orange-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-medium text-gray-900">AI Chat Assistant (new)</h3>
                    <p className="text-gray-600 text-sm">Chat with AI to discover products and get recommendations</p>
                  </div>
                  <div className="text-orange-500 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-10 h-10" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="absolute bottom-4 left-8">
          <p className="text-gray-500 text-xs">© All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}
