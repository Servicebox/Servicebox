import React, { useEffect } from "react";
import "./BallData.css"
import Matter from 'matter-js';

function BallData() {
  useEffect(() => {
    const { Engine, Render, World, Bodies, Body, Events } = Matter;

    // Создаем физическое окружение
    const engine = Engine.create();
    const render = Render.create({
      element: document.getElementById('balls'),
      engine: engine
    });

    // Создаем шары
    const balls = [];
    for (let i = 0; i < 5; i++) {
      const ball = Bodies.circle(100 + i * 100, 100, 30, { restitution: 0.9 });
      balls.push(ball);
    }

    // Добавляем шары в мир
    World.add(engine.world, balls);

    // Слушаем столкновения шаров и стен
    Events.on(engine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      pairs.forEach((pair) => {
        // Обрабатываем столкновения
        // Например, можно изменить цвет шара при столкновении или его скорость
        // Например сделать его ускорение в противоположную сторону
      });
    });

    // Запускаем физическое окружение
    Engine.run(engine);
    Render.run(render);
  }, []);

  return (
    <div id="discount-block">
      <div id="balls" />
      {/* ...кнопка и форма*/}
    </div>
  );
}

export default BallData;