"use client";

import { useEffect } from 'react';

export default function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Control key for Chat (⌃)
      if (e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
        window.location.href = '/chat';
      }

      // Option key for Code Examples (⌥)
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        window.location.href = '/code-examples';
      }

      // Backslash key for GitHub repository (\)
      if (e.key === '\\' && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
        window.open('https://github.com/synthara-company/llama4Maverick', '_blank');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
