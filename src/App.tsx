import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Check if API key is available
const apiKey = import.meta.env.VITE_TOGETHER_API_KEY;
console.log('API Key available:', apiKey ? 'Yes (length: ' + apiKey.length + ')' : 'No');
if (!apiKey) {
  console.error('VITE_TOGETHER_API_KEY is not set in environment variables');
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      console.log('Sending request with prompt:', prompt);

      // Use fetch API directly instead of the Together client
      const response = await fetch('https://api.together.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
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
        console.error('API Error:', response.status, errorText);
        setResponse(`Error ${response.status}: ${errorText}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Response received:', data);

      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        setResponse(data.choices[0].message.content || '');
      } else {
        console.error('Unexpected response format:', data);
        setResponse('Received an unexpected response format from the API.');
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error name:', error.name);
        setResponse(`Error: ${error.message}`);
      } else {
        console.error('Unknown error type:', typeof error);
        setResponse('Sorry, something went wrong. Please try again.');
      }
    }
    setLoading(false);
    setPrompt('');
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [response]);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center relative overflow-hidden">
      {/* 3D Geometric Shapes */}
      <motion.div
        className="absolute top-10 left-20 w-16 h-16 bg-gradient-to-br from-green-300 to-green-400 rounded-md"
        animate={{
          rotate: 360,
          y: [0, 20, 0],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(45deg)' }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-tr from-blue-300 to-blue-500 rounded-md"
        animate={{
          rotate: -360,
          x: [0, -30, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformStyle: 'preserve-3d', transform: 'rotateY(45deg)' }}
      />

      <motion.div
        className="absolute top-40 right-40 w-12 h-12 bg-gradient-to-bl from-purple-300 to-purple-500 rounded-full"
        animate={{
          y: [0, 40, 0],
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      <motion.div
        className="absolute bottom-40 left-40 w-24 h-24 bg-gradient-to-tr from-orange-300 to-red-400 rounded-md"
        animate={{
          rotate: 180,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformStyle: 'preserve-3d', transform: 'rotateZ(30deg)' }}
      />

      <motion.div
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-tr from-yellow-300 to-yellow-500 rounded-full"
        animate={{
          x: [0, 30, 0],
        }}
        transition={{
          x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Logo and Title */}
      <div className="text-center mb-16 z-10">
        <div className="bg-black text-white px-3 py-1 inline-flex items-center rounded mb-4">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 19V7.5L17.5 11L22 7.5V19L17.5 15.5L13 19Z" fill="currentColor"/>
            <path d="M2 19V7.5L6.5 11L11 7.5V19L6.5 15.5L2 19Z" fill="currentColor"/>
          </svg>
          <span className="font-bold text-sm">SYNTHARA AI</span>
        </div>

        <h1 className="text-8xl font-bold text-white drop-shadow-lg">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-shadow-lg">Llama 4</span>
          </motion.span>
        </h1>

        <h2 className="text-8xl font-bold text-white drop-shadow-lg mt-4">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-shadow-lg">Maverick</span>
          </motion.span>
        </h2>
      </div>

      {/* Chat Input */}
      <div className="w-full max-w-3xl z-10">
        <form onSubmit={handleSubmit} className="flex">
          <div className="flex-1 bg-white rounded-l-lg border-r border-gray-200 overflow-hidden">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything"
              className="w-full p-4 focus:outline-none text-gray-700"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-r-lg flex items-center justify-center transition-colors duration-200"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span>Send</span>
            )}
          </button>
        </form>
      </div>

      {/* Response Display */}
      {response && (
        <div
          ref={chatContainerRef}
          className="mt-8 p-6 bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[50vh] overflow-y-auto z-10"
        >
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {response}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-gray-600 text-sm flex items-center gap-4 z-10">
        <a href="https://github.com/bniladridas/llama4Maverick" className="hover:text-gray-900">Our TypeScript Code</a>
        <span>|</span>
        <a href="mailto:synthara.company@gmail.com" className="hover:text-gray-900">synthara.company@gmail.com</a>
        <span>|</span>
        <a href="https://github.com/synthara-company" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">By Synthara Company</a>
      </div>
    </div>
  );
}

export default App;