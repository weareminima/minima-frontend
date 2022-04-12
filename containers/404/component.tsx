import {
  FC, useCallback, useEffect, useRef,
} from 'react';

import { useRouter } from 'next/router';

import {
  Engine,
  Body,
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
  Sleeping,
} from 'matter-js';

import COLORS from 'constants/colors';
import Render from 'lib/matter/render';

const EasingFunctions = {
  linear(t) {
    return t;
  },
  easeInQuad(t) {
    return t * t;
  },
  easeOutQuad(t) {
    return t * (2 - t);
  },
  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
};

interface Custom404Props {}

export const Custom404: FC<Custom404Props> = () => {
  const { push } = useRouter();

  const containerRef = useRef();
  const sceneRef = useRef();
  const engineRef = useRef(Engine.create({
    enableSleeping: true,
  }));
  const matterRef = useRef({
    engine: null,
    render: null,
    runner: null,
    world: null,
    boundaries: null,
  });

  const hoverRef = useRef<any>();
  const hoverAnimationRef = useRef(0);
  const HOVER_IN = 1.5;
  const HOVER_OUT = 1;

  const mousedownRef = useRef(null);

  const drawImage = useCallback((radius, text) => {
    const drawing = document.createElement('canvas');

    drawing.width = radius * 2;
    drawing.height = radius * 2;

    const ctx = drawing.getContext('2d');

    ctx.fillStyle = '#000';
    // ctx.fillRect(0, 0, 150, 150);
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '14pt Graphik';
    ctx.textAlign = 'center';
    ctx.fillText(text, radius, radius + 7);
    // ctx.strokeText("Canvas Rocks!", 5, 130);

    return drawing.toDataURL('image/png');
  }, []);

  const hoverIn = useCallback((body, time, from) => {
    document.body.style.cursor = 'pointer';
    if (time < 1) {
      const s = EasingFunctions.easeInOutQuad(time) * (HOVER_IN - from);

      Body.scale(
        body,
        (from + s) / body.render.sprite.xScale,
        (from + s) / body.render.sprite.xScale,
      );

      body.render.sprite.xScale = from + s; // eslint-disable-line no-param-reassign
      body.render.sprite.yScale = from + s; // eslint-disable-line no-param-reassign
      body.render.sprite.texture = drawImage(60, 'Home'); // eslint-disable-line no-param-reassign

      hoverAnimationRef.current = requestAnimationFrame(() => {
        hoverIn(body, time + 0.1, from);
      });
    } else if (hoverAnimationRef.current) {
      cancelAnimationFrame(hoverAnimationRef.current);
    }
  }, [drawImage]);

  const hoverOut = useCallback((body, time, from) => {
    document.body.style.cursor = '';
    if (time < 1) {
      const s = EasingFunctions.easeInOutQuad(time) * (from - HOVER_OUT);

      Body.scale(
        body,
        (from - s) / body.render.sprite.xScale,
        (from - s) / body.render.sprite.yScale,
      );

      body.render.sprite.xScale = from - s; // eslint-disable-line no-param-reassign
      body.render.sprite.yScale = from - s; // eslint-disable-line no-param-reassign
      body.render.sprite.texture = drawImage(60, 'Home'); // eslint-disable-line no-param-reassign

      hoverAnimationRef.current = requestAnimationFrame(() => {
        hoverOut(body, time + 0.1, from);
      });
    } else if (hoverAnimationRef.current) {
      cancelAnimationFrame(hoverAnimationRef.current);
    }
  }, [drawImage]);

  const draw = useCallback(() => {
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
        showSleeping: false,
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
      const r = Common.random(radius / 2, radius);
      const imageSize = 55;

      return Bodies.circle(
        x,
        y,
        r,
        {
          force: {
            y: 0.1,
            x: Common.random(-0.1, 0.1),
          },
          restitution: 0.3,
          friction: 0.01,
          frictionAir: 0.01,
          render: {
            fillStyle: Common.choose(Object.values(COLORS)),
            sprite: {
              texture: '/images/pixel.png',
              xScale: (r / imageSize) + 0.01,
              yScale: (r / imageSize) + 0.01,
            },
          },
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
          restitution: 1,
          friction: 0.1,
          frictionAir: 0,
          render: {
            fillStyle: '#000',
            sprite: {
              texture: drawImage(60, 'Home'),
              xScale: 1,
              yScale: 1,
            },
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
    engine.mouse = mouse;

    Events.on(engine, 'afterUpdate', (event) => {
      const { source } = event;
      const { mouse: mouseEvent } = source;

      const query = Query.point(links.bodies, {
        ...mouseEvent.position,
      });

      if (query.length && !hoverRef.current) {
        if (hoverAnimationRef.current) {
          cancelAnimationFrame(hoverAnimationRef.current);
        }

        const [body] = query;
        hoverRef.current = body;

        // Remove sleeping bodies
        const allBodies = Composite.allBodies(world);
        allBodies.forEach((b) => {
          Sleeping.set(b, false);
        });

        hoverIn(hoverRef.current, 0, body.render.sprite.xScale);
      }

      if (!query.length && hoverRef.current) {
        if (hoverAnimationRef.current) {
          cancelAnimationFrame(hoverAnimationRef.current);
        }
        // Remove sleeping bodies
        const allBodies = Composite.allBodies(world);
        allBodies.forEach((b) => {
          Sleeping.set(b, false);
        });

        if (hoverRef.current) {
          hoverOut(hoverRef.current, 0, hoverRef.current.render.sprite.xScale);
        }
        hoverRef.current = null;
      }
    });

    Events.on(mouseConstraint, 'mousedown', () => {
      if (mouseConstraint.body) {
        mousedownRef.current = new Date().getTime();
      }
    });

    Events.on(mouseConstraint, 'mouseup', (event) => {
      const { mouse: mouseEvent } = event;
      if (mousedownRef.current) {
        const currentTime:number = new Date().getTime();

        if (currentTime - mousedownRef.current < 200) {
          const query = Query.point(links.bodies, {
            ...mouseEvent.mouseupPosition,
          });

          if (query.length) {
            const { label } = query[0];
            document.body.style.cursor = '';
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onResize = useCallback(() => {
    const { render, world, boundaries } = matterRef.current;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const allBodies = Composite.allBodies(world);
    allBodies.forEach((b) => {
      Sleeping.set(b, false);
    });

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
    const f = new FontFace('Graphik', 'url(/fonts/Graphik-Regular.woff)');

    f.load()
      .then((font) => {
        document.fonts.add(font);

        draw();
      });

    window.addEventListener('resize', onResize);

    // unmount
    return () => {
      const { engine, render } = matterRef.current;

      // destroy Matter
      if (engine) {
        World.clear(engine.world);
        Engine.clear(engine);
      }

      if (render) {
        Render.stop(render);
        render.canvas.remove();
        render.canvas = null;
        render.context = null;
        render.textures = {};
      }

      window.removeEventListener('resize', onResize);
    };
  }, []); // eslint-disable-line

  return (
    <div ref={containerRef} className="absolute top-0 left-0 z-0 flex items-center justify-center w-full h-full">
      <div className="max-w-xs text-center -translate-y-1/2">
        <h1 className="font-display text-9xl">404</h1>
        <div className="space-y-2">
          <p className="text-lg">¡Desastre total! Algo ha salido fatal.</p>
          <p className="opacity-50">En realidad no, pero hemos invertido tanto tiempo en esta página que queríamos que la vieras.</p>
        </div>
      </div>

      <canvas className="absolute top-0 left-0" ref={sceneRef} />
    </div>
  );
};

export default Custom404;
