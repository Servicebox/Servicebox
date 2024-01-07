const axios = require('axios');

const authId = 5948;
const authKey = 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp';
const apiUrl = 'https://optfm.ru/api/';

const getProducts = async () => {
  try {
    const response = await axios.post(apiUrl, {
      auth_id: authId,
      auth_key: authKey,
      method: 'catalog.getProductList'
      // Добавьте другие необходимые параметры для получения списка товаров, если они есть
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSectionList = async (limit = 500, page = 0, sectionId = null, includeSubsection = 0) => {
  try {
    const response = await axios.post(apiUrl, {
      auth_id: authId,
      auth_key: authKey,
      method: 'catalog.getSectionList',
      limit,
      page,
      section_id: sectionId,
      include_subsection: includeSubsection
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getElementList = async (limit = 500, page = 1, sectionId = null, includeSubsection = 0, fullUrl = 0, noImage = 0) => {
  try {
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
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getImage = async (elementId) => {
  try {
    const response = await axios.post(apiUrl, {
      auth_id: authId,
      auth_key: authKey,
      method: 'catalog.getImage',
      element_id: elementId
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getSectionList,
  getElementList,
  getImage,
  getProducts
};