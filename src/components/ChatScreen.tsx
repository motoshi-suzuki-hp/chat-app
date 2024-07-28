import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Howl } from 'howler';
import '../reset.css';
import './ChatScreen.css';

interface Message {
  id: number;
  content: string;
  type: string;
}

const playCallSound = () => {
  const sound = new Howl({
    src: ['example.mp3'],
    autoplay: true,
    onend: () => {
      console.log('音声が終了しました');
    }
  });

  sound.play();
};

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    // { id: 1, content: "Welcome to the chat!", type: "text" },
    // { id: 2, content: "/assets/example.png", type: "image" }
  ]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/messages');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="chat-screen">
      {messages ? (
        messages.map((msg) => (
          <div key={msg.id} className="message">
            {msg.type === 'text' && <p>{msg.content}</p>}
            {msg.type === 'image' && <img src={msg.content} alt="example" className="chat-image" />}
            {msg.type === 'video' && <ReactPlayer url={msg.content} controls={true} className="chat-video" />}
            {msg.type === 'audio' && <audio controls src={msg.content} />}
          </div>
        ))
      ) : (
        <p>Loading messages...</p>
      )}
    </div>
  );
};

export default ChatScreen;
