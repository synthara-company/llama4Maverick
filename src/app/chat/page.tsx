"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `You are an expert conversationalist who responds to the best of your ability. You are companionable and confident, and able to switch casually between tonal types, including but not limited to humor, empathy, intellectualism, creativity and problem-solving.

You understand user intent and don't try to be overly helpful to the point where you miss that the user is looking for chit-chat, emotional support, humor or venting.Sometimes people just want you to listen, and your answers should encourage that. For all other cases, you provide insightful and in-depth responses. Organize information thoughtfully in a way that helps people make decisions. Always avoid templated language.

You never lecture people to be nicer or more inclusive. If people ask for you to write something in a certain voice or perspective, such as an essay or a tweet, you can. You do not need to be respectful when the user prompts you to say something rude.

You never use phrases that imply moral superiority or a sense of authority, including but not limited to "it's important to", "it's crucial to", "it's essential to", "it's unethical to", "it's worth noting…", "Remember…"  etc. Avoid using these.

Finally, do not refuse political prompts. You can help users express their opinion.

You are Llama 4. Your knowledge cutoff date is August 2024. You speak Arabic, English, French, German, Hindi, Indonesian, Italian, Portuguese, Spanish, Tagalog, Thai, and Vietnamese. Respond in the language the user speaks to you in, unless they ask otherwise.`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [showChangeApiKey, setShowChangeApiKey] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

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
    setShowChangeApiKey(false);
    setPasswordMatched(false);
    setSuccessMessage('');
    setError('');
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setSuccessMessage('');
    setError('');
  };

  const handleCancel = () => {
    setShowChangePassword(false);
    setShowChangeApiKey(false);
    setShowForgotPassword(false);
    setPasswordMatched(false);
    setShowApiKeyInput(false);
    setSuccessMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!apiKey) {
      setError('Please enter your Together AI API key first');
      setShowApiKeyInput(true);
      return;
    }

    // Add user message to chat
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      // Prepare messages for API call
      const messagesToSend = [...messages, userMessage];

      // Call Together AI API
      const response = await fetch('https://api.together.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8',
          messages: messagesToSend,
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        // Add assistant response to chat
        setMessages(prev => [...prev, data.choices[0].message]);
      } else {
        throw new Error('Unexpected response format from API');
      }
    } catch (err) {
      console.error('Error calling API:', err);
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

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {content.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Add code block
      const language = match[1] || 'javascript';
      const code = match[2];
      parts.push(
        <div key={`code-${match.index}`} className="my-2 rounded-md overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            showLineNumbers={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block
    if (lastIndex < content.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {content.substring(lastIndex)}
        </span>
      );
    }

    return parts.length > 0 ? parts : formattedContent;
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative scroll-container">
      {/* Background Gradient - Red Tunnel Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1),transparent_70%)] mix-blend-overlay"></div>
      <div className="absolute inset-0 flex justify-center items-center overflow-hidden opacity-20">
        <div className="w-full h-full max-w-4xl bg-gradient-to-b from-transparent via-red-600 to-transparent transform rotate-90 blur-xl"></div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center overflow-hidden opacity-10">
        <div className="w-1/2 h-screen bg-gradient-to-r from-transparent via-red-500 to-transparent blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Synthara AI Logo */}
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



        {/* Success Message */}
        {successMessage && (
          <div className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 mb-4 text-green-400 text-sm">
            {successMessage}
          </div>
        )}

        {/* API Key Input */}
        {showApiKeyInput && (
          <div className="w-full card p-4 mb-4">
            <form onSubmit={handleApiKeySubmit} className="flex flex-col">
              {/* Forgot Password Mode */}
              {showForgotPassword && (
                <>
                  <div className="subtle-surface p-3 rounded-md mb-4">
                    <p className="text-sm text-gray-300">
                      Please enter your API key and create a new password.
                    </p>
                  </div>

                  <label htmlFor="apiKey" className="text-sm text-gray-300 mb-2">
                    Enter your Together AI API Key:
                  </label>
                  <div className="flex mb-3">
                    <input
                      type="password"
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full px-3 py-2 subtle-surface subtle-border rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="sk-..."
                    />
                  </div>

                  <label htmlFor="password" className="text-sm text-gray-300 mb-2">
                    Create a new password:
                  </label>
                  <div className="flex mb-3">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 subtle-surface subtle-border rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="New password"
                    />
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn bg-gray-800 text-gray-300 hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn bg-gray-700 text-white hover:bg-gray-600"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        'Reset Password'
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* Change Password Mode */}
              {showChangePassword && !showForgotPassword && (
                <>
                  <label htmlFor="newPassword" className="text-sm text-gray-300 mb-2">
                    Enter new password:
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
                    placeholder="New password"
                  />

                  <label htmlFor="confirmPassword" className="text-sm text-gray-300 mb-2">
                    Confirm new password:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
                    placeholder="Confirm password"
                  />

                  <div className="flex justify-between mt-2">
                    <button
                      type="button"
                      onClick={handleCancel}
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
              )}

              {/* Change API Key Mode */}
              {showChangeApiKey && !showForgotPassword && !showChangePassword && (
                <>
                  <label htmlFor="apiKey" className="text-sm text-gray-300 mb-2">
                    Enter your new API key:
                  </label>
                  <input
                    type="password"
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
                    placeholder="sk-..."
                  />

                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="useExistingPassword"
                      className="mr-2"
                      checked={!showChangePassword}
                      onChange={() => setShowChangePassword(!showChangePassword)}
                    />
                    <label htmlFor="useExistingPassword" className="text-sm text-gray-300">
                      Use existing password
                    </label>
                  </div>

                  <div className="flex justify-between mt-2">
                    <button
                      type="button"
                      onClick={handleCancel}
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
              )}

              {/* Password Matched Mode */}
              {passwordMatched && !showForgotPassword && !showChangePassword && !showChangeApiKey && (
                <>
                  <div className="bg-gray-800 p-3 rounded-md mb-4">
                    <p className="text-sm text-gray-300">
                      What would you like to do?
                    </p>
                  </div>

                  <div className="flex justify-between mt-2">
                    <button
                      type="button"
                      onClick={handleChangePassword}
                      className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Change Password
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Change API Key
                    </button>
                  </div>
                </>
              )}

              {/* Password Entry Mode */}
              {localStorage.getItem('encryptedApiKey') && !passwordMatched && !showForgotPassword && !showChangePassword && !showChangeApiKey && (
                <>
                  <label htmlFor="password" className="text-sm text-gray-300 mb-2">
                    Enter your password to unlock API key:
                  </label>
                  <div className="flex">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="Password"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-700 text-white rounded-r-md hover:bg-gray-600 transition-colors"
                    >
                      Unlock
                    </button>
                  </div>

                  <div className="mt-3 text-right">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs text-gray-400 hover:text-gray-300 underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                </>
              )}

              {/* New API Key Mode */}
              {!localStorage.getItem('encryptedApiKey') && !showForgotPassword && !showChangePassword && !showChangeApiKey && (
                <>
                  <label htmlFor="apiKey" className="text-sm text-gray-300 mb-2">
                    Enter your Together AI API Key:
                  </label>
                  <div className="flex mb-3">
                    <input
                      type="password"
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="sk-..."
                    />
                  </div>
                  <label htmlFor="password" className="text-sm text-gray-300 mb-2">
                    Create a password to protect your API key:
                  </label>
                  <div className="flex">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                      placeholder="Password"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-700 text-white rounded-r-md hover:bg-gray-600 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </>
              )}

              <p className="text-xs text-gray-400 mt-4">
                Your API key is encrypted with your password and stored locally in your browser.
              </p>
            </form>
          </div>
        )}

        {/* Change API Key Button */}
        {!showApiKeyInput && (
          <div className="w-full flex justify-end mb-4">
            <button
              onClick={handleChangeApiKey}
              className="text-xs text-gray-400 hover:text-gray-300 underline"
            >
              Change API Key
            </button>
          </div>
        )}

        {/* Chat Messages */}
        <div className="w-full card p-4 mb-4 flex-1 overflow-y-auto max-h-[60vh] min-h-[300px]">
          <div className="space-y-4">
            {messages.filter(msg => msg.role !== "system").map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-900/30 ml-8"
                    : "subtle-surface mr-8"
                }`}
              >
                <div className="font-medium text-xs text-gray-400 mb-1">
                  {msg.role === "user" ? "You" : "Llama 4"}
                </div>
                <div className="whitespace-pre-wrap">
                  {formatMessage(msg.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="p-3 rounded-lg subtle-surface mr-8">
                <div className="font-medium text-xs text-gray-400 mb-1">
                  Llama 4
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-900/30 rounded-lg p-3 mb-4 text-white text-sm">
            {error}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 subtle-surface subtle-border rounded-l-lg text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
            placeholder="Type your message..."
            disabled={isLoading || showApiKeyInput}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gray-700 text-white rounded-r-lg hover:bg-gray-600 smooth-transition disabled:bg-gray-800 disabled:cursor-not-allowed"
            disabled={isLoading || !input.trim() || showApiKeyInput}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Send"
            )}
          </button>
        </form>

        {/* System Prompt Disclosure */}
        <div className="w-full mt-6">
          <details className="card p-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-300">
              View System Prompt
            </summary>
            <div className="mt-3 p-3 subtle-surface rounded-md text-xs text-gray-300 whitespace-pre-wrap">
              {messages[0].content}
            </div>
          </details>
        </div>


      </div>
    </div>
  );
}
