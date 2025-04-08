"use client";

import React, { useState } from 'react';

function BlogPost() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full mt-16 mb-8 scroll-section">
      <h2 className="text-2xl font-bold text-center mb-6">API Test Results</h2>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 transition-transform hover:scale-[1.01] hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Testing Llama 4 Maverick: New York Query</h3>
            <p className="text-gray-400 text-sm">By Niladri Das</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-4">
            Testing how an AI model responds to natural language queries requires a valid API key, correct endpoint, and properly formatted payload.
          </p>

          {expanded ? (
            <>
              <p className="text-gray-300 mb-4">
                Using Together.ai's API with Meta's Llama-4 Maverick model, we asked:
              </p>

              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300 mb-4">
                "What are some fun things to do in New York?"
              </blockquote>

              <p className="text-gray-300 mb-4">
                The model provided a concise guide to New York attractions, demonstrating the capabilities of modern conversational AI.
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">#llm</span>
                <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">#togetherai</span>
                <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">#llama4maverick</span>
                <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">#javascript-api</span>
                <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">#airesponsetesting</span>
              </div>
            </>
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
                  Read Less
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  Read More
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <a
            href="https://medium.com/@bniladridas/a-patterned-perspective-what-happens-when-you-ask-a-model-about-new-york-6a39d538bb32"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Read Full Article on Medium
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
