// private-service/app/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


let cars = [
  { id: 1, make: "Toyota", model: "Corolla", year: 2020 },
  { id: 2, make: "Ford", model: "Mustang", year: 2018 }
];

app.get('/cars', (req, res) => {
  res.json([
      { id: 1, make: 'Toyota', model: 'Corolla', year: 2020 },
      { id: 2, make: 'Ford', model: 'Mustang', year: 2018 },
      { id: 3, make: 'Tesla', model: 'Model 3', year: 2022 }
  ]);
});


app.post('/cars', (req, res) => {
  const newCar = { id: cars.length + 1, ...req.body };
  cars.push(newCar);
  res.status(201).json(newCar);
});


app.put('/cars/:id', (req, res) => {
  const index = cars.findIndex(c => c.id == req.params.id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...req.body };
    res.json(cars[index]);
  } else {
    res.status(404).send("Car not found");
  }
});


app.delete('/cars/:id', (req, res) => {
  const index = cars.findIndex(c => c.id == req.params.id);
  if (index !== -1) {
    cars.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Car not found");
  }
});

app.listen(3001, () => {
  console.log('Private service running on port 3001');
});
