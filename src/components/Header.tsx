import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-700">
            Reflection
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-500">
              Home
            </Link>
            {/* 您可以在這裡加入更多連結 */}
          </div>
        </div>
      </nav>
    </header>
  );
}