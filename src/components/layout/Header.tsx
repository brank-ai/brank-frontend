export default function Header() {
  return (
    <header className="w-full bg-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/images/brank-logo.svg"
            alt="Brank.AI Logo"
            className="w-6 h-6"
          />
          <span className="text-white text-lg font-medium">
            Brank.Ai
          </span>
        </div>
        
        <div>
          <button className="px-6 py-2 bg-white text-black rounded text-sm font-medium hover:bg-gray-100 transition-colors">
            Join Waitlist
          </button>
        </div>
      </div>
    </header>
  );
}