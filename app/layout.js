import './globals.css';

export const metadata = {
  title: 'Namma Stay - Find PGs in Bangalore',
  description: 'Find the best premium and budget PGs in Bangalore with Namma Stay.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <header className="bg-indigo-600 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight">🏢 Namma Stay</h1>
            <span className="text-sm bg-indigo-700 px-3 py-1 rounded-full">Bangalore Edition</span>
          </div>
        </header>
        <main>{children}</main>
        <footer className="text-center py-6 text-gray-500 text-sm border-t mt-12">
          © {new Date().getFullYear()} Namma Stay. Built for Vercel Free Tier.
        </footer>
      </body>
    </html>
  );
}
