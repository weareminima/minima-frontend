import {
  FC, useCallback, useEffect, useRef,
} from 'react';

import { useRouter } from 'next/router';

import {
  Engine,
  Render,
  Bodies,
  World,
  Runner,
  Composites,
  Composite,
  Common,
  Mouse,
  MouseConstraint,
  Events,
  Query,
} from 'matter-js';

interface Custom404Props {}

export const Custom404: FC<Custom404Props> = () => {
  const { push } = useRouter();

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

  const mousedownRef = useRef(null);

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
          Bodies.rectangle(w / 2, -500, w, 60, { isStatic: true, label: 'boundary-top' }), // top
          Bodies.rectangle(-50, ((h - 500) / 2), 100, h + 500, { isStatic: true, label: 'boundary-left' }), // left
          Bodies.rectangle(w / 2, h + 50, w, 100, { isStatic: true, label: 'boundary-bottom' }), // bottom
          Bodies.rectangle(w + 50, ((h - 500) / 2), 100, h + 500, { isStatic: true, label: 'boundary-right' }), // right
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

    const radius = 30;

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
        Bodies.rectangle(w / 2, -500, w, 60, { isStatic: true, label: 'boundary-top' }), // top
        Bodies.rectangle(-50, ((h - 500) / 2), 100, h + 500, { isStatic: true, label: 'boundary-left' }), // left
        Bodies.rectangle(w / 2, h + 50, w, 100, { isStatic: true, label: 'boundary-bottom' }), // bottom
        Bodies.rectangle(w + 50, ((h - 500) / 2), 100, h + 500, { isStatic: true, label: 'boundary-right' }), // right
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
            y: 0,
            x: Common.random(-0.1, 0.1),
          },
          restitution: 0.5,
          friction: 0.1,
          frictionAir: 0,
        },
      );
    });

    const links = Composite.create({
      bodies: [
        Bodies.circle(w / 2, -400, 60, {
          force: {
            y: 0,
            x: Common.random(-0.1, 0.1),
          },
          label: '/',
          restitution: 0.5,
          friction: 0.1,
          frictionAir: 0,
          render: {
            fillStyle: '#000',
          },
        }),
      ],
    });

    Composite.add(world, [circles, links]);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      element: containerRef.current,
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    Events.on(mouseConstraint, 'mousedown', () => {
      if (mouseConstraint.body) {
        mousedownRef.current = new Date().getTime();
      }
    });

    Events.on(mouseConstraint, 'mouseup', (event) => {
      const { mouse: mouseEvent } = event;
      if (mousedownRef.current) {
        const currentTime:number = new Date().getTime();

        if (currentTime - mousedownRef.current < 100) {
          const query = Query.point(links.bodies, {
            ...mouseEvent.mouseupPosition,
          });

          if (query.length) {
            const { label } = query[0];
            push(label);
          }
        }
      }
    });

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
