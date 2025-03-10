import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateNewsForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    video: null,
    existingImage: '',    // Добавляем поле для существующего изображения
    existingVideo: ''     // Добавляем поле для существующего видео
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://servicebox35.pp.ru/api/news/${id}`);
        const news = response.data;
        setFormData({
          title: news.title,
          content: news.content,
          image: null,
          video: null,
          existingImage: news.image || '',
          existingVideo: news.video || ''
        });
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    if (formData.video) {
      formDataToSend.append('video', formData.video);
    }

    try {
      await axios.put(`https://servicebox35.pp.ru/api/news/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Новость успешно обновлена!');
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Ошибка при обновлении новости');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  return (
    <div className="update-news-form">
      <h2>Редактирование Новости</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Заголовок</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Содержание</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Текущее изображение:</label>
          {formData.existingImage && (
            <img 
              src={`https://servicebox35.pp.ru/uploads/${formData.existingImage}`} 
              alt="Current" 
              style={{maxWidth: '200px', display: 'block'}}
            />
          )}
          <input 
            type="file" 
            name="image"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label>Текущее видео:</label>
          {formData.existingVideo && (
            <div>
              <video controls style={{maxWidth: '200px'}}>
                <source src={`https://servicebox35.pp.ru/uploads/${formData.existingVideo}`} />
              </video>
            </div>
          )}
          <input 
            type="file" 
            name="video"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Обновить Новость</button>
      </form>
    </div>
  );
};

export default UpdateNewsForm;