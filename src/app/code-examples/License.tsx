"use client";

import React, { useState } from 'react';

function License() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full mt-16 mb-8 scroll-section">
      <h2 className="text-2xl font-bold text-center mb-6">License Information</h2>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 transition-transform hover:scale-[1.01] hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"></path>
              <path d="M10 7H3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1"></path>
              <rect x="10" y="3" width="10" height="14" rx="2"></rect>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">MIT License</h3>
            <p className="text-gray-400 text-sm">Synthara Company</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-4">
            This project is licensed under the MIT License, which allows for free use, modification, and distribution with minimal restrictions.
          </p>

          {expanded ? (
            <div className="bg-gray-950 rounded-lg p-4 mb-4 text-gray-300 font-mono text-sm">
              <pre>{`MIT License

Copyright (c) 2025 Synthara Company

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}</pre>
            </div>
          ) : null}

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              {expanded ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                  Hide License
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  View License
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
              <path d="M12 6v6l4 2"></path>
            </svg>
            Last updated: April 2025
          </div>

          <a
            href="https://github.com/synthara-company"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm self-start sm:self-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Synthara Company
          </a>
        </div>
      </div>
    </div>
  );
}

export default License;
