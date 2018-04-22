const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const {spawn} = require('child_process');

const cars = [];
const clients = []

io.on('connection', function(client) {
  client.on('connect-car', function({name, lane, type}) {
    const found = cars.find(e => e.name === name)
    if(!found) {
      clients.push(client)
      cars.push({name, lane, type})
    };
  });
 
  client.on('update-car', function(data) {   
    let movingCars = 0;
    let averageSpeed = 0;
    let avgCarSpeed = 0;
    let maxSpeed = 0;
    let carsOverLimit = 0;
    let lanes = [
      {
        name: '1',
        value: 0,
      },
      {
        name: '2',
        value: 0,
      },
      {
        name: '3',
        value: 0,
      },
      {
        name: '4',
        value: 0,
      },
    ];

    cars.forEach((car, index) => {
      if (car.name === data.name) {
        avgCarSpeed = 0;
        const tmpHistory = cars[index].history ? cars[index].history : [];
        data.speed = data.speed ? data.speed / 100 : 0;
        const dato = {value: data.speed};
        data.history = tmpHistory.slice(-70);
        data.history.push(dato)
        data.history.forEach(e => {
          avgCarSpeed += e.value;
        });
        data.overLimit = data.speed > 5.5;
        switch (true) {
          case data.offset < -30:
            data.lane = 4;
            break;
          case data.offset < -0:
            data.lane = 3;
            break;
          case data.offset < 30:
            data.lane = 2;
            break;
          default:
            data.lane = 1;
            break;
        }
        data.avgCarSpeed = avgCarSpeed / tmpHistory.length;
        cars[index] = data;
      }
      averageSpeed += car.speed ? car.speed : 0;
      maxSpeed = maxSpeed < car.speed ? car.speed : maxSpeed;
      lanes[car.lane - 1].value++;
    });
    let riskyDrivers = 0;
    cars.forEach( (car, index) => {
     riskyDrivers += [...cars.slice(index + 1).filter(car2 => (Math.abs(car.lane - car2.lane) <=1 && car.pieceId === car2.pieceId))].length > 0 ? 1 :0
      }
    )
    movingCars = cars.filter(car => car.speed > 0).length;
    averageSpeed /= cars.length;
    carsOverLimit = cars.filter(car => car.overLimit).length;
    
    const infos = {
      movingCars,
      averageSpeed,
      carsOverLimit,
      maxSpeed,
      lanes,
      riskyDrivers
    };
    
    client.broadcast.emit('update-browser', {cars, infos});
  });
});

const laneOffsets = [-68, -23, 23, 68]
setInterval(()=>{
  if (cars.length < 1) return
  let index = Math.floor(Math.random() * cars.length)
  const newlane = cars[index].lane + (Math.random() > 0.5 ? 1 : -1)
  const canTurn = newlane > 0 && newlane < 5 && [...cars.filter( car => cars[index].pieceId === car.pieceId && newlane === car.lane)].length < 1
  if(canTurn){
    clients[index].emit("change-lane",laneOffsets[newlane-1])
    io.emit("log",`Car ${cars[index].name}: new lane ${5-newlane}`)
  }
  const minSpeed = cars[index].type === "truck" ? 750 : 350 
  const newSpeed = (Math.random() * 500) + minSpeed
  clients[index].emit("update-speed", newSpeed)
  io.emit("log",`Car ${cars[index].name}: new speed ${(newSpeed/100).toFixed(2)} km/h`)
},4000)

const PORT = 8080;

fs.readdir('./cars', (err, file) => {
  file.forEach(f => spawn(`node`, ['controller.js', `cars/${f}`]));
});

server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
