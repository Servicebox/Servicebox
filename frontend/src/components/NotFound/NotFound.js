import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";


function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <main className="notFoundMain">
      <section className="notFound">
        <h1 className="notFound__title"> 404 </h1>
        <h2 className="notFound__subtitle">Страница не найдена</h2>
        <button className="notFound__button" type="button" onClick={goBack}> Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;