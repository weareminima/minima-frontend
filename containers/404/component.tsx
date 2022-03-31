import {
  FC, useCallback, useEffect, useRef,
} from 'react';

import {
  Engine, Render, Bodies, World, Runner, Composites, Composite, Common,
} from 'matter-js';

interface Custom404Props {}

export const Custom404: FC<Custom404Props> = () => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const engineRef = useRef(Engine.create());
  const matterRef = useRef({
    engine: null,
    render: null,
    runner: null,
    world: null,
    boundaries: null,
  });

  const onResize = useCallback(() => {
    const { render, world, boundaries } = matterRef.current;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (render) {
      render.bounds.max.x = w;
      render.bounds.max.y = h;
      render.options.width = w;
      render.options.height = h;
      render.canvas.width = w;
      render.canvas.height = h;
    }

    if (boundaries) {
      const newBoundaries = Composite.create({
        bodies: [
          Bodies.rectangle(w / 2, -500, w, 20, { isStatic: true, label: 'boundary-top' }), // top
          Bodies.rectangle(-10, h / 2, 20, h + 500, { isStatic: true, label: 'boundary-left' }), // left
          Bodies.rectangle(w / 2, h + 25, w, 50, { isStatic: true, label: 'boundary-bottom' }), // bottom
          Bodies.rectangle(w + 10, h / 2, 20, h, { isStatic: true, label: 'boundary-right' }), // right
        ],
      });
      World.add(world, newBoundaries);

      Composite.remove(boundaries, boundaries.bodies);

      matterRef.current = {
        ...matterRef.current,
        boundaries: newBoundaries,
      };
    }
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const radius = 50;

    const engine = engineRef.current;
    const { world } = engine;

    // Create renderer
    const render = Render.create({
      canvas: sceneRef.current,
      engine,
      options: {
        width: w,
        height: h,
        wireframes: false,
        background: 'transparent',
      },
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(engine, runner);

    // boundaries
    const boundaries = Composite.create({
      bodies: [
        Bodies.rectangle(w / 2, -500, w, 20, { isStatic: true, label: 'boundary-top' }), // top
        Bodies.rectangle(-10, h / 2, 20, h + 500, { isStatic: true, label: 'boundary-left' }), // left
        Bodies.rectangle(w / 2, h + 25, w, 50, { isStatic: true, label: 'boundary-bottom' }), // bottom
        Bodies.rectangle(w + 10, h / 2, 20, h, { isStatic: true, label: 'boundary-right' }), // right
      ],
    });
    World.add(world, boundaries);

    const cols = Math.round(w / radius);
    const rows = Math.round(h / radius / 4);

    // circles
    const circles = Composites.stack(0, -500, cols, rows, 0, 0, (x, y) => {
      return Bodies.circle(
        x,
        y,
        Common.random(radius / 2, radius),
        {
          force: {
            y: 0.1,
            x: Common.random(-0.1, 0.1),
          },
          restitution: 0.3,
          friction: 0.1,
          frictionAir: 0,
        },
      );
    });

    Composite.add(world, [circles]);

    matterRef.current = {
      engine,
      render,
      runner,
      world,
      boundaries,
    };

    window.addEventListener('resize', onResize);

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};

      window.removeEventListener('resize', onResize);
    };
  }, []); // eslint-disable-line

  return (
    <div ref={containerRef} className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
      Custom404

      <canvas className="absolute top-0 left-0" ref={sceneRef} />
    </div>
  );
};

export default Custom404;
