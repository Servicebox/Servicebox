import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewsStyles.css';

const CreateNewsForm = () => {
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState([
    { type: 'text', content: '', description: '' }
  ]);
  const [files, setFiles] = useState({
    images: [],
    videos: []
  });
  const navigate = useNavigate();

  const addBlock = (type) => {
    setBlocks([...blocks, { 
      type, 
      content: '', 
      description: '',
      media: null 
    }]);
  };

  const removeBlock = (index) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[index][field] = value;
    setBlocks(newBlocks);
  };

  const handleFileChange = (index, type, file) => {
    const newBlocks = [...blocks];
    const fileId = `new:${Date.now()}-${Math.random()}`;
    
    newBlocks[index].media = fileId;
    newBlocks[index].mediaType = file.type;
    
    setBlocks(newBlocks);
    
    setFiles(prev => ({
      ...prev,
      [type]: [...prev[type], { id: fileId, file }]
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
    
 const formData = new FormData();
  formData.append('title', title);
  formData.append('contentBlocks', JSON.stringify(blocks));
  
  // Используйте 'images' вместо 'image'
  files.images.forEach(img => 
    formData.append('images', img.file)
  );
  
  // Используйте 'videos' вместо 'video'
  files.videos.forEach(vid => 
    formData.append('videos', vid.file)
  );

  try {
    await axios.post('https://servicebox35.pp.ru/api/news', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    navigate('/news');
  } catch (error) {
    console.error('Error creating news:', error);
  }
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

        {blocks.map((block, index) => (
          <div key={index} className="content-block">
            <div className="block-header">
              <select
                value={block.type}
                onChange={(e) => handleBlockChange(index, 'type', e.target.value)}
              >
                <option value="text">Текст</option>
                <option value="image">Изображение</option>
                <option value="video">Видео</option>
              </select>
              <button 
                type="button" 
                onClick={() => removeBlock(index)}
                className="remove-block"
              >
                ×
              </button>
            </div>

            {block.type === 'text' ? (
              <textarea
                value={block.content}
                onChange={(e) => handleBlockChange(index, 'content', e.target.value)}
                placeholder="Текст блока"
                required
              />
            ) : (
              <>
                <input
                  type="file"
                  accept={block.type === 'image' ? 'image/*' : 'video/*'}
                  onChange={(e) => 
                    handleFileChange(
                      index, 
                      block.type === 'image' ? 'images' : 'videos', 
                      e.target.files[0]
                    )
                  }
                />
                <textarea
                  value={block.description}
                  onChange={(e) => handleBlockChange(index, 'description', e.target.value)}
                  placeholder="Описание медиа"
                />
              </>
            )}
          </div>
        ))}

        <div className="block-actions">
          <button type="button" onClick={() => addBlock('text')}>
            + Текст
          </button>
          <button type="button" onClick={() => addBlock('image')}>
            + Изображение
          </button>
          <button type="button" onClick={() => addBlock('video')}>
            + Видео
          </button>
        </div>

        <button type="submit">Создать Новость</button>
      </form>
    </div>
  );
};

export default CreateNewsForm;