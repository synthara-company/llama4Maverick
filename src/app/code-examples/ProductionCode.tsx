"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ProductionCode() {
  const [showAppCode, setShowAppCode] = useState(false);
  const [showTestCode, setShowTestCode] = useState(false);
  
  // App.tsx code snippet - exact code from the repository
  const appCode = `// From App.tsx - handleSubmit function
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
      console.error('API Error:', response.status, errorText);
      setResponse(\`Error \${response.status}: \${errorText}\`);
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
      setResponse(\`Error: \${error.message}\`);
    } else {
      console.error('Unknown error type:', typeof error);
      setResponse('Sorry, something went wrong. Please try again.');
    }
  }
  setLoading(false);
  setPrompt('');
};`;

  // Test API fetch code snippet - exact code from the repository
  const testCode = `// Simple test script using fetch API
const apiKey = 'YOUR_API_KEY'; // API key placeholder for security

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

testAPI();`;

  return (
    <div className="w-full mt-16 mb-8 scroll-section">
      <h2 className="text-2xl font-bold text-center mb-6">Full Production Code</h2>
      
      <div className="space-y-8">
        {/* App.tsx Code - Simplified Version */}
        <div 
          className="bg-gray-900 rounded-lg p-5 border border-gray-800 transition-transform hover:scale-[1.01] hover:shadow-lg cursor-pointer"
          onClick={() => setShowAppCode(!showAppCode)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 4v16H4V4h16z"></path>
                  <path d="M4 4v4h16"></path>
                  <path d="M4 12h16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">App.tsx (Core Functionality)</h3>
            </div>
            <div className="text-gray-400">
              {showAppCode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </div>
          </div>
          
          {showAppCode && (
            <div className="mt-4">
              <SyntaxHighlighter
                language="typescript"
                style={atomDark}
                customStyle={{
                  backgroundColor: '#0a0c10',
                  borderRadius: '8px',
                  padding: '20px',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  fontFamily: 'monospace',
                }}
                showLineNumbers={true}
                wrapLines={true}
              >
                {appCode}
              </SyntaxHighlighter>
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <a 
              href="https://github.com/synthara-company/llama4Maverick/blob/main/src/App.tsx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              View Full Code on GitHub
            </a>
          </div>
        </div>
        
        {/* test-api-fetch.js Code */}
        <div 
          className="bg-gray-900 rounded-lg p-5 border border-gray-800 transition-transform hover:scale-[1.01] hover:shadow-lg cursor-pointer"
          onClick={() => setShowTestCode(!showTestCode)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">test-api-fetch.js</h3>
            </div>
            <div className="text-gray-400">
              {showTestCode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </div>
          </div>
          
          {showTestCode && (
            <div className="mt-4">
              <SyntaxHighlighter
                language="javascript"
                style={atomDark}
                customStyle={{
                  backgroundColor: '#0a0c10',
                  borderRadius: '8px',
                  padding: '20px',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  fontFamily: 'monospace',
                }}
                showLineNumbers={true}
                wrapLines={true}
              >
                {testCode}
              </SyntaxHighlighter>
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <a 
              href="https://github.com/synthara-company/llama4Maverick/blob/main/test-api-fetch.js" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              View Full Code on GitHub
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-gray-400 text-center">
        <p className="mb-2">These code examples demonstrate how to interact with the Llama 4 Maverick model using the Together AI API.</p>
        <p className="mb-2">The App.tsx file shows a complete React application with user interface, while the test-api-fetch.js file provides a simple script for testing the API.</p>
        <p>Both examples use the fetch API to make requests to the Together AI endpoint and process the responses.</p>
      </div>
    </div>
  );
}

export default ProductionCode;
