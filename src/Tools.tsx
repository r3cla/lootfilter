import React from "react";
import { Github } from "lucide-react";

export default function Tools() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <header className="bg-black border-b border-red-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/applogo.png"
                alt="Logo"
                className="h-10 w-10 object-cover rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold">LootFilter.tech</h1>
                <h2 className="text-sm text-gray-400">Loot Filter Generator for Path of Exile 2</h2>
              </div>
            </div>
            <a
              href="/"
              className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              Back to Generator
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Community Tools</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-800 rounded-lg border border-red-900 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Divine View</h2>
            <p className="text-gray-400 mb-4">PoE2 Loot Filter Editor with syntax highlights and visual preview feature</p>
            <a
              href="https://divineview.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              Visit →
            </a>
          </div>

          <div className="p-6 bg-gray-800 rounded-lg border border-red-900 shadow-lg">
            <h2 className="text-xl font-bold mb-2">NeverSink</h2>
            <p className="text-gray-400 mb-4">Creator of several great filters and filter related tools, has a Lite filter for PoE 2 and an upcoming full filter.</p>
            <a
              href="https://github.com/NeverSinkDev/NeverSink-PoE2litefilter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              Visit →
            </a>
          </div>

          <div className="p-6 bg-gray-800 rounded-lg border border-red-900 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Sidekick</h2>
            <p className="text-gray-400 mb-4">Nice little overlay tool for PoE that let's you perform price checks etc. without leaving the game</p>
            <a
              href="https://sidekick-poe.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              Visit →
            </a>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg border border-red-900 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Exiled Exchange 2</h2>
            <p className="text-gray-400 mb-4">Similar to Sidekick. It's a fork of Awakened PoE Trade</p>
            <a
              href="https://kvan7.github.io/Exiled-Exchange-2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              Visit →
            </a>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg border border-red-900 shadow-lg">
            <h2 className="text-xl font-bold mb-2">PoE2Filter</h2>
            <p className="text-gray-400 mb-4">Custom filter generation application for PoE 2</p>
            <a
              href="https://poe2filter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              Visit →
            </a>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg border border-red-900 shadow-lg">
            <h2 className="text-xl font-bold mb-2">FilterBlade</h2>
            <p className="text-gray-400 mb-4">Robust filter customization app by NeverSink & team, currently WIP for PoE 2</p>
            <a
              href="https://www.filterblade.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              Visit →
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-black border-t border-red-900 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center text-gray-400 text-sm">
          <span>© 2025 LootFilter.tech</span>
          <a
            href="https://github.com/nathan-addison"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-colors duration-200"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
}
