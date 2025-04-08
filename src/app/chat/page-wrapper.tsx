"use client";

import dynamic from 'next/dynamic';

// Dynamically import the chat component with no SSR
const ChatComponent = dynamic(() => import('./chat-component'), { ssr: false });

export default function ChatPage() {
  return <ChatComponent />;
}
