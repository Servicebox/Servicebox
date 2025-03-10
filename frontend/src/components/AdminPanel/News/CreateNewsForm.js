import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewsStyles.css';


const CreateNewsForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    if (video) {
      formData.append('video', video);
    }

    try {
      const response = await axios.post('https://servicebox35.pp.ru/api/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('News created:', response.data);
      setTitle('');
      setContent('');
      setImage(null);
      setVideo(null);
    } catch (error) {
      console.error('Error creating news:', error.response ? error.response.data : error.message);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  return (
    <div className="create-news-form">
      <h2>Создание Новости</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Заголовок</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Содержание</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Фото</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="form-group">
          <label>Видео</label>
          <input type="file" onChange={handleVideoChange} />
        </div>
        <button type="submit">Создать Новость</button>
      </form>
    </div>
  );
};

export default CreateNewsForm;