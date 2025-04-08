"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatComponent() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m the Llama 4 Maverick assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [password, setPassword] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [showChangeApiKey, setShowChangeApiKey] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load encrypted API key from local storage
  useEffect(() => {
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      const encryptedApiKey = localStorage.getItem('encryptedApiKey');
      const savedPassword = localStorage.getItem('apiKeyPassword');

      if (encryptedApiKey && savedPassword) {
        // Show password input instead of API key input
        setShowApiKeyInput(true);
      }
    }
  }, []);

  // Simple encryption function (not secure for production)
  const encryptApiKey = (key, password) => {
    // This is a very basic XOR encryption - not secure for production
    let encrypted = '';
    for (let i = 0; i < key.length; i++) {
      encrypted += String.fromCharCode(key.charCodeAt(i) ^ password.charCodeAt(i % password.length));
    }
    // Base64 encode - only in browser environment
    if (typeof window !== 'undefined') {
      return btoa(encrypted);
    }
    return encrypted;
  };

  // Simple decryption function
  const decryptApiKey = (encryptedKey, password) => {
    try {
      // Base64 decode - only in browser environment
      if (typeof window === 'undefined') {
        return '';
      }

      const decoded = atob(encryptedKey);
      let decrypted = '';
      for (let i = 0; i < decoded.length; i++) {
        decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ password.charCodeAt(i % password.length));
      }
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      return '';
    }
  };

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // Check if we're in forgot password mode
    if (showForgotPassword) {
      if (!apiKey.trim()) {
        setError('Please enter your API key');
        return;
      }

      // Verify API key with Together AI
      try {
        setIsLoading(true);
        // Make a minimal request to verify the API key
        fetch('https://api.together.ai/v1/models', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        })
        .then(response => {
          setIsLoading(false);
          if (!response.ok) {
            setError('Invalid API key. Please check and try again.');
            return;
          }

          // API key is valid, proceed with reset
          if (typeof window !== 'undefined') {
            localStorage.removeItem('encryptedApiKey');
            localStorage.removeItem('apiKeyPassword');

            // Encrypt and save the new API key with the new password
            const encryptedKey = encryptApiKey(apiKey, password);
            const passwordHash = btoa(password);

            localStorage.setItem('encryptedApiKey', encryptedKey);
            localStorage.setItem('apiKeyPassword', passwordHash);
          }

          setShowForgotPassword(false);
          setShowApiKeyInput(false);
          setPasswordMatched(false);
          setSuccessMessage('Password reset successful. Your API key has been updated.');
          setError('');
        })
        .catch(err => {
          setIsLoading(false);
          setError('Error verifying API key: ' + err.message);
        });
      } catch (err) {
        setIsLoading(false);
        setError('Error verifying API key: ' + (err instanceof Error ? err.message : String(err)));
      }
      return;
    }

    // Check if we're changing the password
    if (showChangePassword) {
      if (!newPassword.trim()) {
        setError('Please enter a new password');
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Re-encrypt the API key with the new password
      const encryptedKey = encryptApiKey(apiKey, newPassword);
      const passwordHash = btoa(newPassword);

      if (typeof window !== 'undefined') {
        localStorage.setItem('encryptedApiKey', encryptedKey);
        localStorage.setItem('apiKeyPassword', passwordHash);
      }

      setShowChangePassword(false);
      setShowApiKeyInput(false);
      setPasswordMatched(false);
      setNewPassword('');
      setConfirmPassword('');
      setSuccessMessage('Password changed successfully');
      setError('');
      return;
    }

    // Check if we're changing the API key
    if (showChangeApiKey) {
      if (!apiKey.trim()) {
        setError('Please enter your new API key');
        return;
      }

      if (!password.trim()) {
        setError('Please enter your password');
        return;
      }

      // Encrypt and save the new API key
      const encryptedKey = encryptApiKey(apiKey, password);
      if (typeof window !== 'undefined') {
        localStorage.setItem('encryptedApiKey', encryptedKey);
      }

      setShowChangeApiKey(false);
      setShowApiKeyInput(false);
      setSuccessMessage('API key updated successfully');
      setError('');
      return;
    }

    // Check if we're trying to decrypt an existing key
    let encryptedApiKey = null;
    let savedPasswordHash = null;
    if (typeof window !== 'undefined') {
      encryptedApiKey = localStorage.getItem('encryptedApiKey');
      savedPasswordHash = localStorage.getItem('apiKeyPassword');
    }

    if (encryptedApiKey && savedPasswordHash && !passwordMatched) {
      // We're trying to unlock with password
      if (!password.trim()) {
        setError('Please enter your password');
        return;
      }

      // Simple password hash (not secure for production)
      let passwordHash = '';
      if (typeof window !== 'undefined') {
        passwordHash = btoa(password);
      }

      if (passwordHash !== savedPasswordHash) {
        setError('Incorrect password');
        return;
      }

      // Decrypt the API key
      const decryptedKey = decryptApiKey(encryptedApiKey, password);
      setApiKey(decryptedKey);
      setPasswordMatched(true);
      setSuccessMessage('Password matched');
      setError('');
    } else if (passwordMatched) {
      // We're already authenticated, now choose what to do
      setShowChangeApiKey(true);
      setPasswordMatched(false);
      setSuccessMessage('');
    } else {
      // We're saving a new API key with password
      if (!apiKey.trim()) {
        setError('Please enter your API key');
        return;
      }

      if (!password.trim()) {
        setError('Please enter a password to protect your API key');
        return;
      }

      // Encrypt and save
      const encryptedKey = encryptApiKey(apiKey, password);
      // Simple hash (not secure for production)
      let passwordHash = '';
      if (typeof window !== 'undefined') {
        passwordHash = btoa(password);
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('encryptedApiKey', encryptedKey);
        localStorage.setItem('apiKeyPassword', passwordHash);
      }

      setShowApiKeyInput(false);
      setSuccessMessage('API key saved successfully');
      setError('');
    }
  };

  const handleChangeApiKey = () => {
    setShowApiKeyInput(true);
    setPasswordMatched(false);
    setSuccessMessage('');
    setError('');
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
    setShowApiKeyInput(true);
    setPasswordMatched(false);
    setSuccessMessage('');
    setError('');
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setShowApiKeyInput(true);
    setPasswordMatched(false);
    setSuccessMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!apiKey) {
      setShowApiKeyInput(true);
      setError('Please enter your API key');
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.together.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8',
          messages: [
            ...messages,
            userMessage
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message;
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError((err instanceof Error ? err.message : String(err)) || 'An error occurred while calling the API');
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content) => {
    // Simple regex to detect code blocks
    const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)```/g;
    const formattedContent = content;
    let match;
    let lastIndex = 0;
    const parts = [];

    // Find all code blocks
    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index)
        });
      }

      // Add code block
      const language = match[1] || 'javascript';
      const code = match[2];
      parts.push({
        type: 'code',
        language,
        content: code
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex)
      });
    }

    // If no code blocks were found, return the original content
    if (parts.length === 0) {
      return <p className="whitespace-pre-wrap">{content}</p>;
    }

    // Render the parts
    return (
      <div>
        {parts.map((part, index) => {
          if (part.type === 'text') {
            return <p key={index} className="whitespace-pre-wrap">{part.content}</p>;
          } else {
            return (
              <div key={index} className="my-2">
                <SyntaxHighlighter
                  language={part.language}
                  style={atomDark}
                  customStyle={{
                    borderRadius: '4px',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                >
                  {part.content}
                </SyntaxHighlighter>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05),transparent_70%)] mix-blend-overlay"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <div className="w-full flex justify-center mb-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <img
              src="/synthara_ai.png"
              alt="Synthara AI Logo"
              className="w-full h-auto"
            />
          </div>
        </div>

        <h1 className="text-2xl font-medium text-center mb-4">Assistant</h1>
        {/* Minimal Navigation */}
        <div className="w-full flex justify-between items-center mb-6">
          <img src="/synthara-logo.svg" alt="Synthara Logo" className="h-5" />
          <Link href="/" className="text-gray-400 hover:text-white smooth-transition text-sm">
            Home
          </Link>
        </div>

        {/* API Key Input */}
        {showApiKeyInput && (
          <div className="w-full card p-4 mb-4">
            <form onSubmit={handleApiKeySubmit} className="flex flex-col">
              {/* Forgot Password Mode */}
              {showForgotPassword ? (
                <>
                  <h3 className="text-lg font-medium mb-2">Reset Password</h3>
                  <div className="subtle-surface p-3 rounded-md mb-4">
                    <p className="text-sm text-gray-300">
                      Please enter your API key and create a new password.
                    </p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your Together AI API key"
                      className="w-full px-3 py-2 subtle-surface subtle-border rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a new password"
                      className="w-full px-3 py-2 subtle-surface subtle-border rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="btn bg-gray-800 text-gray-300 hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn bg-gray-700 text-white hover:bg-gray-600"
                    >
                      {isLoading ? 'Verifying...' : 'Reset Password'}
                    </button>
                  </div>
                </>
              ) : showChangePassword ? (
                /* Change Password Mode */
                <>
                  <h3 className="text-lg font-medium mb-2">Change Password</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setShowChangePassword(false)}
                      className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </>
              ) : showChangeApiKey ? (
                /* Change API Key Mode */
                <>
                  <h3 className="text-lg font-medium mb-2">Change API Key</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      New API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your new Together AI API key"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setShowChangeApiKey(false)}
                      className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Update API Key
                    </button>
                  </div>
                </>
              ) : passwordMatched ? (
                /* Password Matched - Show Options */
                <>
                  <h3 className="text-lg font-medium mb-2">API Key Options</h3>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setShowChangeApiKey(true)}
                      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Change API Key
                    </button>
                    <button
                      type="button"
                      onClick={handleChangePassword}
                      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Change Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowApiKeyInput(false);
                        setPasswordMatched(false);
                      }}
                      className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Continue to Chat
                    </button>
                  </div>
                </>
              ) : (
                /* Default API Key Input */
                <>
                  <h3 className="text-lg font-medium mb-2">
                    {localStorage.getItem('encryptedApiKey')
                      ? 'Enter Password'
                      : 'API Key Setup'}
                  </h3>
                  {localStorage.getItem('encryptedApiKey') ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                      <div className="mt-2 text-right">
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-sm text-blue-400 hover:text-blue-300"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          API Key
                        </label>
                        <input
                          type="password"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="Enter your Together AI API key"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password to protect your API key"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setShowApiKeyInput(false)}
                      className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      {localStorage.getItem('encryptedApiKey')
                        ? 'Unlock'
                        : 'Save API Key'}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="w-full bg-green-900 bg-opacity-50 rounded-lg p-3 mb-4 text-white text-sm">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-900/30 rounded-lg p-3 mb-4 text-white text-sm">
            {error}
          </div>
        )}

        {/* Chat Messages */}
        <div className="w-full card p-4 mb-4 flex-1 overflow-y-auto max-h-[60vh] min-h-[300px]">
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div className="font-medium text-sm text-gray-400 mb-1">
                {msg.role === 'user' ? 'You' : 'Assistant'}
              </div>
              <div
                className={`p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-900/30 ml-8"
                    : "subtle-surface mr-8"
                }`}
              >
                {formatMessage(msg.content)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mb-4">
              <div className="font-medium text-sm text-gray-400 mb-1">
                Assistant
              </div>
              <div className="p-3 rounded-lg subtle-surface mr-8">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 subtle-surface subtle-border rounded-l-lg text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-gray-700 text-white rounded-r-lg hover:bg-gray-600 smooth-transition disabled:bg-gray-800 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>

        {/* API Key Management */}
        <div className="w-full flex justify-end">
          <button
            onClick={handleChangeApiKey}
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            {apiKey ? 'Change API Key' : 'Enter API Key'}
          </button>
        </div>

        {/* Model Information */}
        <div className="mt-4 w-full">
          <details className="card p-4">
            <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300">
              Model Information
            </summary>
            <div className="mt-3 p-3 subtle-surface rounded-md text-xs text-gray-300 whitespace-pre-wrap">
              {`Model: meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8
Provider: Together AI
Description: Llama 4 Maverick is a 17B parameter model optimized for instruction following and conversational tasks.`}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
