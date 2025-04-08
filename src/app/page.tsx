'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function Home() {
  // First code snippet - Together AI client
  const clientCodeSnippet = `import Together from 'together-ai';

// Initialize the client with your API key
const together = new Together({ apiKey: 'YOUR_API_KEY' });

// Make a request to the API
const response = await together.chat.completions.create({
  messages: [{ "role": "user", "content": "What are some fun things to do in New York?" }],
  model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
});

// Access the response
console.log(response.choices[0].message.content);`;



  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative scroll-container">
      {/* Background - Simplified */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05),transparent_70%)] mix-blend-overlay"></div>

      {/* Content Container - Ensures content is above background */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Synthara AI Logo - Simplified */}
        <div className="w-full flex justify-center mb-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <img
              src="/synthara_ai.png"
              alt="Synthara AI Logo"
              className="w-full h-auto"
            />
          </div>
        </div>

        <h1 className="text-2xl font-medium text-center mb-6">Maverick</h1>

        {/* Navigation - Simplified */}
        <div className="w-full flex justify-center items-center mb-6">
          <img src="/synthara-logo.svg" alt="Synthara Logo" className="h-5" />
        </div>

        {/* Code Display - Together AI Client - Simplified */}
        <div className="w-full mb-6 card overflow-hidden">
          <SyntaxHighlighter
            language="javascript"
            style={atomDark}
            customStyle={{
              backgroundColor: 'transparent',
              padding: '16px',
              fontSize: '14px',
              lineHeight: '1.5',
              fontFamily: 'var(--font-mono), monospace',
            }}
            showLineNumbers={false}
            wrapLines={true}
          >
            {clientCodeSnippet}
          </SyntaxHighlighter>
        </div>



        {/* Navigation Links with Keyboard Shortcuts - Simplified */}
        <div className="mt-10 mb-6 flex justify-center">
          <div className="flex gap-10 text-sm">
            <a
              href="/chat"
              className="text-gray-400 hover:text-white smooth-transition group"
            >
              Chat
              <span className="ml-1 text-gray-600 text-xs">⌃</span>
            </a>

            <a
              href="/code-examples"
              className="text-gray-400 hover:text-white smooth-transition group"
            >
              Code
              <span className="ml-1 text-gray-600 text-xs">⌥</span>
            </a>

            <a
              href="https://github.com/synthara-company/llama4Maverick"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white smooth-transition group"
              title="Git Repository"
            >
              Git
              <span className="ml-1 text-gray-600 text-xs">\</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
