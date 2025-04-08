"use client";

import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';
import Image from 'next/image';
import ProductionCode from './ProductionCode';
import BlogPost from './BlogPost';
import License from './License';
import Citation from './Citation';

function CodeExamples() {
  const [modalOpen, setModalOpen] = useState(false);

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative scroll-container">
      {/* Background - Simplified */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05),transparent_70%)] mix-blend-overlay"></div>

      {/* Content Container - Ensures content is above background */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-gray-900">
        <div className="flex justify-between items-center p-4">
          <img src="/synthara-logo.svg" alt="Synthara Logo" className="h-5" />
          <Link href="/" className="text-gray-400 hover:text-white smooth-transition text-sm">
            Home
          </Link>
        </div>
      </div>

      <div className="max-w-3xl w-full flex flex-col items-center mt-24 md:mt-8">
        {/* Navigation - Simplified */}
        <div className="w-full flex justify-between items-center mb-6">
          <img src="/synthara-logo.svg" alt="Synthara Logo" className="h-5" />
          <Link href="/" className="text-gray-400 hover:text-white smooth-transition text-sm">
            Home
          </Link>
        </div>

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

        <h1 className="text-2xl font-medium text-center mb-6">Code Examples</h1>

        <p className="text-gray-400 text-center mb-6 text-pretty max-w-2xl mx-auto">
          A simple test script to verify your API key and connection to LLaMA 4 Maverick.
        </p>

        {/* First Code Display */}
        <div className="w-full mb-8 scroll-section">
          <h2 className="h3 mb-4">API Test Script</h2>
          <div className="card p-4 overflow-hidden">
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              showLineNumbers={true}
              wrapLines={true}
            >
{`// Simple test script using fetch API
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

async function testAPI() {
  try {
    console.log('Testing API with key:', apiKey);

    const response = await fetch('https://api.together.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${apiKey}\`
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8',
        messages: [
          { role: 'user', content: 'What are some fun things to do in New York?' }
        ]
      })
    });

    if (!response.ok) {
      console.error('Error status:', response.status);
      console.error('Error text:', await response.text());
      return;
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
    console.log('Message content:', data.choices[0].message.content);
  } catch (error) {
    console.error('API Error:', error);
  }
}

testAPI();`}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Second Code Display */}
        <div className="w-full mb-8 scroll-section">
          <h2 className="h3 mb-4">React Component</h2>
          <div className="bg-gray-900 rounded-lg p-4 overflow-hidden">
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              showLineNumbers={true}
              wrapLines={true}
            >
{`import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Check if API key is available
const apiKey = import.meta.env.VITE_TOGETHER_API_KEY;
if (!apiKey) {
  console.error('VITE_TOGETHER_API_KEY is not set in environment variables');
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      // Use fetch API directly
      const response = await fetch('https://api.together.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${apiKey}\`
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8',
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        setResponse(\`Error \${response.status}: \${errorText}\`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setResponse(data.choices[0].message.content || '');
    } catch (error) {
      setResponse(\`Error: \${error.message}\`);
    }
    setLoading(false);
    setPrompt('');
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center">
      {/* Chat Input */}
      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything"
            className="flex-1 p-4 rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white px-8 py-4 rounded-r-lg"
          >
            {loading ? <Loader2 className="animate-spin" /> : <span>Send</span>}
          </button>
        </form>
      </div>

      {/* Response Display */}
      {response && (
        <div
          ref={chatContainerRef}
          className="mt-8 p-6 bg-white rounded-lg shadow-lg w-full max-w-3xl"
        >
          <div className="prose max-w-none">
            {response}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;`}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* UX Flow Diagram Section */}
        <div className="w-full mt-16 mb-8 scroll-section">
          <h2 className="h2 text-center mb-6">User Experience Flow</h2>
          <div
            className="w-full overflow-hidden card cursor-pointer subtle-hover"
            onClick={() => setModalOpen(true)}
          >
            <div className="relative">
              <Image
                src="/ux-flow-diagram.svg"
                alt="Llama4Maverick User Experience Flow Diagram"
                width={800}
                height={500}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-gray-800 px-4 py-2 rounded-md">
                  <span className="text-white">Click to enlarge</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-400 text-center max-w-2xl mx-auto">
            <p className="text-pretty small">User experience flow of the llama4Maverick application</p>
          </div>
        </div>

        {/* Modal for UX Flow Diagram */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90" onClick={() => setModalOpen(false)}>
            <div className="relative max-w-5xl w-full">
              <button
                className="absolute top-4 right-4 text-white subtle-surface rounded-full p-2 hover:opacity-80 focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <Image
                src="/ux-flow-diagram.svg"
                alt="Llama4Maverick User Experience Flow Diagram"
                width={800}
                height={500}
                className="w-full h-auto rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="mt-4 text-white text-center">
                <p className="text-gray-300 text-pretty small">User experience flow diagram</p>
              </div>
            </div>
          </div>
        )}

        {/* Production Code Section */}
        <ProductionCode />

        {/* Blog Post Section */}
        <BlogPost />

        {/* License Section */}
        <License />

        {/* Citation Section */}
        <Citation />

        {/* Footer with GitHub Link */}
        <div className="mt-8 text-gray-400 text-center flex justify-center gap-10 text-sm">
          <Link href="/" className="text-gray-400 hover:text-white smooth-transition group">
            Home
          </Link>

          <a
            href="https://github.com/synthara-company/llama4Maverick"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white smooth-transition group"
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

export default CodeExamples;
