const express = require('express');
const router = express.Router();
const axios = require('axios');

// Данные для авторизации в API
const authId = 5948;
const authKey = 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp';
const apiUrl = 'https://optfm.ru/api/';

router.post('/getSectionList', async (req, res) => {
  try {
    const { limit, page, sectionId, includeSubsection } = req.body;
    const response = await axios.post(apiUrl, {
      auth_id: authId,
      auth_key: authKey,
      method: 'catalog.getSectionList',
      limit,
      page,
      section_id: sectionId,
      include_subsection: includeSubsection
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/getElementList', async (req, res) => {
  try {
    const { limit, page, sectionId, includeSubsection, fullUrl, noImage } = req.body;
    const response = await axios.post(apiUrl, {
      auth_id: authId,
      auth_key: authKey,
      method: 'catalog.getElementList',
      limit,
      page,
      section_id: sectionId,
      include_subsection: includeSubsection,
      full_url: fullUrl,
      no_image: noImage
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/getImage', async (req, res) => {
  try {
    const { elementId } = req.body;
    const response = await axios.post(apiUrl, {
      auth_id: authId,
      auth_key: authKey,
      method: 'catalog.getImage',
      element_id: elementId
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;