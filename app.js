const express = require("express");
const app = express();
const { Hero, sequelize, Location } = require("./models");

app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  const heroes = await Hero.findAll();
  res.render("index.ejs", { heroes });
});
app.post("/heroes", async (req, res) => {
  const { name, age } = req.body;
  const hero = Hero.build({ name, age });
  await hero.save();
  res.redirect("/");
});
app.post("/locations", async (req, res) => {
  const { name, region } = req.body;
  const location = Location.build({ name, region });
  await location.save();
  res.redirect("/locations");
});
app.get("/locations", async (req, res) => {
  const locations = await Location.findAll();
  res.render("location.ejs", { locations });
});
app.get("/heroes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const hero = await Hero.findOne({ where: { id } });
  if (!hero) {
    res.sendStatus(404).send("not found");
  }
  const locations = await Location.findAll();
  res.render("hero.ejs", { hero, locations });
});
app.post("/heroes/:id", async (req, res) => {
  const heroId = parseInt(req.params.id);
  const hero = await Hero.findOne({ where: { id: heroId } });
  const location = await Location.findOne({ where: { id: req.body.location } });
  await hero.setLocation(location);
  res.redirect("/");
});
sequelize.sync({ alter: true }).then(() => {
  //inte hållbart, ändra alla kolumner i alla tabeller
  console.log("Done sync models");
  app.listen(3000);
}); //updatera tabeller
