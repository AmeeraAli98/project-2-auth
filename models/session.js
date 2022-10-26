'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.session.belongsTo(models.organizer)
      models.session.hasMany(models.submission)


    }
  }
  session.init({
    seshName: DataTypes.STRING,
    organizerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'session',
  });
  return session;
};