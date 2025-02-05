import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMS",
  description: "Ticket Manager Service iFIT",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const loggedIn = true; // implement functionality to check if logged in

  // if user isn't logged in, don't use layout
  if (!loggedIn) {
    return <>{children}</>;
  }

  return (
    <html lang="en">
      <head>
        <title>TMS</title>
      </head>
      <body className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex space-x-6">
              <Link href="/" className="text-xl font-bold hover:underline">
                TMS
              </Link>
              <nav className="flex space-x-6">
                <Link href="/devices" className="hover:underline">Devices</Link>
                <Link href="/workouts" className="hover:underline">Workouts</Link>
                <Link href="/issues" className="hover:underline">Issues</Link>
              </nav>
            </div>
            <Link href="/logout" className="hover:underline">
              Logout
            </Link>
          </div>
        </header>
        <main className="flex-1 container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
