//export const BASE_URL = "http://localhost:3000"
export const BASE_URL = "https://servicevox35.ru";

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => getCheckResponse(res));
  };
  
  export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => getCheckResponse(res));
  };
  
  export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => getCheckResponse(res));
  };
  
  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => getCheckResponse(res));
  };
  
  export const editUserInfo = (data) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => getCheckResponse(res));
  };
  
  export const getProducts = () => {
    return fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => getCheckResponse(res));
  };
  
  export const addCard = (data) => {
    return fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: "https://servicebox35.ru/" + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail:
          "https://servicebox35.ru/" + data.image.formats.thumbnail.url,
        productId: data.id,
        nameRU: data.nameRU,
      }),
    }).then((res) => getCheckResponse(res));
  };
  
  export const deleteCard = (cardId) => {
    return fetch(`${BASE_URL}/products/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => getCheckResponse(res));
  };