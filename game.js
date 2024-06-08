// Importar a biblioteca Matter.js
const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

// Configuração inicial
const canvas = document.getElementById('gameCanvas');
const engine = Engine.create();
const world = engine.world;
const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
    },
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Criar bordas
const ground = Bodies.rectangle(400, 590, 810, 20, { isStatic: true });
const leftWall = Bodies.rectangle(10, 300, 20, 600, { isStatic: true });
const rightWall = Bodies.rectangle(790, 300, 20, 600, { isStatic: true });
const topWall = Bodies.rectangle(400, 10, 810, 20, { isStatic: true });
World.add(world, [ground, leftWall, rightWall, topWall]);

// Criar bola
let ball = Bodies.circle(100, 500, 20, {
    restitution: 0.8,
    render: {
        fillStyle: 'red'
    }
});
World.add(world, ball);

// Criar cesta
const hoop = Bodies.rectangle(700, 300, 100, 10, {
    isStatic: true,
    render: {
        fillStyle: 'orange'
    }
});
const backboard = Bodies.rectangle(750, 250, 10, 100, {
    isStatic: true,
    render: {
        fillStyle: 'brown'
    }
});
World.add(world, [hoop, backboard]);

// Função para lançar a bola
function shootBall() {
    Body.setPosition(ball, { x: 100, y: 500 });
    Body.setVelocity(ball, { x: 15, y: -20 });
}

// Adicionar evento ao botão
document.getElementById('shootButton').addEventListener('click', shootBall);

// Detecção de colisão
Events.on(engine, 'collisionStart', function(event) {
    event.pairs.forEach(pair => {
        if (pair.bodyA === ball || pair.bodyB === ball) {
            if (pair.bodyA === hoop || pair.bodyB === hoop) {
                alert('Cesta!');
                Body.setPosition(ball, { x: 100, y: 500 });
                Body.setVelocity(ball, { x: 0, y: 0 });
            }
        }
    });
});