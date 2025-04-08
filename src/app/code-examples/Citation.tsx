"use client";

import React, { useState } from 'react';

function Citation() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full mt-16 mb-8 scroll-section">
      <h2 className="text-2xl font-bold text-center mb-6">Citation Information</h2>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 transition-transform hover:scale-[1.01] hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Llama 4 Maverick Chat Interface</h3>
            <p className="text-gray-400 text-sm">Version 1.0.0 · Released April 6, 2025</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-4">
            A modern React application for interacting with Meta&apos;s Llama 4 Maverick model via Together AI&apos;s API.
          </p>

          <div className="bg-gray-950 rounded-lg p-4 mb-4">
            <h4 className="text-white font-semibold mb-2">Author</h4>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Niladri Das</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <a
                    href="https://orcid.org/0009-0002-6619-5691"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm6.69 5.159a.97.97 0 0 1 .968.968.97.97 0 0 1-.968.967.97.97 0 0 1-.967-.967.97.97 0 0 1 .967-.968zM9.509 5.772h2.428v1.662H9.509V5.772zm7.636 8.91c0 2.833-1.33 4.162-4.163 4.162H6.909V9.818h2.428v7.259h3.587c1.495 0 2.393-.898 2.393-2.393v-4.866h1.828v4.866z"/>
                    </svg>
                    ORCID
                  </a>
                  <span>·</span>
                  <span>Synthara Company</span>
                </div>
              </div>
            </div>
          </div>

          {expanded && (
            <>
              <div className="bg-gray-950 rounded-lg p-4 mb-4">
                <h4 className="text-white font-semibold mb-2">How to Cite</h4>
                <div className="text-gray-300 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">
{`Das, N. (2024). Llama 4 Maverick Chat Interface (Version 1.0.0) [Computer software]. https://github.com/synthara-company/llama4Maverick`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-950 rounded-lg p-4 mb-4">
                <h4 className="text-white font-semibold mb-2">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">llama</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">llm</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">ai</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">chat</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">react</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">together-ai</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">maverick</span>
                </div>
              </div>

              <div className="bg-gray-950 rounded-lg p-4 mb-4">
                <h4 className="text-white font-semibold mb-2">References</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>
                    <span className="font-medium">Meta AI (2024).</span> Llama 4 Maverick [Software].
                  </li>
                  <li>
                    <span className="font-medium">Together AI (2024).</span> Together AI API [Software].
                    <a
                      href="https://www.together.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline ml-1"
                    >
                      https://www.together.ai/
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}

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
                  Show Less
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  Show More
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <a
            href="https://github.com/synthara-company/llama4Maverick"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            View Repository
          </a>
        </div>
      </div>
    </div>
  );
}

export default Citation;
