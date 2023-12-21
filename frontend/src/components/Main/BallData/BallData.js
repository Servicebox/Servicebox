import React, { useRef, useEffect } from 'react';
import Matter from 'matter-js';

const BallData = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;

    // create an engine
    const engine = Engine.create();

    // create a renderer
    const render = Render.create({
      element: canvasRef.current,
      engine: engine,
    });

    // create a sphere
    const sphere = Bodies.circle(200, 200, 40, { restitution: 0.5 });

    // add the sphere to the world
    World.add(engine.world, [sphere]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
  }, []);

  return <div ref={canvasRef} />;
};

export default BallData;