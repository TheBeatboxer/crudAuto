// public-service/app/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const cars = [
  { id: 1, make: "Toyota", model: "Corolla", year: 2020 },
  { id: 2, make: "Ford", model: "Mustang", year: 2018 },
  { id: 3, make: "Tesla", model: "Model 3", year: 2022 }
];


app.get('/cars', (req, res) => {
  res.json(cars);
});


app.get('/cars/:id', (req, res) => {
  const car = cars.find(c => c.id == req.params.id);
  car ? res.json(car) : res.status(404).send("Car not found");
});

app.listen(3000, () => {
  console.log(`Public service running on port ${PORT}`);
});
