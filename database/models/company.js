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
    company_id: DataTypes.STRING,
    name: DataTypes.STRING,
    ceo: DataTypes.STRING,
    sector: DataTypes.STRING,
    score: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'company',
  });
  return company;
};