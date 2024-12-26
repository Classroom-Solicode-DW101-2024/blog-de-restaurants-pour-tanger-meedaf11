const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function readData() {
  const data = fs.readFileSync('restaurants.json');
  return JSON.parse(data);
}

function saveData(data) {
  fs.writeFileSync('restaurants.json', JSON.stringify(data, null, 2));
}

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API! Afilal');
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

app.get('/restaurants', (req, res) => {
  const restaurants = readData();
  res.json(restaurants);
});

app.get('/restaurants/:name', (req, res) => {
  const restaurants = readData();
  const restaurant = restaurants.find(resturant => resturant.Name === req.params.name);
  if (!restaurant) return res.status(404).send('Restaurant not available');
  res.json(restaurant);

});

app.post('/restaurants', (req, res) => {

  const restaurants = readData();

  const newRestaurant = { ...req.body, id: Date.now() };

  restaurants.push(newRestaurant);
  saveData(restaurants);
  res.status(201).json(newRestaurant);
});

app.put('/restaurants/:name', (req, res) => {
  const restaurants = readData();

  const restaurant = restaurants.find(st => st.Name === req.params.name);

  if (!restaurant) return res.status(404).send('Restaurant not available');

  if (req.body.Reviews) {
    restaurant.Reviews = [...restaurant.Reviews, ...req.body.Reviews];
  }

  restaurant.Name = req.body.Name || restaurant.Name;
  restaurant.Adresse = req.body.Adresse || restaurant.Adresse;
  restaurant.Speciality = req.body.Speciality || restaurant.Speciality;
  restaurant.Rating = req.body.Rating || restaurant.Rating;
  restaurant.Notice = req.body.Notice || restaurant.Notice;
  restaurant.Website = req.body.Website || restaurant.Website;
  restaurant.PhoneNumber = req.body.PhoneNumber || restaurant.PhoneNumber;
  restaurant.Image = req.body.Image || restaurant.Image;


  saveData(restaurants)
  res.json(restaurant);
});

app.delete('/restaurants/:name', (req, res) => {
  let restaurants = readData();
  restaurants = restaurants.filter(restau => restau.Name !== req.params.name);

  if (restaurants.length === readData().length) return res.status(404).send('Restaurant not available')

  saveData(restaurants);

  res.status(204).send();
  res.send('The restaurant has been successfully deleted.');
});

