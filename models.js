const { DataTypes } = require("sequelize");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "mysql://root:superhemligt@localhost:3306/lotr"
);

const Location = sequelize.define("Location", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "name", //true,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Hero = sequelize.define("Hero", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "name", //unique:name,
  },
  age: {
    type: DataTypes.INTEGER,
    validate: { min: 0 },
  },
});

Hero.belongsTo(Location);
Location.hasMany(Hero);

module.exports = { Hero, Location, sequelize };
