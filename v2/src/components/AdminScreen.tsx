import React, { useState } from 'react';
import '../reset.css';
import './AdminScreen.css';

const AdminScreen: React.FC = () => {
  const [content, setContent] = useState('');
  const [type, setType] = useState('text');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, type })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setContent('');
      alert('メッセージが送信されました');
    } catch (error) {
      console.error('Failed to fetch:', error);
      alert('エラーが発生しました');
    }
  };

  const renderContentInput = () => {
    switch (type) {
      case 'text':
        return (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="コンテンツを入力"
          ></textarea>
        );
      case 'image':
        return (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e)}
          />
        );
      case 'video':
        return (
          <input
            type="url"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="動画のURLを入力"
          />
        );
      case 'audio':
        return (
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileUpload(e)}
          />
        );
      default:
        return null;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-screen">
      <h1>管理画面</h1>
      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="text">テキスト</option>
          <option value="image">画像</option>
          <option value="video">動画</option>
          <option value="audio">音声</option>
        </select>
        {renderContentInput()}
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default AdminScreen;
