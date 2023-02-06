'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  company.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    ceo: DataTypes.STRING,
    tags: DataTypes.STRING,
    score: DataTypes.FLOAT,
    sector: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'company',
  });
  return company;
};