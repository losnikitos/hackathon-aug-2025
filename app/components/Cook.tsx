export default function Cook() {
  return (
    <div className="flex gap-4">
      <img
        src="/cook-2.png"
        alt="Chef cooking"
        className="w-64 h-auto object-contain"
      />

        {/* Speech bubble 1 - "Bonjour" */}
      <div className="space-y-2">
        <div
          className="opacity-0 animate-fadeIn"
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          <div className="bg-white rounded-2xl px-4 py-2 shadow-lg border border-gray-200 relative">
            <p className="text-sm font-medium text-gray-800">Bonjour</p>
            <div className="absolute left-0 top-1/2 w-3 h-3 bg-white border-l border-b border-gray-200 transform -translate-y-1/2 -translate-x-1/2 rotate-45"></div>
          </div>
        </div>

        {/* Speech bubble 2 - "Welcome to our epicerie, what are we cooking today?" */}
        <div
          className="opacity-0 animate-fadeIn"
          style={{ animationDelay: "2s", animationFillMode: "forwards" }}
        >
          <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-200 relative max-w-48">
            <p className="text-sm font-medium text-gray-800">
              Welcome to our epicerie, what are we cooking today?
            </p>
            {/* Speech bubble tail */}
            <div className="absolute left-0 top-1/2 w-3 h-3 bg-white border-l border-b border-gray-200 transform -translate-y-1/2 -translate-x-1/2 rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
