const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const fs = require("fs");
const { spawn } = require("child_process");

const cars = [];

io.on("connect", onConnect);

function onConnect(socket) {
  console.log("new-connection");
  socket.on("connect-car", function(object) {
    cars.push({ name, id });
  });
  socket.on("update-car", function(data) {
    let movingCars = 0;
    let averageSpeed = 0;
    let avgCarSpeed = 0;
    let maxSpeed = -Infinity;
    let carsOverLimit = 0;
    let lanes = [
      {
        name: "1",
        value: 0
      },
      {
        name: "2",
        value: 0
      },
      {
        name: "3",
        value: 0
      },
      {
        name: "4",
        value: 0
      }
    ];

    cars.forEach((car, index) => {
      if (car.name === data.name) {
        avgCarSpeed = 0;
        const tmpHistory = cars[index].history ? cars[index].history : [];
        data.speed = data.speed / 100;
        const dato = { time: Date.now(), value: data.speed };
        data.history = [...tmpHistory, dato].slice(-70);
        data.history.forEach(e => {
          avgCarSpeed += e.value;
        });
        data.overLimit = data.speed > 650;
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
        data.avgCarSpeed = avgCarSpeed / history.length;
        cars[index] = data;
      }
      averageSpeed += car.speed;
      maxSpeed = maxSpeed < car.speed ? car.speed : maxSpeed;
      lanes[car.lane - 1].value++;
    });
    movingCars = cars.filter(car => car.speed > 0).length;
    averageSpeed /= cars.length;
    carsOverLimit = cars.filter(car => car.overLimit).length;
    maxSpeed = isFinite(maxSpeed) ? maxSpeed : 0;

    const infos = {
      movingCars,
      averageSpeed,
      carsOverLimit,
      maxSpeed,
      lanes
    };

    io.emit("update-browser", { cars, infos });
  });
}

const PORT = 8080;

fs.readdir("./cars", (err, file) => {
  file.forEach(f => spawn(`node`, ["controller.js", `cars/${f}`]));
});

server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
