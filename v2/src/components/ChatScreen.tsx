import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ReactPlayer from 'react-player';
import { Howl } from 'howler';
import '../reset.css';
import './ChatScreen.css';
import { faMessage, faImage, faFilm, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';



interface Message {
  id: number;
  content: string;
  type: string;
  masked: boolean;
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

  const handleUnmaskMessage = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, masked: false } : msg
    ));
  };

  return (
    <div className="chat-screen">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className="message"
          onClick={() => handleUnmaskMessage(msg.id)}
        >
          {msg.masked ? (
            <>
              {msg.type === 'text' && <div className="masked-message background-color-message"><FontAwesomeIcon icon={faMessage} /></div>}
              {msg.type === 'image' && <div className="masked-message background-color-photo"><FontAwesomeIcon icon={faImage} /></div>}
              {msg.type === 'video' && <div className="masked-message background-color-video"><FontAwesomeIcon icon={faFilm} /></div>}
              {msg.type === 'audio' && <div className="masked-message background-color-audio"><FontAwesomeIcon icon={faPhoneVolume} /></div>}
            </>            
          ) : (
            <>
              {msg.type === 'text' && <p>{msg.content}</p>}
              {msg.type === 'image' && <img src={msg.content} alt="example" className="chat-image" />}
              {msg.type === 'video' && <ReactPlayer url={msg.content} controls={true} className="chat-video" />}
              {msg.type === 'audio' && <audio controls src={msg.content} />}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatScreen;
